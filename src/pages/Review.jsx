import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Heart, ChevronLeft, ChevronRight, Gift, PartyPopper, Cake, Trophy, MessageCircle, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    occasion: "Birthday Party",
    rating: 5,
    text: "Absolutely stunning decoration for my daughter's 5th birthday! The team was professional, creative, and brought our princess theme to life perfectly.",
    image: "https://i.pravatar.cc/150?img=1",
    gradient: "linear-gradient(135deg, #F58529, #DD2A7B)",
    bg: "#fff0f8",
  },
  {
    name: "Rahul Verma",
    occasion: "Anniversary",
    rating: 5,
    text: "Surprised my wife with a beautiful anniversary setup at home. The attention to detail was incredible and it made our evening truly special.",
    image: "https://i.pravatar.cc/150?img=33",
    gradient: "linear-gradient(135deg, #DD2A7B, #8134AF)",
    bg: "#f5eeff",
  },
  {
    name: "Anjali Patel",
    occasion: "Baby Shower",
    rating: 5,
    text: "The baby shower decoration exceeded all expectations! Everything was perfect from the balloon arrangements to the cute centerpieces.",
    image: "https://i.pravatar.cc/150?img=5",
    gradient: "linear-gradient(135deg, #8134AF, #515BD4)",
    bg: "#eef0ff",
  },
  {
    name: "Neha Gupta",
    occasion: "Bachelor Party",
    rating: 5,
    text: "Epic setup for my bachelorette! Every corner was Instagram-worthy and my friends couldn't stop complimenting the team's creativity.",
    image: "https://i.pravatar.cc/150?img=9",
    gradient: "linear-gradient(135deg, #F58529, #FCAF45)",
    bg: "#fffbeb",
  },
  {
    name: "Aditya Singh",
    occasion: "Corporate Event",
    rating: 5,
    text: "Professional, punctual and absolutely creative. Our office anniversary event was a huge hit. Will definitely hire them again!",
    image: "https://i.pravatar.cc/150?img=12",
    gradient: "linear-gradient(135deg, #515BD4, #DD2A7B)",
    bg: "#fff0f8",
  },
];

/* C-arc transform for each card index relative to center */
/*  arc opens to the right — left cards angle right, right cards angle left */
const getArcStyle = (offset, total) => {
  // offset: -2 … +2  (distance from center)
  const arcRadius  = 420;          // how "deep" the C curves
  const spreadY    = 90;          // vertical spread between cards
  const maxRotate  = 14;           // max tilt in degrees
  const scaleOuter = 0.82;         // scale of the outermost cards
  const scale      = 1 - Math.abs(offset) * ((1 - scaleOuter) / Math.floor(total / 2));
  const translateY = offset * spreadY;
  const translateX = -(Math.pow(Math.abs(offset), 1.6) * (arcRadius / 6));
  const rotate     = -offset * maxRotate; // negative so it curves inward
  const zIndex     = 10 - Math.abs(offset);
  const opacity    = 0.72 + (1 - Math.abs(offset) / (total / 2)) * 0.28;

  return { scale, translateY, translateX, rotate, zIndex, opacity };
};

