import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, ShoppingCart, User, ChevronDown, Smile, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assest/new_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getCart = () => {
    const raw = localStorage.getItem("surprise_sutra_cart");
    return raw ? JSON.parse(raw) : [];
  };

  const [cartItems, setCartItems] = useState(getCart());
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const handler = () => setCartItems(getCart());
    window.addEventListener("storage", handler);
    window.addEventListener("cartUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("cartUpdated", handler);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "DIY Kits", path: "/diy-kits" },
    { name: "Supplies", path: "/products" },
    { name: "Party Talk", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-brand ${
      scrolled ? "py-2 px-4 md:py-4 md:px-6" : "py-4 px-6 md:py-8 md:px-10"
    }`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(221,42,123,0.1)] rounded-[3rem] px-4 py-2 md:px-8 md:py-4 border-4 border-brand-primary/20" : "px-0"
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="h-[60px] md:h-[104px] flex items-center"
             >
                <img src={Logo} alt="Surprise Sutra Logo" className="h-full w-auto object-contain" />
             </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-heading font-black uppercase tracking-wider transition-all relative group ${
                  location.pathname === link.path ? "text-brand-primary" : "text-brand-brown/40 hover:text-brand-brown"
                }`}
              >
                {link.name}
                <motion.span 
                  className={`absolute -bottom-2 left-0 w-full h-1 bg-brand-primary blob-mask transition-all ${
                    location.pathname === link.path ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart */}
            <button 
              onClick={() => navigate('/cart')}
              className="w-10 h-10 md:w-14 md:h-14 blob-mask-alt bg-brand-pink/10 flex items-center justify-center text-brand-primary relative hover:bg-brand-primary hover:text-white transition-all group border-none"
            >
              <ShoppingCart size={20} className="md:size-[24px] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-brand-brown text-white text-[8px] md:text-[10px] font-black flex items-center justify-center blob-mask border-2 border-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative group/profile">
               <button 
                 onClick={() => navigate("/profile")}
                 className="w-10 h-10 md:w-14 md:h-14 blob-mask bg-brand-pink/10 flex items-center justify-center text-brand-primary border-none hover:bg-brand-primary hover:text-white transition-all shadow-sm"
               >
                 <User size={20} className="md:size-[24px]" />
               </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 md:w-14 md:h-14 blob-mask bg-brand-pink/5 flex items-center justify-center text-brand-brown hover:bg-brand-pink/20 transition-all font-bold border-none"
            >
                {isOpen ? <X size={20} className="md:size-[24px]" /> : <Menu size={20} className="md:size-[24px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[110] p-10 flex flex-col justify-center items-center gap-8"
            style={{background: "linear-gradient(135deg, #fce4f3 0%, #f3e6ff 40%, #ffe4f0 100%)"}}
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-4 bg-brand-pink/10 blob-mask text-brand-primary border-none"><X size={32} /></button>
            {navLinks.map((link) => (
                <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl md:text-4xl font-heading font-black text-brand-brown tracking-tighter hover:text-brand-primary transition-all"
                >
                    {link.name}
                </Link>
            ))}
            <div className="mt-10 flex flex-col items-center gap-4">
                 <p className="text-xs font-black text-brand-brown/20 uppercase tracking-[0.5em]">Magic is Loading</p>
                 <div className="flex gap-4">
                     <div className="w-12 h-12 blob-mask bg-brand-pink/20 animate-bounce" />
                     <div className="w-12 h-12 blob-mask-alt bg-brand-primary/20 animate-bounce delay-100" />
                     <div className="w-12 h-12 blob-mask bg-pastel-yellow/20 animate-bounce delay-200" />
                 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;