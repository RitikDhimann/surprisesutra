import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, ArrowRight, Zap, Gift, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const CARDS = [
  {
    id: "creators",
    label: "Creators",
    emoji: "🎬",
    Icon: Camera,
    headline: "Go viral together",
    sub: "Showcase our quirky props to your audience. Earn rewards, get free kits, and create reels that blow up.",
    perks: ["Free Prop Kits", "Revenue Share", "Co-branded Reels", "Priority Support"],
    gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 100%)",
    light: "#fff0f8",
    accent: "#DD2A7B",
    angle: "-2deg",
  },
  {
    id: "planners",
    label: "Event Planners",
    emoji: "🎪",
    Icon: Sparkles,
    headline: "Build epic events",
    sub: "Get exclusive trade discounts, custom themed props, and a dedicated partner manager for every event.",
    perks: ["40% Trade Discount", "Custom Props", "Dedicated Manager", "Rush Delivery"],
    gradient: "linear-gradient(135deg, #DD2A7B 0%, #8134AF 100%)",
    light: "#f5eeff",
    accent: "#8134AF",
    angle: "1.5deg",
  },
  {
    id: "brands",
    label: "Brands",
    emoji: "⚡",
    Icon: Zap,
    headline: "Amplify your brand",
    sub: "Co-branded products, branded event experiences, and unique campaigns that cut through the noise.",
    perks: ["Co-branded Merch", "Brand Campaigns", "Bulk Pricing", "White-label Options"],
    gradient: "linear-gradient(135deg, #8134AF 0%, #515BD4 100%)",
    light: "#eef0ff",
    accent: "#515BD4",
    angle: "-1deg",
  },
];

