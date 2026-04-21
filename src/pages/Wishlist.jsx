import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShoppingBag, 
  ArrowLeft, 
  Loader2,
  Trash2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchWishlist(userData._id);
  }, [navigate]);

  const fetchWishlist = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/api/user/${userId}/wishlist`);
      setItems(data.wishlist || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post(`${API_BASE}/api/user/wishlist/toggle`, {
        userId: user._id,
        productId
      });
      setItems(items.filter(item => item._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user._id) {
      toast.info("Please login to add items to your cart.");
      navigate("/login");
      return;
    }
    const key = "surprise_sutra_cart";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    let cartImage = "/placeholder.jpg";
    if (product.images?.[0]?.src) {
      cartImage = product.images[0].src.startsWith("http")
        ? product.images[0].src
        : `${API_BASE}/${product.images[0].src.replace(/^\//, "")}`;
    }

    const item = {
      productId: product._id,
      title: product.title,
      vendor: product.vendor || "Surprise Sutra",
      image: cartImage,
      color: null,
      size: null,
      price: product.variants?.[0]?.price || 0,
      compareAtPrice: product.variants?.[0]?.compareAtPrice || 0,
      sku: product.variants?.[0]?.sku || null,
      qty: 1,
      inventoryQty: product.variants?.[0]?.inventoryQty || 0,
    };

    const found = existing.find((i) => i.productId === item.productId);
    const newCart = found
      ? existing.map((i) => (i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i))
      : [...existing, item];

    localStorage.setItem(key, JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Added to cart! 🛍️");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <Link to="/diy-kits" className="inline-flex items-center gap-2 text-gray-500 font-medium mb-4 hover:text-brand-primary transition-colors text-xs">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-none mb-3">
            My <span className="text-brand-primary">Wishlist</span>
          </h1>
          <p className="text-gray-400 font-semibold text-xs uppercase tracking-widest flex items-center gap-2">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} in your wishlist
          </p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Heart className="w-16 h-16 mx-auto text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 font-medium mb-10 text-sm">Start adding items you love to your collection.</p>
            <Link to="/diy-kits" className="inline-flex items-center gap-3 bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-primary/90 transition-all">
               Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col pt-5"
                >
                  <div className="relative aspect-square px-8 flex items-center justify-center">
                    <img 
                      src={product.images?.[0]?.src ? (product.images[0].src.startsWith("http") ? product.images[0].src : `${API_BASE}/${product.images[0].src.replace(/^\//, "")}`) : '/placeholder.jpg'} 
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                    <button 
                      onClick={() => removeFromWishlist(product._id)}
                      className="absolute top-0 right-5 p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-brand-primary transition-colors text-sm">{product.title}</h3>
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-lg font-bold text-gray-900">₹{product.variants?.[0]?.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-gray-50 text-brand-primary font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                      <button 
                        onClick={() => navigate(`/productdetails/${product._id}`)}
                        className="w-full text-gray-400 font-semibold text-[10px] uppercase tracking-widest py-2 hover:text-gray-600 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
