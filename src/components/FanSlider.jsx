import React, { useState, memo, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Gift, Baby, Heart, PartyPopper, Camera } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";

/* Categories Data */
const CATEGORIES = [
  {
    id: "birthday",
    label: "Birthday",
    Icon: Gift,
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
      "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=600",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
    ]
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    Icon: Baby,
    images: [
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600",
      "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=600",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    ]
  },
  {
    id: "anniversary",
    label: "Anniversary",
    Icon: Heart,
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
      "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=600",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600",
    ]
  },
  {
    id: "party",
    label: "Party Setups",
    Icon: PartyPopper,
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
      "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=600",
    ]
  }
];

const Card = memo(({ img, i, count, angle, radius, cardW, cardH }) => {
  const offset = i * (360 / count);

  const x = useTransform(angle, (a) => {
    const rad = ((offset + a) * Math.PI) / 180;
    return Math.sin(rad) * radius;
  });

  const z = useTransform(angle, (a) => {
    const rad = ((offset + a) * Math.PI) / 180;
    return Math.cos(rad) * radius;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: cardW,
        height: cardH,
        marginTop: -cardH / 2,
        marginLeft: -cardW / 2,
        x,
        z,
        borderRadius: "0.8rem",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        willChange: "transform",
      }}
    >
      <img
        src={img}
        alt=""
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
});

const FanSlider = () => {
  const { width } = useWindowSize();
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [cfg, setCfg] = useState({ radius: 350, cardW: 150, cardH: 240, height: 500 });

  useEffect(() => {
    if (width < 480) setCfg({ radius: 220, cardW: 140, cardH: 230, height: 380 });
    else if (width < 768) setCfg({ radius: 200, cardW: 120, cardH: 170, height: 300 });
    else if (width < 1024) setCfg({ radius: 230, cardW: 140, cardH: 200, height: 360 });
    else setCfg({ radius: 350, cardW: 150, cardH: 240, height: 500 });
  }, [width]);

  const { radius, cardW, cardH, height } = cfg;
  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const images = currentCategory.images;
  const count = images.length;
  const angle = useMotionValue(0);

  useAnimationFrame((_t, delta) => {
    angle.set((angle.get() + 0.010 * delta) % 360);
  });

  return (
    <section style={{ padding: "3rem 0", background: "#f5f5f5", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 1rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4rem 1.2rem", borderRadius: "999px",
          background: "rgba(221,42,123, 0.05)",
          color: "#DD2A7B", fontSize: "0.75rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.2rem",
        }}>
          <Camera size={16} strokeWidth={2.5} />
          MAGIC MOMENTS
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#202020", marginBottom: "1rem" }}>
          Our <span style={{ color: "#DD2A7B" }}>Best Work.</span>
        </h2>
        <p style={{ color: "#6b7280", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 500, maxWidth: "600px", margin: "0 auto" }}>
          Take a peek into the magical experiences we've crafted for our lovely clients.
        </p>
      </div>

      <div style={{ position: "relative", width: "100vw", height: height, perspective: "1800px", transformStyle: "preserve-3d" }}>
        {images.map((img, i) => (
          <Card key={`${activeTab}-${i}`} img={img} i={i} count={count} angle={angle} radius={radius} cardW={cardW} cardH={cardH} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.5rem, 2vw, 2rem)", maxWidth: "700px", margin: "2rem auto 0", padding: "0 1rem", position: "relative", zIndex: 10, flexWrap: "wrap" }}>
        {CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                background: isActive ? "linear-gradient(135deg, #F58529, #DD2A7B)" : "#fff",
                border: "none", padding: "0.6rem 1.2rem", borderRadius: "99px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "0.5rem", position: "relative",
                boxShadow: isActive ? "0 4px 15px rgba(221,42,123,0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
                color: isActive ? "#fff" : "#666", transition: "all 0.3s ease",
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontWeight: isActive ? 700 : 600, fontSize: "0.85rem", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default memo(FanSlider);