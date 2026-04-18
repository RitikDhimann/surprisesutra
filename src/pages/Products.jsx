import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Loader2,
  ShoppingBag,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
const PRODUCTS_PER_PAGE = 16;

// --- Custom Hooks ---
const useDebounced = (val, delay = 400) => {
  const [d, setD] = useState(val);
  useEffect(() => {
    const id = setTimeout(() => setD(val), delay);
    return () => clearTimeout(id);
  }, [val, delay]);
  return d;
};

const useLocalStorage = (key, initial) => {
  const [v, setV] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch { }
  }, [key, v]);
  return [v, setV];
};

// --- Sub-components ---

const SearchHeader = memo(({ search, setSearch, loading }) => (
  <header className="pt-24 md:pt-40 pb-12 md:pb-20 px-6 relative overflow-hidden" style={{ background: "radial-gradient(circle at bottom right, rgba(253, 216, 37, 0.7) 0%, rgba(253, 216, 37, 0.4) 35%, rgba(253, 216, 37, 0) 85%), #ffffff" }}>
    {/* Organic Background Blobs */}
    <div className="absolute top-10 right-10 w-[40%] h-[40%] bg-white/30 blob-mask blur-2xl animate-float" />
    <div className="absolute bottom-10 left-10 w-[30%] h-[30%] bg-[#f58529]/10 blob-mask-alt blur-3xl animate-float-delayed" />

    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8 leading-tight font-jakarta">
        <span className="text-brand-secondary">The</span> <span className="text-brand-primary italic mx-2">Prop</span> <span className="text-brand-secondary">Shop</span>
      </h1>

      <div className="relative w-full max-w-md group mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors size-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-sm border border-gray-200 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400 transition-all font-jakarta"
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-brand-primary" size={18} />}
      </div>
    </div>
  </header>
));

