import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import axios from "axios";
import { API_BASE, BASE_URL } from "../config";

const ReviewCard = ({ review, index }) => {
  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/150';
    if (url.startsWith('http')) return url;
    return `${BASE_URL}${url}`;
  };

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
        background: review.bg || "#ffffff",
        boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1), 0 4px 10px -5px rgba(0,0,0,0.05)",
        marginTop: `${Math.abs(review.rotation || 0) * 10 + (index === 1 ? 30 : index === 2 ? 20 : 0)}px` 
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
      <div className="flex flex-col h-full">
        {/* Full Image Preview at Top */}
        <div className="relative -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-[inherit] border-t border-l border-r border-black/10 p-2">
          <img 
            src={getImageUrl(review.image)} 
            alt={review.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-b border-black/5 pb-3">
            <h4 className="font-bold text-gray-900 text-base leading-tight">{review.name}</h4>
            <p className="text-[10px] text-[#c73020] font-black uppercase tracking-wider mt-1">{review.occasion}</p>
          </div>

          <p className="text-gray-700 font-libre italic leading-relaxed text-sm md:text-base">
            "{review.text}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="pb-0 bg-white relative overflow-hidden">
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
            {loading ? (
              <div className="w-full flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#c73020] animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="w-full text-center py-20 text-gray-400 font-medium">
                No reviews yet. Check back soon!
              </div>
            ) : (
              reviews.map((review, index) => (
                <ReviewCard key={review._id} review={review} index={index} />
              ))
            )}
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
