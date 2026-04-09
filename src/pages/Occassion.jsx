import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import BirthdayImage from '../assets/birthday.jpg';
import AnniversaryImage from '../assets/aniversary.jpg';
import BabyShowerImage from '../assets/babyshower.jpeg';
import BabyWelcomeImage from '../assets/babywelcome.jpeg';
import bacheloretteImage from '../assets/bachlorate.jpg';
import brandImage from '../assets/brandevent.jpeg';
import RedBow from '../assets/red-bow.png';

const occasions = [
  {
    title: "Birthday",
    description: "Transform birthdays into extraordinary experiences with our whimsical setups.",
    image: BirthdayImage,
    gradient: "from-[#c73020] to-[#fdd825]",
  },
  {
    title: "Baby Shower",
    description: "Celebrate new beginnings with our soft and sweet pastel setups crafted with love.",
    image: BabyShowerImage,
    gradient: "from-[#c73020] via-[#fdd825] to-[#c73020]",
  },
  {
    title: "Baby Welcome",
    description: "Celebrate new beginnings with our soft and sweet pastel setups crafted with love.",
    image: BabyWelcomeImage,
    gradient: "from-[#fdd825] to-[#c73020]",
  },
  {
    title: "Anniversary",
    description: "Romantic and sophisticated decorations that honor your beautiful journey together.",
    image: AnniversaryImage,
    gradient: "from-[#c73020] to-[#fdd825]",
  },
  {
    title: "Bachelors & Bachelorettes",
    description: "Wild and fun themes for the perfect pre-wedding celebration you'll never forget.",
    image: bacheloretteImage,
    gradient: "from-[#fdd825] to-[#c73020]",
  },
  {
    title: "Brand Events",
    description: "Don't see your occasion? We'll craft a completely unique theme just for you!",
    image: brandImage,
    gradient: "from-[#c73020] via-[#fdd825] to-[#c73020]",
  },
];