const FilterSidebar = memo(({ options, selectedCategories, toggleSet, maxPrice, setMaxPrice, clearAll, isMobile, isOpen, onClose }) => {
  const [accordions, setAccordions] = useState({ categories: true, price: true });
  const toggleAccordion = (key) => setAccordions(prev => ({ ...prev, [key]: !prev[key] }));

  const content = (
    <div className="bg-white/95 backdrop-blur-xl h-full flex flex-col">
      <div className="p-6 md:p-6 flex-1 overflow-y-auto  custom-scrollbar">
        <div className="flex items-center justify-between mb-6 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-xl flex items-center justify-center font-jakarta">
              <Filter className="text-brand-primary" size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight font-jakarta">Filters</h2>
          </div>
          {isMobile && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Reset All Button at the top */}
        <button 
          onClick={() => {
            clearAll();
            if (isMobile) onClose();
          }}
          className="w-full py-2.5 mb-8 rounded-xl border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2 group font-jakarta"
        >
          <X size={12} className="group-hover:rotate-90 transition-transform" />
          Reset All
        </button>

        {/* Categories Accordion */}
        <div className="mb-8 font-jakarta">
          <button
            onClick={() => toggleAccordion('categories')}
            className="w-full flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 group"
          >
            <span className="flex items-center gap-3">
              Categories
              <div className="h-px w-8 bg-gray-100 group-hover:w-12 transition-all" />
            </span>
            <motion.div
              animate={{ rotate: accordions.categories ? 180 : 0 }}
              className="text-gray-300"
            >
              <ChevronDown size={14} />
            </motion.div>
          </button>

          <AnimatePresence>
            {accordions.categories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pb-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                  {options.categories.map((cat) => (
                    <label
                      key={cat}
                      className="group flex items-center gap-3 cursor-pointer py-1.5 px-2 rounded-xl hover:bg-brand-primary/5 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSet(cat);
                      }}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${selectedCategories.has(cat)
                        ? 'bg-brand-primary border-brand-primary shadow-sm'
                        : 'bg-white border-gray-200 group-hover:border-brand-primary/40'
                        }`}>
                        {selectedCategories.has(cat) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${selectedCategories.has(cat) ? 'text-brand-primary' : 'text-gray-600 group-hover:text-gray-900'
                        }`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range Accordion */}
        <div className="mb-4 font-jakarta">
          <button
            onClick={() => toggleAccordion('price')}
            className="w-full flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 group"
          >
            <span className="flex items-center gap-3">
              Price Range
              <div className="h-px w-8 bg-gray-100 group-hover:w-12 transition-all" />
            </span>
            <motion.div animate={{ rotate: accordions.price ? 180 : 0 }} className="text-gray-300">
              <ChevronDown size={14} />
            </motion.div>
          </button>

          <AnimatePresence>
            {accordions.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-2 pb-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-pastel-pink/20 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[10px] font-black text-gray-400">₹0</span>
                    <span className="text-[10px] font-black text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded-md">Up to ₹{maxPrice}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] font-jakarta overflow-hidden pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm pointer-events-auto"
                onClick={onClose}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-white shadow-2xl pointer-events-auto"
              >
                {content}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block w-72 shrink-0 h-[calc(100vh-180px)] sticky top-32">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {content}
      </div>
    </aside>
  );
});

const ProductCard = memo(({ product, onNavigate, onAddToCart, wishlist = [], onToggleWishlist }) => {
  const isInWishlist = wishlist.includes(product._id);
  const hasDiscount = product.variants?.[0]?.compareAtPrice > product.variants?.[0]?.price;

  const imageUrl = useMemo(() => {
    if (!product.images?.[0]?.src) return '/placeholder.jpg';
    return product.images[0].src.startsWith("http")
      ? product.images[0].src
      : `${API_BASE}/${product.images[0].src.replace(/^\//, "")}`;
  }, [product.images]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 transition-all duration-500 shadow-sm hover:shadow-lg flex flex-col h-full font-jakarta"
    >
      <div
        className="relative overflow-hidden cursor-pointer shrink-0 bg-gray-50/50 flex items-center justify-center p-8 md:p-12 w-full aspect-square"
        onClick={() => onNavigate(product._id)}
      >
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-brand-primary text-white text-[9px] font-bold px-3 py-1 rounded-lg shadow-sm">
            OFFER
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product._id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-primary shadow-sm hover:scale-110 transition-transform z-20"
        >
          <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-4 md:p-5 flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors cursor-pointer" onClick={() => onNavigate(product._id)}>
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base md:text-xl font-bold text-gray-900">₹{product.variants?.[0]?.price}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through font-medium">₹{product.variants[0].compareAtPrice}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gray-50 text-gray-900 font-bold text-[10px] uppercase tracking-wider py-3 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2 px-2"
          >
            <ShoppingBag size={14} /> Add to Cart
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onAddToCart(product)) {
                onNavigate('/checkout', true);
              }
            }}
            className="flex-1 bg-brand-primary text-white font-bold text-[10px] uppercase tracking-wider py-3 rounded-xl border-none px-2 whitespace-nowrap"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

// --- Main Component ---

const ProductList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [sortBy, setSortBy] = useLocalStorage("ss.sort", "relevance");
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState({ categories: [] });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dSearch = useDebounced(search, 500);
  
  // Fetch wishlist
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?._id) {
      axios.get(`${API_BASE}/api/user/${user._id}/wishlist`)
        .then(res => setWishlist((res.data.wishlist || []).map(p => p._id || p)))
        .catch(err => console.error("Wishlist error:", err));
    }
  }, []);

  const toggleWishlist = useCallback(async (productId) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?._id) {
      toast.info("Please login to save products!");
      return navigate('/login');
    }
    try {
      const { data } = await axios.post(`${API_BASE}/api/user/wishlist/toggle`, {
        userId: user._id,
        productId
      });
      setWishlist(data.wishlist);
      toast.success(data.wishlist.includes(productId) ? "Added to wishlist!" : "Removed from wishlist");
    } catch (err) {
      console.error("Toggle error:", err);
      toast.error("Failed to update wishlist");
    }
  }, [navigate]);

  // Fetch categories from the category API
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/category`);
        if (!active) return;

        const cats = (data.categories || []).map(cat => cat.name);
        setOptions({
          categories: cats.sort(),
        });
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    })();
    return () => { active = false; };
  }, []);

  // Reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [dSearch, maxPrice, selectedCategories, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  // Main data fetch
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page,
          limit: PRODUCTS_PER_PAGE,
          search: dSearch,
          maxPrice,
          sort: sortBy,
        });
        [...selectedCategories].forEach((c) => params.append("categories", c));
        const { data } = await axios.get(`${API_BASE}/api/products?${params.toString()}`);
        if (cancelled) return;
        setItems(data?.products || []);
        setTotalCount(data?.total ?? 0);
      } catch (e) {
        console.error("Failed to load products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, dSearch, maxPrice, selectedCategories, sortBy]);

  // Callbacks
  const toggleSet = useCallback((val) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setMaxPrice(10000);
    setSelectedCategories(new Set());
    setPage(1);
  }, []);

  const addToCart = useCallback((product) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user._id) {
      toast.info("Please login to add products to your cart!");
      navigate("/login");
      return false;
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

    const found = existing.find((i) => i.productId === item.productId && i.color === item.color && i.size === item.size);
    const newCart = found
      ? existing.map((i) => (i.productId === item.productId && i.color === item.color && i.size === item.size ? { ...i, qty: i.qty + 1 } : i))
      : [...existing, item];

    localStorage.setItem(key, JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Added to cart!");
    return true;
  }, [navigate]);

  const handleNavigate = useCallback((path, isFull = false) => {
    if (isFull) {
      navigate(path);
    } else {
      navigate(`/productdetails/${path}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen font-jakarta bg-white">
      <SearchHeader search={search} setSearch={setSearch} loading={loading} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center gap-4 mb-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex-1 flex items-center justify-center gap-3 bg-white py-4 rounded-xl text-gray-900 font-bold text-sm uppercase tracking-wider border border-gray-200 shadow-sm"
            >
              <Filter size={18} /> Filters
            </button>
          </div>

          {/* Desktop Sidebar */}
          <FilterSidebar
            options={options}
            selectedCategories={selectedCategories}
            toggleSet={toggleSet}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearAll={clearAll}
          />

          {/* Mobile Sidebar (Drawer) */}
          <FilterSidebar
            options={options}
            selectedCategories={selectedCategories}
            toggleSet={toggleSet}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearAll={clearAll}
            isMobile={true}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 mb-8 font-jakarta">
                <p className="text-gray-500 font-bold text-xs uppercase tracking-wider hidden sm:block">
                  <span className="text-brand-primary">{totalCount}</span> Products found
                </p>
                <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-6 py-2.5 text-sm font-bold text-gray-700 outline-none cursor-pointer shadow-sm hover:border-brand-primary/20 transition-all appearance-none pr-10"
                    >
                      <option value="relevance">Sort: Featured</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" size={14} />
                  </div>
                </div>
              </div>

            {loading && items.length === 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-pastel-pink/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                <AnimatePresence mode="popLayout">
                  {items.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onNavigate={handleNavigate}
                      onAddToCart={addToCart}
                      wishlist={wishlist}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 md:mt-20">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="p-2 md:p-3 rounded-xl border-2 border-pastel-pink/20 text-brand-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary/5 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    totalPages <= 7 ||
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-xs md:text-sm transition-all ${page === pageNum
                          ? 'bg-brand-primary text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-primary/20'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    (pageNum === 2 && page > 4) ||
                    (pageNum === totalPages - 1 && page < totalPages - 3)
                  ) {
                    return <span key={pageNum} className="text-gray-300">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="p-2 md:p-3 rounded-xl border-2 border-pastel-pink/20 text-brand-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary/5 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