const ReviewsSection = () => {
  const [center, setCenter] = useState(2); 

  const prev = () => setCenter((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCenter((c) => (c + 1) % reviews.length);

  // Build display order: always show 5 cards centered on `center`
  const displayIndices = [-2, -1, 0, 1, 2].map(
    (offset) => ((center + offset) + reviews.length) % reviews.length
  );

  return (
    <section
      style={{
        position: "relative",
        padding: "6rem 1rem 5rem",
        background: "linear-gradient(180deg, #fff 0%, #fdf6ff 40%, #fff8f0 80%, #fff 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background blobs (Expanded) */}
      <div style={{ position: "absolute", top: "5%", left: "-10%", width: "50%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(221,42,123,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-10%", width: "50%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,133,41,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "15%", right: "5%", width: "40%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(254,218,119,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "40%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(129,52,175,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Confetti Particles (Simplified for performance) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            width: "6px",
            height: "6px",
            background: i % 2 === 0 ? "#F58529" : "#DD2A7B",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0
          }}
        />
      ))}

      {/* Trust Badges - Desktop Only */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "18%", right: "12%", pointerEvents: "none", zIndex: 1 }}
        className="hidden lg:block opacity-60 lg:opacity-100"
      >
        <div style={{ background: "white", padding: "1.25rem", borderRadius: "2rem", boxShadow: "0 10px 40px rgba(221,42,123,0.12)", border: "1px solid rgba(221,42,123,0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ background: "rgba(245,133,41,0.1)", padding: "0.5rem", borderRadius: "1rem" }}>
            <Trophy size={24} style={{ color: "#F58529" }} />
          </div>
          <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#3d2a1a", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.2 }}>100% Magical<br/>Service</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: "absolute", bottom: "22%", left: "12%", pointerEvents: "none", zIndex: 1 }}
        className="hidden lg:block opacity-60 lg:opacity-100"
      >
        <div style={{ background: "white", padding: "1.25rem", borderRadius: "2rem", boxShadow: "0 10px 40px rgba(245,133,41,0.12)", border: "1px solid rgba(245,133,41,0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ background: "rgba(221,42,123,0.1)", padding: "0.5rem", borderRadius: "1rem" }}>
            <Star size={24} style={{ color: "#DD2A7B", fill: "#DD2A7B" }} />
          </div>
          <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#3d2a1a", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.2 }}>5k+ Happy<br/>Clients</span>
        </div>
      </motion.div>

      {/* Floating Decorative Icons - Left Side */}
      <div style={{ position: "absolute", left: "4%", top: "0", height: "100%", width: "120px", pointerEvents: "none", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }} className="hidden lg:flex">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <Gift style={{ color: "#F58529", opacity: 0.15 }} size={48} />
        </motion.div>
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Cake style={{ color: "#DD2A7B", opacity: 0.12 }} size={56} />
        </motion.div>
        <motion.div animate={{ x: [-10, 10, -10], y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <Sparkles style={{ color: "#8134AF", opacity: 0.14 }} size={52} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
          <Heart style={{ color: "#F58529", opacity: 0.1 }} size={38} />
        </motion.div>
      </div>

      {/* Floating Decorative Icons - Right Side */}
      <div style={{ position: "absolute", right: "4%", top: "0", height: "100%", width: "120px", pointerEvents: "none", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }} className="hidden lg:flex">
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <PartyPopper style={{ color: "#DD2A7B", opacity: 0.14 }} size={52} />
        </motion.div>
        <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.12, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
          <Trophy style={{ color: "#FCAF45", opacity: 0.13 }} size={48} />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <Sparkles style={{ color: "#F58529", opacity: 0.15 }} size={64} />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
          <MessageCircle style={{ color: "#DD2A7B", opacity: 0.1 }} size={40} />
        </motion.div>
      </div>

      {/* Original Sparkles (kept but adjusted position if needed) */}
      <motion.div animate={{ y: [0, -18, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "12%", left: "20%", pointerEvents: "none" }}>
        <Sparkles style={{ color: "#F58529", opacity: 0.22 }} size={44} />
      </motion.div>
      <motion.div animate={{ y: [0, 18, 0], rotate: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: "absolute", bottom: "14%", right: "20%", pointerEvents: "none" }}>
        <Sparkles style={{ color: "#DD2A7B", opacity: 0.18 }} size={36} />
      </motion.div>

      {/* ── Header ── (Mobile/Tablet Only) */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }} className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1.2rem", borderRadius: "999px",
            background: "#fff0f8", color: "#DD2A7B",
            fontWeight: 900, fontSize: "0.72rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            marginBottom: "1rem", boxShadow: "0 2px 16px rgba(221,42,123,0.10)",
          }}
        >
          <Heart size={14} style={{ fill: "#DD2A7B", color: "#DD2A7B" }} />
          Client Testimonials
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05,
            background: "linear-gradient(90deg, #F58529, #DD2A7B, #8134AF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: "0.75rem",
          }}
        >
          Loved by our happy clients.
        </motion.h2>
        <p style={{ color: "#7a5a3a", fontWeight: 600, fontSize: "1rem", opacity: 0.7, maxWidth: "420px", margin: "0 auto" }}>
          Real stories from celebrations that became unforgettable memories.
        </p>
      </div>

      {/* ── Responsive Stage (Split on Laptop/Desktop) ── */}
      <div 
        className="relative mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-16"
        style={{
          maxWidth: "1300px",
          height: "clamp(500px, 65vw, 680px)",
        }}
      >
        {/* Testimonial Cards - C-Arc Stage */}
        <div 
          className="relative flex items-center justify-center w-full lg:w-[58%]"
          style={{ height: "100%" }}
        >
          {displayIndices.map((reviewIdx, slotIdx) => {
            const offset = slotIdx - 2; // -2..+2
            const review = reviews[reviewIdx];
            const { scale, translateY, translateX, rotate, zIndex, opacity } = getArcStyle(offset, reviews.length);
            const isCenter = offset === 0;
  
            return (
              <motion.div
                key={reviewIdx}
                onClick={() => !isCenter && setCenter(reviewIdx)}
                animate={{ scale, y: translateY, x: translateX, rotate, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 200, damping: 28 }}
                style={{
                  position:  "absolute",
                  width:     "clamp(220px, 26vw, 300px)",
                  cursor:    isCenter ? "default" : "pointer",
                  transformOrigin: "center bottom",
                }}
                whileHover={!isCenter ? { scale: scale * 1.04, transition: { duration: 0.2 } } : {}}
              >
                {/* Card */}
                <div style={{
                  borderRadius: "2rem",
                  background: review.bg,
                  border: isCenter ? "3px solid rgba(245,133,41,0.5)" : "2px solid rgba(255,255,255,0.9)",
                  boxShadow: isCenter
                    ? "0 32px 64px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(245,133,41,0.15)"
                    : "0 12px 32px -8px rgba(0,0,0,0.14)",
                  padding: isCenter ? "2rem 1.75rem" : "1.5rem 1.5rem",
                  transition: "padding 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Gradient blob behind */}
                  <div style={{
                    position: "absolute", top: "-30%", right: "-20%",
                    width: "70%", height: "70%", borderRadius: "50%",
                    background: review.gradient, opacity: 0.08, filter: "blur(30px)",
                    pointerEvents: "none",
                  }} />
  
                  {/* Big quote mark */}
                  <Quote style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    opacity: 0.07, color: "#DD2A7B",
                  }} size={isCenter ? 56 : 40} />
  
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "3px", marginBottom: "0.9rem", position: "relative" }}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={isCenter ? 15 : 12} style={{ fill: "#F58529", color: "#F58529" }} />
                    ))}
                  </div>
  
                  {/* Review text */}
                  <p style={{
                    fontSize:   isCenter ? "0.92rem" : "0.78rem",
                    fontWeight: 700,
                    color:      "#4a3728",
                    lineHeight: 1.65,
                    fontStyle:  "italic",
                    marginBottom: "1.25rem",
                    position:   "relative",
                  }}>
                    "{review.text}"
                  </p>
  
                  {/* Author row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", position: "relative" }}>
                    {/* Avatar with gradient ring */}
                    <div style={{
                      padding: "2px", borderRadius: "50%",
                      background: review.gradient,
                      flexShrink: 0,
                    }}>
                      <img
                        src={review.image}
                        alt={review.name}
                        style={{
                          width:        isCenter ? 46 : 36,
                          height:       isCenter ? 46 : 36,
                          borderRadius: "50%",
                          display:      "block",
                          border:       "2px solid white",
                          objectFit:    "cover",
                        }}
                      />
                    </div>
                    <div>
                      <p style={{
                        fontWeight:  900,
                        fontSize:    isCenter ? "0.92rem" : "0.78rem",
                        color:       "#3d2a1a",
                        lineHeight:  1.2,
                      }}>
                        {review.name}
                      </p>
                      <p style={{
                        fontSize:      isCenter ? "0.65rem" : "0.58rem",
                        fontWeight:    800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        background:    review.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor:  "transparent",
                      }}>
                        {review.occasion}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
  
        {/* Side Header Content (Laptop/Desktop) */}
        <div className="hidden lg:flex flex-col items-start text-left w-full lg:w-[35%] lg:pl-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", borderRadius: "999px",
              background: "#fff0f8", color: "#DD2A7B",
              fontWeight: 900, fontSize: "0.72rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              marginBottom: "1.5rem", boxShadow: "0 2px 16px rgba(221,42,123,0.10)",
            }}
          >
            <Heart size={14} style={{ fill: "#DD2A7B", color: "#DD2A7B" }} />
            Client Testimonials
          </motion.div>
  
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.1,
              background: "linear-gradient(90deg, #F58529, #DD2A7B, #8134AF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "1.5rem",
            }}
          >
            Loved by <br/> our happy <br/> clients.
          </motion.h2>
          <p style={{ color: "#7a5a3a", fontWeight: 600, fontSize: "1.1rem", opacity: 0.7, maxWidth: "320px" }}>
            Real stories from celebrations that became unforgettable memories.
          </p>
        </div>
      </div>

      {/* ── Navigation + dots ── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1.5rem",
        marginTop:      "2.5rem",
      }}>
        <motion.button
          onClick={prev}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          style={{
            width: "3rem", height: "3rem", borderRadius: "50%",
            background: "#fff", border: "2px solid rgba(221,42,123,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#DD2A7B",
          }}
        >
          <ChevronLeft size={22} />
        </motion.button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenter(i)}
              style={{
                width:        i === center ? "2rem" : "0.45rem",
                height:       "0.45rem",
                borderRadius: "999px",
                border:       "none",
                cursor:       "pointer",
                transition:   "all 0.3s ease",
                background:   i === center
                  ? "linear-gradient(90deg, #F58529, #DD2A7B)"
                  : "rgba(0,0,0,0.12)",
                padding: 0,
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          style={{
            width: "3rem", height: "3rem", borderRadius: "50%",
            background: "#fff", border: "2px solid rgba(221,42,123,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#DD2A7B",
          }}
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>
    </section>
  );
};

export default ReviewsSection;
