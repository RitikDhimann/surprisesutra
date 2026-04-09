
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroEvent1 from "../assets/hero_event_1.jpg";
import HeroEvent2 from "../assets/hero_event_2.jpg";
import HeroBgAccent from "../assets/hero-bg-accent.png";
import { useState } from "react";
// import BirthdayCake from "../assets/birthday-cake.webp";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);

  return (
    <section id="home" className="relative pt-24 md:pt-54 pb-24 md:pb-40 overflow-hidden min-h-[100vh] flex items-center" style={{ background: "radial-gradient(circle at bottom right, rgba(180, 37, 51, 0.7) 0%, rgba(77, 18, 23, 0.4) 35%, rgba(180, 37, 51, 0) 85%), #fef200" }}>
      {/* Organic Background Blobs */}
      <div className="absolute top-10 right-10 w-[40%] h-[40%] blob-mask blur-2xl -z-0" style={{ background: "rgba(254,218,119,0.15)" }} />
      <div className="absolute bottom-10 left-10 w-[30%] h-[30%] blob-mask-alt blur-3xl -z-0" style={{ background: "rgba(245,133,41,0.12)" }} />

      {/* Artistic Integrated Background Element */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none -z-10 overflow-hidden hidden lg:block"
        style={{
          mixBlendMode: "multiply",
          maskImage: "radial-gradient(ellipse at right top, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at right top, black 20%, transparent 80%)"
        }}
      >
        <motion.img
          src={HeroBgAccent}
          alt=""
          animate={{
            y: [0, -15, 0],
            rotate: [0, -1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full object-contain object-right-top scale-110 opacity-80 contrast-125 brightness-110"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Mobile-only Badge and Heading (Between Header and Images) */}
        <div className="md:hidden flex flex-col items-center text-center px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-transparent border border-[#4d1217]/20 text-[#4d1217] font-black text-xs mb-6"
          >
            <Sparkles size={14} className="text-[#b42533]" />
            <span>GENUINE MAGIC BUILDERS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl xs:text-5xl font-libre font-bold text-[#4d1217] leading-[1.1]"
          >
            You bring the <span className="text-[#4d1217]">occasion</span>, <br />
            <span className="text-[#b42533]">we bring the magic!</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-left order-2 lg:order-1  lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2 rounded-full bg-transparent border border-[#4d1217]/20 text-[#4d1217] font-black text-sm mb-8"
            >
              <Sparkles size={16} className="text-[#b42533]" />
              <span>GENUINE MAGIC BUILDERS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block text-4xl xs:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-libre font-bold text-[#4d1217] leading-[1.1] mb-8"
            >
              You bring the occasion, <br />
              <span className="relative inline-block text-[#b42533]">
                we bring the magic!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-brand-brown/70 font-libre max-w-xl mb-12 leading-relaxed"
            >
              Cute party supplies shipped across India & dreamy decor setups across Delhi NCR
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-row gap-3 md:gap-6 items-start lg:items-start justify-start w-full overflow-visible"
            >
              {/* Button 1 Cluster */}
              <motion.div
                whileHover="hover"
                whileTap="hover"
                initial="initial"
                className="relative flex flex-col items-start lg:items-start group md:flex-initial min-w-0"
              >
                <button
                  onClick={() => navigate("/diy-kits")}
                  className="btn-action btn-action-primary flex-1 px-3 py-4 md:px-10 md:py-3 text-[10px] md:text-[13px] text-center leading-tight"
                >
                  <span className="break-words">Curated Party Supplies</span>
                  <ArrowRight size={14} className="shrink-0 md:w-[18px] md:h-[18px]" />
                </button>
                {/* Secondary Hover Reveal - Handwritten & Floating */}
                <motion.span
                  variants={{
                    initial: { opacity: 0, x: -10, scale: 0.8 },
                    hover: {
                      opacity: 1,
                      x: 20,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }
                  }}
                  animate={isHovering1 ? { y: [0, -4, 0] } : {}}
                  transition={{
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  onMouseEnter={() => setIsHovering1(true)}
                  onMouseLeave={() => setIsHovering1(false)}
                  className="absolute left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-full mt-3 text-[#b42533] font-handwritten text-lg md:text-2xl whitespace-nowrap pointer-events-none drop-shadow-sm bg-white/60 backdrop-blur-[2px] px-2 py-0.5 rounded-lg border border-white/30 z-30"
                >
                  (I’ll do it myself😤)
                </motion.span>
              </motion.div>

              {/* Button 2 Cluster */}
              <motion.div
                whileHover="hover"
                whileTap="hover"
                initial="initial"
                className="relative flex flex-col items-start lg:items-start group md:flex-initial min-w-0"
              >
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-action btn-action-secondary flex-1 px-3 py-4 md:px-10 md:py-3 text-[10px] md:text-[13px] text-center leading-tight"
                >
                  <span className="break-words">Signature Decor Services</span>
                  <ArrowRight size={14} className="shrink-0 md:w-[18px] md:h-[18px]" />
                </button>
                {/* Secondary Hover Reveal - Handwritten & Floating */}
                <motion.span
                  variants={{
                    initial: { opacity: 0, x: -10, scale: 0.8 },
                    hover: {
                      opacity: 1,
                      x: 20,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }
                  }}
                  animate={isHovering2 ? { y: [0, -4, 0] } : {}}
                  transition={{
                    y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  onMouseEnter={() => setIsHovering2(true)}
                  onMouseLeave={() => setIsHovering2(false)}
                  className="absolute left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-full mt-3 text-[#b42533] font-handwritten text-lg md:text-2xl whitespace-nowrap pointer-events-none drop-shadow-sm bg-white/60 backdrop-blur-[2px] px-2 py-0.5 rounded-lg border border-white/30 z-30"
                >
                  (Please do it for me😭)
                </motion.span>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual Side - Floating Collage Concept */}
          <div className="relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:mt-0">
            {/* Main Image (Back) */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-[5%] top-[5%] w-[65%] max-w-[320px] aspect-[4/5] bg-white p-2 sm:p-4 rounded-3xl shadow-2xl z-10 animate-float-delayed will-change-transform"
              style={{ transform: "translateZ(0)" }}
            >
              <img
                src={HeroEvent1}
                alt="Premium Celebration Decor"
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
                decoding="async"
              />
            </motion.div>

            {/* Second Image (Front Overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -15 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute right-[5%] bottom-[5%] w-[60%] max-w-[300px] aspect-square bg-white p-2 sm:p-4 rounded-3xl shadow-2xl z-20 animate-float will-change-transform"
              style={{ transform: "translateZ(0)" }}
            >
              <img
                src={HeroEvent2}
                alt="Event Entrance Welcome Decor"
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
                decoding="async"
              />
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
