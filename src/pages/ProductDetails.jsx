import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingBag,
  Truck,
  Shield,

  Plus,
  Minus,

  Gift,
  Sparkles,
  Zap,

  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../config";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Original");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);

        const general = (data.images || []).map((img) => ({
          src: img.src?.startsWith("http") ? img.src : (img.src ? `${API_BASE}/${img.src.replace(/^\//, "")}` : "/placeholder.jpg"),
          alt: img.altText || data.title,
        }));

        const colourMap = {};
        (data.colorImages || []).forEach((ci) => {
          const name = ci.color;
          if (!name) return;
          colourMap[name] = (ci.images || []).map((img) => ({
            src: img.src?.startsWith("http") ? img.src : (img.src ? `${API_BASE}/${img.src.replace(/^\//, "")}` : "/placeholder.jpg"),
            alt: `${data.title} – ${name}`,
          }));
        });

        const variantImageMap = {};
        (data.variantImages || []).forEach((vi) => {
          const key = vi.variant;
          if (!key) return;
          variantImageMap[key] = (vi.images || []).map((img) => ({
            src: img.src?.startsWith("http") ? img.src : (img.src ? `${API_BASE}/${img.src.replace(/^\//, "")}` : "/placeholder.jpg"),
            alt: `${data.title} – ${key}`,
          }));
        });

        const vMap = {};
        (data.variants || []).forEach((v) => {
          const c = v.color || v.option1 || "Original";
          const s = v.size || v.option2;
          if (c) {
            if (!vMap[c]) vMap[c] = {};
            if (s) vMap[c][s] = v;
            else vMap[c]["default"] = v;
          }
        });

        const enriched = {
          ...data,
          _generalImages: general,
          _colourImages: colourMap,
          _variantImageMap: variantImageMap,
          _variantMap: vMap,
        };

        setProduct(enriched);

        const colours = Object.keys(vMap);
        if (colours.length) {
          const firstC = colours.includes("Original") ? "Original" : colours[0];
          setSelectedColor(firstC);
          const sizes = Object.keys(vMap[firstC]);
          if (sizes.length && sizes[0] !== "default") setSelectedSize(sizes[0]);
        } else {
          setSelectedColor("Original");
        }

        setLoading(false);
      } catch (e) {
        setError("Failed to load product");
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const hasColourVariants = product && product._variantMap && Object.keys(product._variantMap).length > 0 && !(Object.keys(product._variantMap).length === 1 && Object.keys(product._variantMap)[0] === "Original");
  
  const currentVariantKey = hasColourVariants && selectedColor !== "Original" && selectedSize ? `${selectedColor}-${selectedSize}` : null;

  let currentVariant = {};
  if (product?._variantMap[selectedColor]) {
    currentVariant = selectedSize ? product._variantMap[selectedColor][selectedSize] : product._variantMap[selectedColor]["default"] || product.variants[0];
  } else if (product?.variants?.length) {
    currentVariant = product.variants[0];
  }

  const price = currentVariant?.price ?? 0;
  const compare = currentVariant?.compareAtPrice ?? 0;
  const discount = compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
  const inStock = (currentVariant?.inventoryQty ?? 0) > 0;

  const variantSpecificImages = currentVariantKey ? product?._variantImageMap[currentVariantKey] || [] : [];
  const colorImages = selectedColor !== "Original" ? product?._colourImages[selectedColor] || [] : [];
  const generalImages = product?._generalImages || [];

  const galleryImages = currentVariantKey && variantSpecificImages.length ? [...variantSpecificImages, ...generalImages] : selectedColor !== "Original" && colorImages.length ? [...colorImages, ...generalImages] : generalImages;

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [currentVariantKey, selectedColor]);

  const addToCart = () => {
    if (!product) return false;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user._id) {
      toast.info("Please login to add magic bits to your cart! ✨");
      navigate("/login");
      return false;
    }
    const existing = JSON.parse(localStorage.getItem("surprise_sutra_cart") || "[]");
    let cartImage = product._generalImages[0]?.src || "/placeholder.jpg";
    if (currentVariantKey && product._variantImageMap[currentVariantKey]?.[0]) cartImage = product._variantImageMap[currentVariantKey][0].src;
    else if (selectedColor !== "Original" && product._colourImages[selectedColor]?.[0]) cartImage = product._colourImages[selectedColor][0].src;

    const item = {
      productId: product._id,
      title: product.title,
      vendor: product.vendor,
      image: cartImage,
      color: selectedColor === "Original" ? null : selectedColor,
      size: selectedSize,
      price,
      compareAtPrice: compare,
      sku: currentVariant.sku || null,
      qty: quantity,
      inventoryQty: currentVariant.inventoryQty || 0,
    };

    const found = existing.find((i) => i.productId === item.productId && i.color === item.color && i.size === item.size);
    const newCart = found ? existing.map((i) => i.productId === item.productId && i.color === item.color && i.size === item.size ? { ...i, qty: i.qty + quantity } : i) : [...existing, item];
    localStorage.setItem("surprise_sutra_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Magic added to cart! ✨");
    return true;
  };

  const buyNow = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user._id) {
      toast.info("Please login to buy some magic! ✨");
      return navigate("/login");
    }
    addToCart();
    navigate("/cart");
  };

  const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const inc = () => setQuantity((q) => (q < 10 ? q + 1 : 10));

  if (loading) return <LoadingSkeleton />;
  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 rounded-[3.5rem] bg-white shadow-2xl border-2 border-pastel-pink/10 max-w-md relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-pastel-pink" />
        <ShoppingBag className="w-20 h-20 mx-auto text-brand-primary/20 mb-8" />
        <h2 className="text-3xl font-black text-gray-900 mb-4">{error || "Magic Lost!"}</h2>
        <p className="text-gray-400 font-bold mb-10 uppercase tracking-widest text-[10px]">The secret you're looking for was moved or never existed.</p>
        <button onClick={() => navigate("/diy-kits")} className="btn-bubbly bg-brand-primary text-white w-full">Back to Magic</button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-brand selection:bg-brand-primary/10 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-pastel-pink/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] bg-pastel-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <main className="max-w-6xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* LEFT: GALLERY SYSTEM */}
            <div className="relative lg:sticky lg:top-32 space-y-6 md:space-y-8">
              <div className="relative group max-w-md mx-auto lg:mx-0">
                <motion.div 
                   layoutId="product-image"
                   className="aspect-square bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border-4 border-white relative cursor-zoom-in"
                >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={selectedImageIdx}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          src={galleryImages[selectedImageIdx]?.src || "/placeholder.jpg"}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>

                  {/* Badges */}
                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    {discount > 0 && (
                      <div className="bg-brand-primary text-white px-3 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-xs shadow-xl animate-bounce">
                        -{discount}% OFF
                      </div>
                    )}
                    <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white">
                        <Sparkles size={12} className="text-brand-primary" />
                        Best Seller
                    </div>
                  </div>
                </motion.div>
                
                {/* Image Nav Buttons */}
                <div className="absolute bottom-8 left-8 flex gap-4">
                     <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400 border border-white">
                        {selectedImageIdx + 1} / {galleryImages.length}
                     </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar px-2 justify-center lg:justify-start">
                {galleryImages.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white border-2 transition-all p-1 ${selectedImageIdx === i ? "border-brand-primary shadow-xl ring-4 ring-brand-primary/5" : "border-white hover:border-brand-primary/20 shadow-sm"}`}
                  >
                    <img src={img.src} alt="thumb" loading="lazy" className="w-full h-full object-cover rounded-xl" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* RIGHT: BUYING SYSTEM */}
            <div className="space-y-10 md:space-y-14">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs font-black text-brand-primary uppercase tracking-[0.3em]">{product.vendor}</span>
                    <div className="w-12 h-px bg-brand-primary/20" />
                     <div className="flex items-center gap-1 text-pastel-yellow">
                        {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                        <span className="text-[9px] text-gray-400 font-bold ml-1 uppercase tracking-widest">4.9 (124)</span>
                    </div>
                 </div>
                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter leading-tight">{product.title}</h1>
                 
                 <div className="flex items-end gap-6 pt-2">
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Magical Price</span>
                        <span className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter">₹{price}</span>
                    </div>
                    {compare > price && (
                        <div className="flex flex-col mb-1.5">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 line-through">Worth ₹{compare}</span>
                            <span className="text-green-500 font-bold text-sm tracking-tight px-3 py-1 bg-green-50 rounded-lg">Save ₹{compare - price}</span>
                        </div>
                    )}
                 </div>
              </div>

              {/* Selection Grids */}
              <div className="space-y-12">
                {hasColourVariants && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Magic Hue: <span className="text-gray-900">{selectedColor}</span></label>
                    </div>
                    <div className="flex flex-wrap gap-4 px-1">
                      {Object.keys(product._variantMap).map((c) => {
                        const colObj = product.colors?.find((co) => co.name === c);
                        const hex = colObj?.hex || "#cccccc";
                        const active = selectedColor === c;
                        return (
                          <motion.button 
                            key={c}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { 
                                setSelectedColor(c); 
                                const sizes = Object.keys(product._variantMap[c]); 
                                if (sizes.length && sizes[0] !== "default") setSelectedSize(sizes[0]);
                                else setSelectedSize(null);
                            }} 
                            className={`group relative flex flex-col items-center gap-2`}
                          >
                             <div 
                                className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-4 shadow-xl transition-all duration-300 flex items-center justify-center ${active ? "border-brand-primary ring-4 ring-brand-primary/10" : "border-white hover:border-gray-100"}`}
                                style={{ backgroundColor: hex }}
                             >
                                {active && <div className="w-1 h-1 bg-white rounded-full shadow-md" />}
                             </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {hasColourVariants && selectedSize && (
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Pick a Weight / Size</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {Object.keys(product._variantMap[selectedColor]).filter(s => s !== "default").map((sz) => {
                        const v = product._variantMap[selectedColor][sz];
                        const ok = (v.inventoryQty || 0) > 0;
                        const active = selectedSize === sz;
                        return (
                          <motion.button
                            key={sz}
                            disabled={!ok}
                            whileHover={ok ? { y: -3 } : {}}
                            whileTap={ok ? { scale: 0.95 } : {}}
                            onClick={() => setSelectedSize(sz)}
                            className={`h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 flex flex-col items-center justify-center gap-0.5 ${active ? "bg-brand-primary text-white border-brand-primary shadow-xl" : ok ? "bg-white text-gray-600 border-gray-100 hover:border-brand-primary/30" : "opacity-30 cursor-not-allowed bg-gray-50 border-transparent strike-through"}`}
                          >
                            <span>{sz}</span>
                            {active && <span className="text-[6px] text-white/60 font-medium">Selected</span>}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Quantity</label>
                        <div className="flex items-center bg-white p-1.5 rounded-xl border-2 border-gray-50 shadow-sm">
                            <button onClick={dec} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-brand-primary"><Minus size={14} /></button>
                            <span className="w-10 text-center font-black text-base text-gray-900">{quantity}</span>
                            <button onClick={inc} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-brand-primary"><Plus size={14} /></button>
                        </div>
                    </div>
                    
                    <div className="space-y-3 flex-1 min-w-[140px]">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Stock Status</label>
                        <div className="h-[56px] flex items-center px-5 rounded-xl bg-white border-2 border-gray-50">
                             {inStock ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-green-200 shadow-lg" />
                                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">In Stock</span>
                                </div>
                             ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Sold Out</span>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <motion.button 
                    whileHover={{ y: -3 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={addToCart} 
                    disabled={!inStock} 
                    className="flex-1 bg-white border-4 border-gray-100 text-gray-900 font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-lg"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -3 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={buyNow} 
                    disabled={!inStock} 
                    className="flex-1 bg-brand-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] border-none shadow-xl shadow-brand-primary/30 flex items-center justify-center gap-3"
                  >
                    <Zap size={18} fill="currentColor" /> Buy Now
                  </motion.button>
                </div>
              </div>

              {/* USP Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100/50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-brand-primary/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-150" />
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Truck size={16} /></div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">EXPRESS MAGIC<br /><span className="text-gray-900 text-[10px] normal-case font-bold">In 3-4 Days</span></div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100/50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-pastel-blue/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-150" />
                    <div className="w-8 h-8 rounded-full bg-pastel-blue/10 flex items-center justify-center text-pastel-blue"><Shield size={16} /></div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">SECURE JOY<br /><span className="text-gray-900 text-[10px] normal-case font-bold whitespace-nowrap">100% Protection</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* BELOW THE FOLD: TABS & CONTENT */}
          <section className="mt-16 md:mt-24 space-y-8">
            <div className="flex items-center justify-center gap-4 md:gap-16 border-b border-gray-100">
                {['description', 'details', 'shipping'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-6 text-xs md:text-sm font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full" />}
                    </button>
                ))}
            </div>

            <div className="max-w-4xl mx-auto py-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                        <motion.div 
                            key="desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="prose prose-lg max-w-none prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
                            
                            {product.boxContents && (
                                <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border-2 border-gray-50 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-pastel-pink/5 rounded-full -mr-24 -mt-24 blur-3xl transition-transform group-hover:scale-150" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-pastel-pink/10 rounded-2xl flex items-center justify-center text-brand-primary">
                                                <Gift size={24} />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Magic Box Contents</h3>
                                        </div>
                                        <p className="text-gray-500 font-medium leading-loose text-lg">{product.boxContents}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'details' && (
                         <motion.div 
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                             <div className="p-10 bg-white rounded-[2.5rem] border-2 border-gray-50">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Specifications</h4>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Category', value: product.productCategory || 'Party Supply' },
                                        { label: 'Type', value: product.type || 'DIY Kit' },
                                        { label: 'SKU', value: currentVariant.sku || 'N/A' },
                                        { label: 'Standard Delivery', value: '3-4 Working Days' }
                                    ].map(spec => (
                                        <div key={spec.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-xs font-bold text-gray-400">{spec.label}</span>
                                            <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                             </div>
                             <div className="p-10 bg-white rounded-[2.5rem] border-2 border-gray-50 flex flex-col justify-center items-center text-center gap-6">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                    <Shield size={32} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tighter">Quality Guarantee</h4>
                                    <p className="text-xs text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Handpicked items & careful packaging for the perfect surprise.</p>
                                </div>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'shipping' && (
                        <motion.div 
                            key="shipping"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="p-10 bg-brand-primary/5 rounded-[3rem] border-2 border-brand-primary/10 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-brand-primary shrink-0 relative">
                                    <Truck size={40} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center animate-pulse"><Check size={16} /></div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-2xl font-black text-gray-900 tracking-tighter">Reliable Magic Transit</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">We ship all orders within 24-48 magical hours. Expect your surprise at your doorstep in 3-5 business days across India.</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: <MapPin size={20} />, title: "Free Shipping", desc: "On all orders above ₹499" },
                                    { icon: <Shield size={20} />, title: "Safe Packed", desc: "No damage guaranteed" },
                                    { icon: <Zap size={20} />, title: "Live Tracking", desc: "Follow the magic path" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-8 bg-white rounded-[2rem] border-2 border-gray-50 text-center space-y-3 hover:border-brand-primary/20 transition-all">
                                        <div className="w-12 h-12 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-brand-primary transition-all">{item.icon}</div>
                                        <h5 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">{item.title}</h5>
                                        <p className="text-xs text-gray-400 font-bold leading-none">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </section>

          {/* Sticky Mobile Add To Cart */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center gap-2">
               <div className="flex items-center bg-gray-50 h-14 rounded-xl px-1">
                    <button onClick={dec} className="w-8 h-8 flex items-center justify-center"><Minus size={12} /></button>
                    <span className="w-8 text-center font-black text-sm">{quantity}</span>
                    <button onClick={inc} className="w-8 h-8 flex items-center justify-center"><Plus size={12} /></button>
               </div>
               <button 
                  onClick={addToCart}
                  disabled={!inStock}
                  className="flex-1 h-14 bg-brand-primary text-white font-black text-[9px] uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/30 flex items-center justify-center gap-2"
               >
                  <ShoppingBag size={14} /> Add 
               </button>
               <button 
                  onClick={buyNow}
                  disabled={!inStock}
                  className="h-14 w-14 bg-gray-900 text-white font-black rounded-xl shadow-xl flex items-center justify-center"
               >
                  <Zap size={18} fill="currentColor" />
               </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="aspect-[4/5] md:aspect-square bg-gray-50 rounded-[4rem]" />
        <div className="space-y-12 py-10">
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded-full w-1/4" />
            <div className="h-16 bg-gray-100 rounded-[2rem] w-3/4" />
          </div>
          <div className="h-32 bg-gray-50 rounded-[3rem] w-full" />
          <div className="space-y-6">
            <div className="h-4 bg-gray-100 rounded-full w-1/3" />
            <div className="grid grid-cols-5 gap-4">
                {[1,2,3,4,5].map(i => <div key={i} className="aspect-square bg-gray-50 rounded-full" />)}
            </div>
          </div>
          <div className="h-20 bg-gray-100 rounded-[2rem] w-full" />
        </div>
      </div>
    </div>
  </div>
);

// Helper Icons for specific tabs
const Check = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const MapPin = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default ProductDetails;