const Collaboration = () => {
  const [hovered, setHovered] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % CARDS.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "3rem 0.85rem 2.5rem" : "6rem 1rem 5rem",
        background: "linear-gradient(180deg, #fff 0%, #fdf5ff 40%, #fff8f0 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background radial glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "45%", height: "55%", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,133,41,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "45%", height: "55%", borderRadius: "50%", background: "radial-gradient(circle, rgba(129,52,175,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Floating emoji decorations */}
      {["🎉", "✨", "🎈", "🎊", "💝"].map((e, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20 + i * 4, 0], rotate: [0, 12 * (i % 2 === 0 ? 1 : -1), 0] }}
          transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          style={{
            position: "absolute", fontSize: i === 0 ? "2.5rem" : "1.8rem",
            opacity: 0.18, pointerEvents: "none",
            top: ["10%", "70%", "20%", "80%", "40%"][i],
            left: ["5%", "88%", "92%", "5%", "95%"][i],
          }}
        >{e}</motion.div>
      ))}

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "4rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", borderRadius: "999px",
              background: "linear-gradient(135deg, #F58529, #DD2A7B)",
              color: "#fff", fontSize: "0.7rem", fontWeight: 900,
              letterSpacing: "0.16em", textTransform: "uppercase",
              marginBottom: "1rem", boxShadow: "0 4px 20px rgba(245,133,41,0.30)",
            }}
          >
            <Gift size={13} />
            Join the Party
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: isMobile ? "1.55rem" : "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.05,
              background: "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "0.8rem",
            }}
          >
            Let's create magic together.
          </motion.h2>
          <p style={{ color: "#7a5a3a", fontWeight: 600, fontSize: isMobile ? "0.85rem" : "1.05rem", opacity: 0.7, maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Creator, planner, or brand — pick your collaboration style and let's make something extraordinary.
          </p>
        </div>

        {/* ── Cards Section ── */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: isMobile ? "none" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "0" : "1.75rem",
            transform: isMobile ? `translateX(-${currentIndex * (100 / CARDS.length)}%)` : "none",
            transition: isMobile ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            width: isMobile ? `${CARDS.length * 100}%` : "100%",
            alignItems: "start",
          }}>
            {CARDS.map((card, i) => {
              const isHovered = hovered === card.id;
              return (
                <div
                  key={card.id}
                  style={{
                    width: isMobile ? `${100 / CARDS.length}%` : "auto",
                    padding: isMobile ? "0 0.5rem" : "0",
                    boxSizing: "border-box"
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 18 }}
                    onMouseEnter={() => setHovered(card.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ rotate: isHovered ? "0deg" : (isMobile ? "0deg" : card.angle) }}
                  >
                    {/* Ticket / pass card */}
                    <motion.div
                      animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.03 : 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      style={{
                        borderRadius: "2rem",
                        overflow: "hidden",
                        boxShadow: isHovered
                          ? `0 32px 64px -12px ${card.accent}44, 0 2px 0 ${card.accent}33`
                          : "0 12px 40px -8px rgba(0,0,0,0.14)",
                        background: "#fff",
                        border: `2px solid ${card.accent}22`,
                        cursor: "pointer",
                      }}
                    >
                      {/* Gradient header strip */}
                      <div style={{
                        background: card.gradient,
                        padding: isMobile ? "1.2rem 1.25rem 1rem" : "2rem 1.75rem 1.5rem",
                        position: "relative", overflow: "hidden",
                      }}>
                        {/* Big blurred emoji bg */}
                        <div style={{
                          position: "absolute", top: "-10px", right: "-10px",
                          fontSize: isMobile ? "4rem" : "6rem", opacity: 0.18, lineHeight: 1,
                          userSelect: "none", pointerEvents: "none",
                        }}>{card.emoji}</div>

                        {/* Top row: icon pill + label */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: isMobile ? "0.7rem" : "1.2rem" }}>
                          <div style={{
                            background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)",
                            borderRadius: "999px", padding: "0.35rem 1rem",
                            color: "#fff", fontSize: "0.65rem", fontWeight: 900,
                            letterSpacing: "0.14em", textTransform: "uppercase",
                            display: "flex", alignItems: "center", gap: "0.4rem",
                          }}>
                            <card.Icon size={13} />
                            {card.label}
                          </div>
                        </div>

                        <h3 style={{
                          color: "#fff", fontWeight: 900,
                          fontSize: isMobile ? "1.2rem" : "clamp(1.4rem, 2.5vw, 1.9rem)",
                          lineHeight: 1.1, marginBottom: "0.4rem",
                        }}>{card.headline}</h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: isMobile ? "0.78rem" : "0.85rem", fontWeight: 600, lineHeight: 1.5 }}>
                          {card.sub}
                        </p>
                      </div>

                      {/* Scallop divider between header and body */}
                      <div style={{
                        display: "flex", alignItems: "center",
                        padding: "0 1.5rem",
                        margin: "-1px 0",
                        background: "#fff",
                      }}>
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div key={j} style={{
                            flex: 1, height: "22px",
                            borderRadius: "0 0 50% 50%",
                            background: card.gradient,
                          }} />
                        ))}
                      </div>

                      {/* Body */}
                      <div style={{ background: "#fff", padding: isMobile ? "1rem 1.25rem 1.4rem" : "1.5rem 1.75rem 2rem" }}>
                        {/* Perks list */}
                        <p style={{
                          fontSize: "0.6rem", fontWeight: 900,
                          letterSpacing: "0.18em", textTransform: "uppercase",
                          color: card.accent, marginBottom: "0.75rem",
                        }}>What you get</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
                          {card.perks.map((perk, j) => (
                            <div key={j} style={{
                              display: "flex", alignItems: "center", gap: "0.4rem",
                              background: card.light,
                              borderRadius: "0.75rem",
                              padding: isMobile ? "0.35rem 0.55rem" : "0.45rem 0.7rem",
                              fontSize: isMobile ? "0.68rem" : "0.75rem", fontWeight: 800, color: "#3d2a1a",
                            }}>
                              <Star size={10} style={{ fill: card.accent, color: card.accent, flexShrink: 0 }} />
                              {perk}
                            </div>
                          ))}
                        </div>

                        {/* CTA button */}
                        <motion.button
                          onClick={() => navigate("/contact")}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            width: "100%",
                            padding: isMobile ? "0.7rem 1.2rem" : "0.9rem 1.5rem",
                            borderRadius: "999px",
                            border: "none",
                            background: card.gradient,
                            color: "#fff",
                            fontWeight: 900,
                            fontSize: isMobile ? "0.72rem" : "0.8rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            boxShadow: `0 6px 24px ${card.accent}44`,
                            transition: "box-shadow 0.2s",
                          }}
                        >
                          Partner with us <ArrowRight size={15} />
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dot Indicators */}
          {isMobile && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.6rem",
              marginTop: "1.5rem",
            }}>
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: i === currentIndex ? "1.5rem" : "0.5rem",
                    height: "0.5rem",
                    borderRadius: "999px",
                    border: "none",
                    background: i === currentIndex
                      ? "linear-gradient(90deg, #F58529, #DD2A7B)"
                      : "rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: "center", marginTop: isMobile ? "1.75rem" : "3.5rem" }}
        >
          <p style={{
            fontSize: isMobile ? "0.82rem" : "1rem", fontWeight: 700,
            color: "#7a5a3a", opacity: 0.7, lineHeight: 1.6,
          }}>
            Already a partner? DM us on{" "}
            <a
              href="https://instagram.com/surprisesutra"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 900,
                background: "linear-gradient(90deg,#F58529,#DD2A7B)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                textDecoration: "none",
              }}
            >
              @surprisesutra
            </a>{" "}
            or drop us a mail 🎉
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;