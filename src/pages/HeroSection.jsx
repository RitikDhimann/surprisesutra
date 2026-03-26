
import { motion } from "framer-motion";
import { Sparkles, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import BirthdayCake from "../assets/birthday-cake.webp";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-24 md:pt-56 pb-24 md:pb-48 overflow-hidden min-h-[110vh] flex items-center" style={{ background: "linear-gradient(135deg, #FFFB7D 0%, #FEDA77 40%, #FCAF45 80%, #F58529 100%)" }}>
      {/* Organic Background Blobs */}
      <div className="absolute top-10 right-10 w-[40%] h-[40%] blob-mask blur-2xl -z-0" style={{ background: "rgba(254,218,119,0.15)" }} />
      <div className="absolute bottom-10 left-10 w-[30%] h-[30%] blob-mask-alt blur-3xl -z-0" style={{ background: "rgba(245,133,41,0.12)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Mobile-only Badge and Heading (Between Header and Images) */}
        <div className="md:hidden flex flex-col items-center text-center px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-brand-brown font-black text-xs shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-brand-primary" />
            <span>GENUINE MAGIC BUILDERS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl xs:text-5xl font-heading font-black text-brand-brown leading-[0.9]"
          >
            Make every <br />
            <span className="text-brand-primary">moment</span> pop!
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-left order-2 lg:order-1  lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-brand-brown font-black text-sm mb-8 shadow-sm"
            >
              <Sparkles size={16} className="text-brand-primary" />
              <span>GENUINE MAGIC BUILDERS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-brand-brown leading-[0.9] mb-8"
            >
              Make every <br />
              <span className="text-brand-primary">moment</span> <span className="relative inline-block">
                pop!
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-12 -right-16 text-yellow-400 hidden lg:block"
                >
                  <Sparkles size={64} />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-brand-brown/70 font-bold max-w-xl mb-12 leading-relaxed"
            >
              Your favorite surprise dealer serving the Greater Delhi-NCR Area with premium decor and quirky props.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-row gap-3 sm:gap-6"
            >
              <button
                onClick={() => navigate("/diy-kits")}
                className="btn-bubbly mb-5 bg-brand-brown text-white text-xs md:text-sm py-2 px-4 md:py-5 md:px-12"
              >
                ORDER NOW
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-bubbly mb-5 bg-white text-brand-brown text-xs md:text-sm py-2 px-4 md:py-5 md:px-12"
              >
                EXPLORE
              </button>
            </motion.div>
          </div>

          {/* Visual Side - Floating Collage Concept */}
          <div className="relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:mt-0">
            {/* Main Image (Back) */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-[5%] top-[5%] w-[65%] max-w-[320px] aspect-[4/5] bg-white p-2 sm:p-4 rounded-3xl shadow-2xl z-10 animate-float-delayed"
            >
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000&h=1000&auto=format&fit=crop"
                alt="Premium Celebration Decor"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            {/* Second Image (Front Overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -15 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute right-[5%] bottom-[5%] w-[60%] max-w-[300px] aspect-square bg-white p-2 sm:p-4 rounded-3xl shadow-2xl z-20 animate-float"
            >
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&h=1000&auto=format&fit=crop"
                alt="Romantic Candlelight Dinner"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            {/* Floating Glassmorphism Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-[10%] lg:top-[15%] right-0 lg:-right-8 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl z-30 flex items-center gap-2 sm:gap-3 border border-white"
            >
              <div className="bg-gradient-to-r from-brand-primary to-[#DD2A7B] rounded-full p-2 shadow-sm">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="text-xs sm:text-sm font-black text-brand-brown leading-tight">
                100%<br />Magical
              </div>
            </motion.div>

            {/* Party Popper Action Element */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 left-0 sm:left-4 w-20 h-20 sm:w-28 sm:h-28 bg-brand-primary rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-white shadow-xl z-30 border-4 border-white"
            >
              <PartyPopper size={40} className="w-8 sm:w-12 h-8 sm:h-12" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scalloped Divider */}
      <div className="absolute -bottom-[2px] left-0 w-full h-32 bg-white wavy-scallop z-[5]" />
    </section>
  );
};

export default HeroSection;
