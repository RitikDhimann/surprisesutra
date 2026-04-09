import React from "react";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    occasion: "Birthday Party",
    rating: 5,
    text: "Absolutely stunning decoration for my daughter's 5th birthday! The team was professional, creative, and brought our princess theme to life perfectly.",
    image: "https://i.pravatar.cc/150?img=1",
    bg: "#fff9f9",
    rotation: -2,
  },
  {
    name: "Rahul Verma",
    occasion: "Anniversary",
    rating: 5,
    text: "Surprised my wife with a beautiful anniversary setup at home. The attention to detail was incredible and it made our evening truly special.",
    image: "https://i.pravatar.cc/150?img=33",
    bg: "#f9fff9",
    rotation: 3,
  },
  {
    name: "Anjali Patel",
    occasion: "Baby Shower",
    rating: 5,
    text: "The baby shower decoration exceeded all expectations! Everything was perfect from the balloon arrangements to the cute centerpieces.",
    image: "https://i.pravatar.cc/150?img=5",
    bg: "#f9f9ff",
    rotation: -1.5,
  },
  {
    name: "Neha Gupta",
    occasion: "Bachelor Party",
    rating: 5,
    text: "Epic setup for my bachelorette! Every corner was Instagram-worthy and my friends couldn't stop complimenting the team's creativity.",
    image: "https://i.pravatar.cc/150?img=9",
    bg: "#fffdf9",
    rotation: 2.5,
  },
  {
    name: "Aditya Singh",
    occasion: "Corporate Event",
    rating: 5,
    text: "Professional, punctual and absolutely creative. Our office anniversary event was a huge hit. Will definitely hire them again!",
    image: "https://i.pravatar.cc/150?img=12",
    bg: "#fdf9ff",
    rotation: -3,
  },
];

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: review.rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ 
        rotate: [review.rotation - 1, review.rotation + 1, review.rotation - 1],
        transition: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05, 
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
      className="relative flex-shrink-0 w-72 md:w-80 p-8 shadow-xl border border-black/5"
      style={{ 
        background: review.bg,
        boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1), 0 4px 10px -5px rgba(0,0,0,0.05)",
        marginTop: `${Math.abs(review.rotation) * 10}px` // Slight vertical variance
      }}
    >
      {/* Clip / Pin */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="w-3 h-8 bg-gray-400/80 rounded-full shadow-sm relative">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={14} fill="#c73020" className="text-[#c73020]" />
          ))}
        </div>

        <p className="text-gray-700 font-libre italic leading-relaxed text-sm md:text-base">
          "{review.text}"
        </p>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/5">
          <img 
            src={review.image} 
            alt={review.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
            <p className="text-xs text-[#c73020] font-bold uppercase tracking-wider">{review.occasion}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="pt-12 pb-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#fdd825]/20 text-[#c73020] font-black text-[10px] tracking-[0.2em] shadow-sm mb-6 uppercase border border-[#c73020]/10"
            >
                <Heart size={12} fill="#c73020" />
                <span>Client Testimonials</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading font-medium text-gray-950 mb-6 tracking-tight">
                Love Notes from our <span className="text-[#c73020] italic">#SSFamily</span>
            </h2>
            <p className="text-gray-500 font-libre max-w-xl">
                The reactions, the smiles and everything in between💛
            </p>
        </div>
      </div>

      {/* Clothesline Container */}
      <div className="w-full min-h-[450px] overflow-x-auto no-scrollbar py-8">
        <div className="relative w-max min-w-full mx-auto px-8 md:px-24">
          {/* The Rope (SVG Path) */}
          <div className="absolute top-2 left-0 w-full px-4 z-0 pointer-events-none">
            <svg width="100%" height="60" viewBox="0 0 1200 60" fill="none" preserveAspectRatio="none">
              <path 
                d="M0 10 Q 600 60 1200 10" 
                stroke="#4a3728" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                className="opacity-40"
              />
            </svg>
          </div>

          {/* The Hanging Cards */}
          <div className="flex gap-8 items-start relative z-10">
            {reviews.map((review, index) => (
              <ReviewCard key={review.name} review={review} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-[5%] opacity-10 animate-float hidden md:block">
        <Heart size={48} className="text-[#c73020]" />
      </div>
      <div className="absolute bottom-20 right-[5%] opacity-10 animate-float-delayed hidden md:block">
        <Heart size={32} className="text-[#c73020]" />
      </div>
    </section>
  );
};

export default ReviewsSection;
