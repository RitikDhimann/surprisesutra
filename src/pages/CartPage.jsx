import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
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
            toast.info("Please login to access your shopping cart.");
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
            toast.success("Moved to wishlist!");
        } catch (err) {
            console.error("Save for later error:", err);
            toast.error("Failed to save item");
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
            <div className="min-h-screen bg-[#fafafa] font-jakarta flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-sm p-10 md:p-16 text-center max-w-xl w-full border border-gray-100"
                >
                    <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-400">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 font-medium mb-10 text-sm">Add items to your cart to continue shopping.</p>
                    <Link
                        to="/diy-kits"
                        className="inline-flex items-center gap-3 bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-primary/90 transition-all"
                    >
                        <ShoppingBag size={18} />
                        <span>Browse Shop</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-20 px-4 md:px-6">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] -mr-32 -mt-32" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <header className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link to="/diy-kits" className="inline-flex items-center gap-2 text-gray-500 font-medium mb-4 hover:text-brand-primary transition-colors text-xs">
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-none">
                            Shopping <span className="text-brand-primary">Cart</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 bg-white shadow-sm px-6 py-4 rounded-2xl border border-gray-100 self-center md:self-auto w-full sm:w-auto">
                        <ShoppingBag size={24} className="text-brand-primary" />
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Items in Cart</p>
                            <p className="text-xl font-bold text-gray-900 leading-none">{totalItems} Products</p>
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
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ scale: 0.95, opacity: 0 }}
                                        className="bg-white rounded-3xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        {/* Image Container */}
                                        <Link 
                                            to={`/productdetails/${item.productId || item._id}`}
                                            className="w-full md:w-40 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 relative group cursor-pointer"
                                        >
                                            <img
                                                src={item.image ? displayImg : "/placeholder.jpg"}
                                                alt={item.title}
                                                className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
 
                                        {/* Content */}
                                        <div className="flex-1 w-full space-y-4">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                                <div className="max-w-md">
                                                    <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{item.vendor || 'Surprise Sutra'}</p>
                                                    <Link to={`/productdetails/${item.productId || item._id}`}>
                                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight hover:text-brand-primary transition-colors">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">In Stock</span>
                                                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-[9px]">Fast Delivery</span>
                                                    </div>
                                                </div>
                                                <div className="text-left md:text-right">
                                                    <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">₹{(itemPrice * item.qty).toLocaleString()}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">₹{itemPrice.toLocaleString()} / unit</p>
                                                </div>
                                            </div>
 
                                            {(item.color || item.size) && (
                                                <div className="flex gap-6 py-3 border-y border-gray-50">
                                                    {item.color && (
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Style</span>
                                                            <span className="text-sm font-semibold text-gray-700">{item.color}</span>
                                                        </div>
                                                    )}
                                                    {item.size && (
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Unit</span>
                                                            <span className="text-sm font-semibold text-gray-700">{item.size}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
 
                                            {/* Action Row */}
                                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                                    <button
                                                        onClick={() => updateQty(item, -1)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-gray-400 hover:text-brand-primary transition-all active:scale-95"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-10 text-center font-bold text-gray-900">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(item, 1)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-gray-400 hover:text-brand-primary transition-all active:scale-95"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
 
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => removeItem(item)}
                                                        className="text-[10px] font-bold text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                    <div className="w-px h-3 bg-gray-200" />
                                                    <button
                                                        onClick={() => saveForLater(item)}
                                                        className="text-[10px] font-bold text-gray-400 hover:text-brand-primary uppercase tracking-widest transition-colors"
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
                    {/* Summary Section */}
                    <aside className="lg:sticky lg:top-32 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-gray-100">
                            <h2 className="text-[10px] font-bold text-gray-400 mb-8 uppercase tracking-widest">Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
 
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span className="text-sm">Subtotal</span>
                                    <span className="text-sm font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span className="text-sm">Delivery</span>
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span className="text-sm">Estimated Tax (8%)</span>
                                    <span className="text-sm font-semibold text-gray-900">₹{Math.round(subtotal * 0.08).toLocaleString()}</span>
                                </div>
                            </div>
 
                            <div className="h-px bg-gray-100 mb-8" />
 
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">₹{Math.round(subtotal * 1.08).toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Prices inclusive of all taxes</p>
                        </div>
 
                        <div className="flex flex-col gap-3">
                            <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 rounded-2xl font-bold text-white text-[11px] uppercase tracking-widest shadow-lg bg-brand-primary hover:bg-brand-primary/90 transition-all flex items-center justify-center border-none"
                            >
                                Proceed to Checkout
                            </motion.button>
                            <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/diy-kits')}
                                className="w-full py-5 rounded-2xl font-bold text-gray-500 text-[11px] uppercase tracking-widest bg-white border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
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