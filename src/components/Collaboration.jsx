import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Quote, Camera, Users, Cake } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import aboutimg from "../assets/about.jpg.jpeg";
import a0 from "../assets/A (0).jpg";
import a1 from "../assets/A (1).JPG";
import a2 from "../assets/A (2).jpg";
import a3 from "../assets/A (3).jpg";
import a4 from "../assets/A (4).jpg";
import a5 from "../assets/A (5).jpg";

// Placeholder gallery for the slideshow
const GALLERY = [
  { id: 1, src: a0, alt: "Real Setup 1" },
  { id: 2, src: a1, alt: "Real Setup 2" },
  { id: 3, src: a2, alt: "Real Setup 3" },
  { id: 4, src: a3, alt: "Real Setup 4" },
  { id: 5, src: a4, alt: "Real Setup 5" },
  { id: 6, src: a5, alt: "Real Setup 6" },
];

const AboutUsSection = () => {
  useWindowSize();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide for the gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Decorative Elements */}


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Visual Side - Founders Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Artistic Frame */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#c73020]/5 rounded-[2rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
              <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl rotate-2 transition-transform group-hover:rotate-0 duration-500 border border-[#c73020]/10">
                <img
                  src={aboutimg}
                  alt="Shagun & Harshit"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-[1.5rem] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 bg-gray-50"
                />

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-[#fdd825] text-[#c73020] p-4 rounded-full shadow-lg border-2 border-white z-20"
                >
                  <Heart size={24} fill="#c73020" />
                </motion.div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Users, text: "2500+ celebrations", color: "bg-blue-50" },
                { icon: Camera, text: "Humans of Bombay", color: "bg-pink-50" },
                { icon: Cake, text: "Dreamy Setups", color: "bg-orange-50" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${item.color} border border-transparent hover:border-black/5 transition-all shadow-sm`}>
                  <item.icon size={20} className="text-[#c73020]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#c73020]">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text Side - Storytelling */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#fdd825] text-[#c73020] font-black text-xs shadow-sm mb-8 border border-[#c73020]/10"
            >
              <Sparkles size={14} />
              <span>A LITTLE ABOUT US 💛</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-heading font-medium text-[#c73020] leading-[1.1] mb-8 tracking-tight"
            >
              We’re Shagun & Harshit — <br />
              <span className="text-brand-brown italic">partners in business, life,</span> <br />
              and everything in between 💛
            </motion.h2>

            <div className="space-y-6 text-brand-brown/80 font-libre text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                What began as a random idea 7 years ago has now been a part of over 2500 celebrations (and counting). Along the way, we’ve had our little viral moments, been featured on <span className="font-bold text-[#c73020]">Humans of Bombay</span>, and most importantly — been trusted with some really special days.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We even got married last year, somewhere between all the setups and celebrations — so this journey is as personal to us as it gets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-[#c73020]/10"
              >
                <div className="flex items-start gap-4">
                  <Quote size={32} className="text-[#fdd825] shrink-0" />
                  <p className="italic text-2xl text-[#c73020] font-heading leading-tight">
                    For us, it’s never just decor — it’s the moment, the reaction, and everything after 🎈
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Real Magic Slideshow Section ── */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-medium text-[#c73020] mb-4 tracking-tight"
            >
              Real setups, real moments, real magic ✨
            </motion.h3>
            <div className="w-24 h-1.5 bg-[#fdd825] mx-auto rounded-full" />
          </div>

          <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                  key={GALLERY[activeSlide].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 scale-110 blur-2xl grayscale-[30%]"
                  style={{ 
                    backgroundImage: `url(${GALLERY[activeSlide].src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={GALLERY[activeSlide].src}
                    alt={GALLERY[activeSlide].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-[3rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-[3rem]" />
                </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-[#fdd825] w-10" : "bg-white/50 hover:bg-white"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;