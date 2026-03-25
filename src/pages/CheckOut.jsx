import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Package, Truck, Wallet, Plus, MapPin, LogIn, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE, USER_API_BASE } from "../config";

const ORDER_API = `${API_BASE}/api/order`;

const getCart = () => JSON.parse(localStorage.getItem("surprise_sutra_cart") || '[]');

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCart());
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [eventDate, setEventDate] = useState('');

  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zip: '', country: 'India', isDefault: false
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser._id) {
          setUser(parsedUser);
          setUserId(parsedUser._id);
        } else {
            toast.info("Please login to proceed with your order! ✨");
            navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
        toast.info("Please login to proceed with your order! ✨");
        navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchUserAddresses();
      fetchCoupons();
    }
  }, [userId]);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/coupon`);
      setAvailableCoupons(res.data.filter(c => c.isActive));
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
    }
  };

  const fetchUserAddresses = async () => {
    try {
      const res = await axios.get(`${USER_API_BASE}/${userId}`);
      const fetchedUser = res.data.user;
      setAddresses(fetchedUser.addresses || []);

      if (fetchedUser.addresses?.length > 0) {
        const defaultAddr = fetchedUser.addresses.find(a => a.isDefault);
        const index = defaultAddr ? fetchedUser.addresses.indexOf(defaultAddr) : 0;
        setSelectedAddressIndex(index);
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const subtotal = cartItems.reduce(
    (sum, i) => sum + ((i.price || 0) * (i.qty || 1)),
    0
  );

  const totalItems = cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);
  const tax = Math.round(subtotal * 0.08);
  const finalTotal = subtotal + tax - discount;

  const applyCoupon = async (directCode = null) => {
    if (discount > 0) {
      toast.info("A magical coupon is already active! Remove it to try another.");
      return;
    }
    const codeToApply = directCode || coupon.trim();
    if (!codeToApply) return;

    try {
      const res = await axios.post(`${API_BASE}/api/coupon/verify`, {
        code: codeToApply,
        cartTotal: subtotal
      });

      const { discountType, discountValue } = res.data;

      let calculatedDiscount = 0;
      if (discountType === 'percentage') {
        calculatedDiscount = (subtotal * discountValue) / 100;
      } else {
        calculatedDiscount = Math.min(discountValue, subtotal);
      }

      setDiscount(calculatedDiscount);
      toast.success(res.data.message || 'Magic applied!');
    } catch (err) {
      setDiscount(0);
      toast.error(err.response?.data?.message || 'Invalid coupon magic');
    }
  };

  const placeOrder = async () => {
    if (selectedAddressIndex === null || !addresses[selectedAddressIndex]) {
      toast.error('Please pick a delivery spot');
      return;
    }

    const addr = addresses[selectedAddressIndex];
    const shippingAddress = {
      name: user?.name || '',
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: user?.phone || ''
    };

    const payload = {
      userId,
      orderItems: cartItems.map(item => ({
        product: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.qty,
        image: item.image,
        variant: {
          option1Value: item.color,
          option2Value: item.size,
          sku: item.sku
        }
      })),
      shippingAddress,
      paymentMethod,
      shippingPrice: 0,
      totalAmount: finalTotal,
      eventDate: eventDate || null,
    };

    try {
      setIsPlacingOrder(true);
      await axios.post(ORDER_API, payload);
      localStorage.removeItem("surprise_sutra_cart");
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/my-orders');
      toast.success("Magic Order Placed! ✨");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Magic fumbled. Try again!');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_BASE}/${userId}/address`, addressForm);
      setAddresses(res.data.addresses);
      setShowAddAddress(false);
      setAddressForm({ street: '', city: '', state: '', zip: '', country: 'India', isDefault: false });
      toast.success('Address added! Select it from the list.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white font-brand flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <Package className="w-16 h-16 mx-auto text-brand-primary/20 mb-6" />
          <h2 className="text-3xl font-black text-gray-900 mb-6">Cart is Lonesome</h2>
          <Link to="/diy-kits" className="inline-block bg-brand-primary text-white font-black py-4 px-10 rounded-full shadow-xl">Continue Magic</Link>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white font-brand flex items-center justify-center p-4">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-8 bg-brand-primary/5 rounded-full flex items-center justify-center"><LogIn className="text-brand-primary size-8" /></div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Who Goes There?</h2>
          <p className="text-xs font-bold mb-10 text-gray-400 uppercase tracking-widest leading-loose">Identify yourself to proceed with the secrets.</p>
          <button onClick={() => navigate('/login')} className="w-full bg-brand-primary text-white font-black py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3">Login Now</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-brand pt-40 pb-20 px-4 md:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pastel-yellow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="mb-12 md:mb-20">
          <Link to="/cart" className="inline-flex items-center gap-2 text-brand-primary font-black mb-6 hover:gap-4 transition-all uppercase tracking-widest text-[10px]"><ArrowLeft size={16} /> Back to Loot</Link>
          <h1 className="text-5xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">Checkout <br className="md:hidden" /><span className="text-brand-primary">Time!</span></h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 space-y-12">

            {/* 1. Address Selection */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><MapPin size={24} /></div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Where to?</h2>
                </div>
                {!showAddAddress && (
                  <button onClick={() => setShowAddAddress(true)} className="px-6 py-2 rounded-full border-2 border-brand-primary/10 text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">Add Spot</button>
                )}
              </div>

              {showAddAddress ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-50/50 rounded-[2rem] p-8 md:p-10 border-2 border-white">
                  <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tighter">Enter New Spot</h3>
                  <form onSubmit={addAddress} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                        required
                      />
                    </div>
                    <div className="flex gap-4 pt-6">
                      <button type="submit" className="flex-1 bg-brand-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg">Save Spot</button>
                      <button type="button" onClick={() => setShowAddAddress(false)} className="px-8 py-4 rounded-2xl bg-gray-200 text-gray-500 font-black uppercase tracking-widest text-xs">Nevermind</button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((addr, i) => (
                    <label key={i} className={`flex items-start gap-4 p-6 md:p-10 rounded-[2rem] border-2 cursor-pointer transition-all ${selectedAddressIndex === i ? 'border-brand-primary bg-brand-primary/5 shadow-xl shadow-brand-primary/5' : 'border-gray-50 bg-gray-50/30 hover:bg-gray-50'}`}>
                      <input type="radio" name="address" checked={selectedAddressIndex === i} onChange={() => handleAddressSelect(i)} className="mt-1 w-5 h-5 text-brand-primary focus:ring-brand-primary" />
                      <div>
                        <p className="font-black text-gray-900 text-lg md:text-xl mb-1">{user?.name}</p>
                        <p className="text-sm md:text-base text-gray-500 font-bold leading-relaxed">{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
                      </div>
                    </label>
                  ))}
                  {addresses.length === 0 && (
                    <div className="p-10 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
                      <p className="text-sm font-bold text-gray-400">No spots saved yet.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.section>

            {/* 2. Event Date */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><Calendar size={24} /></div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">The Big Day</h2>
              </div>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full px-8 py-6 rounded-3xl bg-gray-50/50 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white shadow-sm"
              />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Note: We need at least 3 days to prep the magic.</p>
            </motion.section>

            {/* 3. Payment Selection */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><CreditCard size={24} /></div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Magic Coins</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'cod', label: 'Cash on Delivery', icon: Wallet, desc: 'Pay when magic arrives' },
                  { id: 'upi', label: 'Magic QR / UPI', icon: CreditCard, desc: 'Quick scan & pay' },
                ].map((method) => (
                  <label key={method.id} className={`flex items-center justify-between p-8 rounded-[2rem] border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-brand-primary bg-brand-primary/5 shadow-xl' : 'border-gray-50 bg-gray-50/30 hover:bg-gray-50'}`}>
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-gray-900 text-lg tracking-tight">{method.label}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{method.desc}</span>
                    </div>
                    <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="w-6 h-6 text-brand-primary focus:ring-brand-primary" />
                  </label>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Checkout Logic + Summary */}
          <aside className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border-2 border-gray-50 relative overflow-hidden">
                <h2 className="text-[10px] md:text-sm font-bold text-gray-400 mb-10 uppercase tracking-widest leading-none">Price Details ({totalItems} items)</h2>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Cart Total</span>
                    <span className="text-sm font-bold text-gray-900 tracking-tight">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 font-brand">Delivery Charges</span>
                    <span className="text-sm font-black text-green-500 uppercase tracking-widest text-[10px]">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 font-brand">Tax (8%)</span>
                    <span className="text-sm font-bold text-gray-900 tracking-tight">Rs {tax.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-brand-primary py-2 px-4 bg-brand-primary/5 rounded-xl border border-brand-primary/10 transition-all">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Magic Luck Applied</span>
                            <span className="text-sm font-black">-Rs {discount.toLocaleString()}</span>
                        </div>
                        <button 
                            onClick={() => { setDiscount(0); setCoupon(''); }}
                            className="bg-white text-red-500 font-bold text-[9px] uppercase tracking-widest py-1 px-3 rounded shadow-sm border border-red-500 hover:bg-red-50 transition-all active:scale-95"
                        >
                            Remove
                        </button>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-100 mb-8" />

                <div className="flex justify-between items-center mb-1">
                  <span className="text-xl font-black text-gray-900 tracking-tight">Total Amount</span>
                  <span className="text-xl font-black text-gray-900 tracking-tighter">Rs {finalTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">(Inclusive of all taxes)</p>

                <div className="mt-12 space-y-6">
                  <div className="relative group">
                    <input type="text" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="w-full px-6 py-5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-sm transition-all focus:bg-white" />
                    <button onClick={() => applyCoupon()} className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">Apply</button>
                  </div>

                  {availableCoupons.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-1">
                      {availableCoupons.map((c) => (
                        <button
                          key={c._id}
                          onClick={() => {
                            setCoupon(c.code);
                            applyCoupon(c.code);
                          }}
                          className="px-3 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 hover:border-brand-primary/30 transition-all flex items-center gap-1.5 group"
                        >
                          <Sparkles size={10} className="text-brand-primary" />
                          <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={placeOrder}
                disabled={isPlacingOrder}
                className="w-full py-6 md:py-8 rounded-3xl font-black text-white text-xs uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-50 border-none"
                style={{ background: "linear-gradient(135deg, #422006 0%, #2D1403 100%)" }}
              >
                {isPlacingOrder ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Sparkles size={20} /></div>
                    <span>Place Magic Order</span>
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-6 px-10">
                <div className="flex flex-col items-center gap-2 opacity-30 text-center">
                  <Truck size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Safe Post</span>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="flex flex-col items-center gap-2 opacity-30 text-center">
                  <CreditCard size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Secure Magic</span>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="flex flex-col items-center gap-2 opacity-30 text-center">
                  <Check size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Joy Assured</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;