import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Gift, X, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/new_logo.png";

const MinimalNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("surprise_sutra_cart") || "[]");
      const count = cart.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "home" },
    { name: "Supplies", path: "/diy-kits" },
    { name: "Services", path: "services" },
    { name: "Collab", path: "/collab" },
    { name: "About", path: "/about" },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith("/")) {
      navigate(path);
    } else {
      const element = document.getElementById(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(path)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-brand ${scrolled ? "bg-white/80 backdrop-blur-md py-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group h-[48px] md:h-[66px]">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={Logo}
              alt="Surprise Sutra"
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="text-sm font-heading font-black text-brand-brown/40 hover:text-brand-brown transition-colors relative group uppercase tracking-widest"
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-1 bg-brand-primary blob-mask transition-all group-hover:w-full"
                  layoutId="navUnderlineMinimal"
                />
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => navigate("/wishlist")}
              className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 blob-mask bg-brand-pink/10 items-center justify-center text-brand-primary border-none hover:bg-brand-primary hover:text-white transition-all shadow-sm group"
            >
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-10 h-10 md:w-12 md:h-12 blob-mask-alt bg-brand-pink/10 flex items-center justify-center text-brand-primary relative hover:bg-brand-primary hover:text-white transition-all group border-none"
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="hidden lg:flex w-10 h-10 md:w-12 md:h-12 blob-mask bg-brand-pink/10 items-center justify-center text-brand-primary border-none hover:bg-brand-primary hover:text-white transition-all shadow-sm"
            >
              <User size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 blob-mask bg-brand-pink/5 flex items-center justify-center text-brand-brown border-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Gift size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Outside Nav to prevent stacking context/transparency issues */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 left-0 w-full h-full z-[10000] !bg-white p-10 flex flex-col justify-center items-center gap-8 lg:hidden overflow-y-auto"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-10 right-10 p-4 bg-brand-pink/10 blob-mask text-brand-primary border-none"
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="text-3xl md:text-4xl font-heading font-black text-brand-brown tracking-tighter hover:text-brand-primary transition-all border-none bg-transparent"
              >
                {link.name}
              </button>
            ))}
            <div className="h-[2px] w-12 bg-brand-pink/20 my-2" />
            <button
              onClick={() => {
                navigate("/wishlist");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-4 text-2xl font-heading font-black text-brand-brown hover:text-brand-primary transition-all border-none bg-transparent"
            >
              <Heart size={32} /> WISHLIST
            </button>
            <button
              onClick={() => {
                navigate("/profile");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-4 text-2xl font-heading font-black text-brand-brown hover:text-brand-primary transition-all border-none bg-transparent"
            >
              <User size={32} /> PROFILE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MinimalNavbar;
