import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Gift, Baby, Heart, PartyPopper, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

const occasions = [
  {
    icon: <Gift size={36} />,
    title: "Birthday Party",
    description: "Transform birthdays into extraordinary experiences with our whimsical setups.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    gradient: "from-[#F58529] to-[#DD2A7B]",
  },
  {
    icon: <Baby size={36} />,
    title: "Baby Shower",
    description: "Celebrate new beginnings with our soft and sweet pastel setups crafted with love.",
    image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&q=80",
    gradient: "from-[#DD2A7B] to-[#8134AF]",
  },
  {
    icon: <Heart size={36} />,
    title: "Anniversaries",
    description: "Romantic and sophisticated decorations that honor your beautiful journey together.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    gradient: "from-[#8134AF] to-[#515BD4]",
  },
  {
    icon: <PartyPopper size={36} />,
    title: "Bachelor Party",
    description: "Wild and fun themes for the perfect pre-wedding celebration you'll never forget.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    gradient: "from-[#515BD4] to-[#DD2A7B]",
  },
  {
    icon: <Calendar size={36} />,
    title: "Corporate",
    description: "Professional yet creative setups for your business milestones and team celebrations.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    gradient: "from-[#F58529] to-[#8134AF]",
  },
  {
    icon: <Sparkles size={36} />,
    title: "Custom Events",
    description: "Don't see your occasion? We'll craft a completely unique theme just for you!",
    image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&q=80",
    gradient: "from-[#DD2A7B] to-[#F58529]",
  },
];



const OccasionsSection = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  
  const visibleCards = useMemo(() => {
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
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
    <section id="services" className="py-14 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fffbeb 20%, #fef3c7 100%)" }}>
      {/* Background Blobs */}
      <div className="absolute top-[10%] right-0 w-[30%] h-[40%] blur-3xl pointer-events-none opacity-20"
        style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B)" }} />
      <div className="absolute bottom-0 left-0 w-[35%] h-[40%] blur-3xl pointer-events-none opacity-20"
        style={{ background: "linear-gradient(135deg, #8134AF, #515BD4)" }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-black text-xs uppercase tracking-widest mb-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B)" }}
          >
            <Sparkles size={16} /> OUR MAGIC WAND
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black mb-6"
            style={{
              background: "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Magic for every occasion.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-brand-brown/60 font-bold max-w-3xl mx-auto leading-relaxed"
          >
            From intimate gatherings to grand celebrations, we bring the fun to you.
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
                      className="relative aspect-[3/4.5] rounded-[0.5rem] shadow-2xl cursor-pointer overflow-hidden bg-white flex flex-col group"
                    >
                      {/* Image background */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={occasion.image}
                          alt={occasion.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90" />
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-10 p-4 sm:p-10 mt-auto flex flex-col items-center text-center">
                        <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-6 shadow-2xl bg-gradient-to-br ${occasion.gradient} group-hover:rotate-12 transition-transform duration-500`}>
                          {occasion.icon}
                        </div>
                        <h3 className="text-sm sm:text-2xl font-heading font-black text-white mb-2 sm:mb-4 tracking-wide group-hover:text-brand-primary transition-colors">
                          {occasion.title}
                        </h3>
                        <div className="bg-white text-brand-brown font-black text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] px-4 py-2 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl shadow-2xl transition-all duration-300 hover:bg-brand-primary hover:text-white transform group-hover:scale-105">
                          BOOK NOW
                        </div>
                      </div>

                      {/* Ghost icon */}
                      <div className="absolute top-6 right-6 opacity-10 text-white pointer-events-none group-hover:scale-125 transition-transform duration-700">
                        {occasion.icon}
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
                      ? "linear-gradient(90deg,#F58529,#DD2A7B)"
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