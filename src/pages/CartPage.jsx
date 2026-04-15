import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, ArrowLeft, Sparkles, Smile } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE } from "../config";

const CART_KEY = "surprise_sutra_cart";

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
};

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(getCart());

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user || !user._id) {
            toast.info("Please login to access your magical cart! ✨");
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const handler = () => setCartItems(getCart());
        window.addEventListener('storage', handler);
        window.addEventListener('cartUpdated', handler);
        return () => {
            window.removeEventListener('storage', handler);
            window.removeEventListener('cartUpdated', handler);
        };
    }, []);

    const getItemKey = (item) => `${item.productId || item._id}-${item.color || 'none'}-${item.size || 'none'}`;

    const updateQty = (item, delta) => {
        const key = getItemKey(item);
        const updated = cartItems
            .map((i) => {
                if (getItemKey(i) === key) {
                    const newQty = i.qty + delta;
                    return newQty > 0 ? { ...i, qty: newQty } : null;
                }
                return i;
            })
            .filter(Boolean);
        saveCart(updated);
    };

    const removeItem = (item) => {
        const key = getItemKey(item);
        saveCart(cartItems.filter((i) => getItemKey(i) !== key));
    };

    const saveForLater = async (item) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user?._id) {
            toast.info("Please login to save magic bits!");
            return navigate('/login');
        }

        try {
            await axios.post(`${API_BASE}/api/user/wishlist/toggle`, {
                userId: user._id,
                productId: item.productId || item._id
            });
            removeItem(item);
            toast.success("Moved to wishlist! ✨");
        } catch (err) {
            console.error("Save for later error:", err);
            toast.error("Failed to save for later");
        }
    };

    const subtotal = cartItems.reduce((sum, i) => {
        const variantPrice = Array.isArray(i.variants) && i.variants.length > 0 ? Number(i.variants[0].price) : 0;
        const price = Number(i.price) || variantPrice || 0;
        return sum + price * (Number(i.qty) || 1);
    }, 0);

    const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white font-montserrat flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-pastel-pink/10 rounded-full blur-[120px]" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-10 md:p-16 text-center max-w-xl w-full border-2 border-white relative z-10"
                >
                    <div className="w-32 h-32 mx-auto bg-pastel-pink/10 rounded-full flex items-center justify-center mb-10">
                        <ShoppingBag className="w-16 h-16 text-brand-primary" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your Cart is <span className="text-brand-primary">Lonely!</span></h2>
                    <p className="text-gray-400 font-bold mb-12 uppercase tracking-widest text-xs">Add some magic to make it happy</p>
                    <Link
                        to="/diy-kits"
                        className="btn-bubbly inline-flex items-center gap-3 bg-brand-primary text-white font-black py-5 px-10 rounded-full border-none shadow-xl"
                    >
                        <Sparkles size={20} />
                        <span>Go Shopping</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-white font-montserrat relative overflow-hidden pt-32 pb-10 md:pt-48 md:pb-20 px-4 md:px-6">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pastel-yellow/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-pastel-pink/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Whimsical Header */}
                <header className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link to="/diy-kits" className="inline-flex items-center gap-2 text-brand-primary font-black mb-4 md:mb-6 hover:gap-4 transition-all uppercase tracking-widest text-[10px] md:text-xs">
                            <ArrowLeft size={16} /> Back to Magic
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                            My <span className="text-brand-primary">Loot!</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-[2.5rem] border-2 border-white shadow-xl w-fit">
                        <Smile size={28} className="md:size-[32px] text-brand-primary" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Items</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900 leading-none">{totalItems} Goodies</p>
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence>
                            {cartItems.map((item) => {
                                const variantPrice = Array.isArray(item.variants) && item.variants.length > 0 ? Number(item.variants[0].price) : 0;
                                const itemPrice = Number(item.price) || variantPrice || 0;
                                const displayImg = item.image?.startsWith("http") ? item.image : `${API_BASE}/${item.image?.replace(/^\//, "")}`;

                                return (
                                    <motion.div
                                        key={getItemKey(item)}
                                        layout
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="group bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 border-4 border-white hover:border-pastel-pink/10 transition-all"
                                    >
                                        {/* Image Container - Left */}
                                        <Link 
                                            to={`/productdetails/${item.productId || item._id}`}
                                            className="w-full md:w-56 aspect-square rounded-[2rem] overflow-hidden bg-gray-50 flex-shrink-0 relative shadow-inner cursor-pointer"
                                        >
                                            <img
                                                src={item.image ? displayImg : "/placeholder.jpg"}
                                                alt={item.title}
                                                className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </Link>

                                        {/* Content - Right */}
                                        <div className="flex-1 w-full space-y-4 md:space-y-6">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                                                <div className="max-w-md">
                                                    <p className="text-[10px] md:text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-2">{item.vendor || 'Surprise Sutra'}</p>
                                                    <Link to={`/productdetails/${item.productId || item._id}`}>
                                                        <h3 className="text-xl md:text-3xl font-black text-gray-900 leading-[1.1] tracking-tight hover:text-brand-primary transition-colors cursor-pointer">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">In Stock</span>
                                                        <span className="text-gray-200">|</span>
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Free Delivery</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl md:text-3xl font-black text-brand-primary tracking-tighter leading-none">₹{itemPrice * item.qty}</p>
                                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">₹{itemPrice} each</p>
                                                </div>
                                            </div>

                                            {(item.color || item.size) && (
                                                <div className="flex gap-6 py-2 border-y border-gray-50">
                                                    {item.color && (
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Style</span>
                                                            <span className="text-sm font-bold text-gray-700">{item.color}</span>
                                                        </div>
                                                    )}
                                                    {item.size && (
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Weight</span>
                                                            <span className="text-sm font-bold text-gray-700">{item.size}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action Row - Bottom */}
                                            <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-2">
                                                {/* Qty Selector */}
                                                <div className="flex items-center bg-gray-50/50 p-1.5 rounded-2xl border-2 border-white shadow-sm ring-1 ring-gray-100/50">
                                                    <button
                                                        onClick={() => updateQty(item, -1)}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white text-gray-400 hover:text-brand-primary transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-12 text-center font-black text-gray-900 text-lg">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(item, 1)}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white text-gray-400 hover:text-brand-primary transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                {/* Action Links */}
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => removeItem(item)}
                                                        className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors py-2"
                                                    >
                                                        Delete
                                                    </button>
                                                    <div className="w-px h-3 bg-gray-200" />
                                                    <button
                                                        onClick={() => saveForLater(item)}
                                                        className="text-[10px] font-black text-gray-400 hover:text-brand-primary uppercase tracking-widest transition-colors py-2"
                                                    >
                                                        Save for later
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Summary Section Redesign */}
                    <aside className="lg:sticky lg:top-32 space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border-2 border-gray-50 relative overflow-hidden">
                            <h2 className="text-[10px] md:text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Price Details ({totalItems} items)</h2>

                            <div className="space-y-5 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Cart Total</span>
                                    <span className="text-sm font-bold text-gray-900 tracking-tight">Rs {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Delivery Charges</span>
                                    <span className="text-sm font-black text-green-500 uppercase tracking-widest text-[10px]">FREE</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Tax (8%)</span>
                                    <span className="text-sm font-bold text-gray-900 tracking-tight">Rs {Math.round(subtotal * 0.08).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 mb-6" />

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-lg font-black text-gray-900 tracking-tight">Total Amount</span>
                                <span className="text-lg font-black text-gray-900 tracking-tighter">Rs {Math.round(subtotal * 1.08).toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">(Inclusive of all taxes)</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 rounded-2xl font-black text-white text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center border-none"
                                style={{ background: "linear-gradient(135deg, #422006 0%, #2D1403 100%)" }}
                            >
                                Proceed to Checkout
                            </motion.button>
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/diy-kits')}
                                className="w-full py-5 rounded-2xl font-black text-brand-brown text-[11px] uppercase tracking-[0.2em] bg-white border-2 border-brand-brown/5 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
                            >
                                Continue Shopping
                            </motion.button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CartPage;