const OccasionsSection = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const visibleCards = useMemo(() => {
    if (width >= 1280) return 3;
    if (width >= 1024) return 2;
    return 2;
  }, [width]);

  const cardTotal = occasions.length;
  const tripledOccasions = useMemo(() => [...occasions, ...occasions, ...occasions], []);
  const totalItems = tripledOccasions.length;

  // Start in the middle set (index 6 if total is 6)
  const [current, setCurrent] = useState(cardTotal);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Autoplay and Infinite Jump logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((c) => c + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleAnimationComplete = () => {
    // Jump if we go outside the middle set
    if (current >= cardTotal * 2) {
      setIsTransitioning(false);
      setCurrent(current - cardTotal);
    } else if (current < cardTotal) {
      setIsTransitioning(false);
      setCurrent(current + cardTotal);
    }
  };

  const next = () => {
    setIsTransitioning(true);
    setCurrent((c) => c + 1);
  };
  const prev = () => {
    setIsTransitioning(true);
    setCurrent((c) => c - 1);
  };

  const goTo = (idx) => {
    setIsTransitioning(true);
    setCurrent(cardTotal + idx);
  };

  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section id="services" className="py-14 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Visual Accents - Floating Balloon */}
      <div className="absolute left-10 top-20 opacity-20 hidden md:block animate-float">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
          <circle cx="20" cy="20" r="15" fill="#c73020" />
          <path d="M20 35 C20 35 15 50 20 70 S25 90 20 110" stroke="#c73020" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Background Blobs */}
      <div className="absolute top-[10%] right-0 w-[30%] h-[40%] blur-3xl pointer-events-none opacity-20"
        style={{ background: "linear-gradient(135deg, #c73020, #fdd825)" }} />
      <div className="absolute bottom-0 left-0 w-[35%] h-[40%] blur-3xl pointer-events-none opacity-20"
        style={{ background: "linear-gradient(135deg, #fdd825, #c73020)" }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          {/* Custom Bow Divider replacing the badge */}
          <div className="relative w-full flex items-center justify-center -mt-8 -mb-4 sm:-mt-12 sm:-mb-6 md:-mt-16 md:-mb-10 lg:-mt-24 lg:-mb-16 xl:-mt-32 xl:-mb-20 pointer-events-none z-0">
            <div className="relative bg-transparent px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <img 
                  src={RedBow} 
                  alt="Decorative Red Bow" 
                  className="w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96 h-auto mix-blend-multiply"
                />
              </motion.div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-heading font-medium mb-6 pb-4 tracking-tight"
            style={{
              background: "linear-gradient(90deg,#c73020,#fdd825,#c73020)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What are we celebrating today?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-brand-brown/60 font-libre max-w-3xl mx-auto leading-relaxed"
          >
            From DIY party supplies to full decor setups — choose your celebration and get started your way
          </motion.p>
        </div>

        {/* Slider Section */}
        <div
          className="relative group/slider"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="py-2">
            <div className="">
              <motion.div
                animate={{ x: `-${(current / totalItems) * 100}%` }}
                onAnimationComplete={handleAnimationComplete}
                transition={isTransitioning ? { type: "spring", stiffness: 200, damping: 25 } : { duration: 0 }}
                className="flex"
                style={{ width: `${(totalItems / visibleCards) * 100}%` }}
              >
                {tripledOccasions.map((occasion, i) => (
                  <div
                    key={`${occasion.title}-${i}`}
                    className="px-2 md:px-4 shrink-0"
                    style={{ width: `${100 / totalItems}%` }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % cardTotal) * 0.05 }}
                      whileHover={{ y: -15 }}
                      onClick={() => navigate("/book-now", { state: { occasion: occasion.title } })}
                      className="relative h-[420px] sm:h-[500px] md:h-[550px]rounded-[0.5rem] shadow-2xl cursor-pointer overflow-hidden bg-white flex flex-col group"
                    >
                      {/* Image background */}
                      <div className="absolute inset-0 z-0 bg-gray-100">
                        <img
                          src={occasion.image}
                          alt={occasion.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full  h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90" />
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-10 p-4 sm:p-10 mt-auto flex flex-col items-center text-center">
                        <h3 className="text-sm sm:text-2xl font-libre font-bold text-white mb-2 sm:mb-6 tracking-wide group-hover:text-brand-primary transition-colors">
                          {occasion.title}
                        </h3>
                        <div className="flex flex-row gap-3 sm:gap-4 w-full justify-center px-1 sm:px-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/diy-kits");
                            }}
                            className="flex-1 relative overflow-hidden bg-white/95 backdrop-blur-md text-brand-brown border border-white/50 font-semibold text-[8px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.15em] py-3 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:bg-brand-primary hover:border-brand-primary hover:text-white hover:shadow-[0_8px_30px_rgba(180,37,51,0.4)] transform hover:-translate-y-1 cursor-pointer"
                          >
                            SHOP NOW
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/book-now", { state: { occasion: occasion.title } });
                            }}
                            className="flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md text-white border border-white/70 font-semibold text-[8px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.15em] py-3 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:bg-white hover:text-brand-brown hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                          >
                            BOOK NOW
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Grouped Bottom Controls */}
        <div className="flex flex-col items-center gap-6 sm:gap-10 mt-8 sm:mt-12">
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={prev}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white shadow-2xl text-brand-brown flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all duration-500 border border-brand-primary/10 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Pagination dots mapped to cardTotal */}
            <div className="flex items-center gap-3">
              {occasions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-500 rounded-full h-2"
                  style={{
                    width: (current % cardTotal) === i ? "3rem" : "0.75rem",
                    background: (current % cardTotal) === i
                      ? "linear-gradient(90deg,#c73020,#fdd825)"
                      : "rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white shadow-2xl text-brand-brown flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all duration-500 border border-brand-primary/10 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default OccasionsSection;