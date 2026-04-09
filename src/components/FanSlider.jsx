import React, { useState, memo, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Gift, Baby, Heart, PartyPopper, Camera } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import RedBow from "../assets/red-bow.png";

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
        transform: "translateZ(0)",
      }}
    >
      <img
        src={img}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateZ(0)",
          backgroundColor: "#f3f4f6"
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
    if (width < 480) setCfg({ radius: 280, cardW: 170, cardH: 270, height: 450 });
    else if (width < 768) setCfg({ radius: 280, cardW: 160, cardH: 240, height: 400 });
    else if (width < 1024) setCfg({ radius: 350, cardW: 180, cardH: 260, height: 480 });
    else setCfg({ radius: 400, cardW: 220, cardH: 320, height: 600 });
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
    <section style={{ padding: "5rem 0", background: "#ffffff", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 1rem" }}>
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

        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#c73020", marginBottom: "1rem", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>
          Our <span style={{ color: "#fdd825", fontStyle: "italic" }}>Best Work.</span>
        </h2>
        <p style={{ color: "#6b7280", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 500, maxWidth: "600px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.8 }}>
          Real setups, real moments, real magic ✨
        </p>
      </div>

      <div style={{ position: "relative", width: "100vw", height: (height * 0.7), perspective: "1800px", transformStyle: "preserve-3d", marginTop: "2rem", willChange: "transform", transform: "translateZ(0)" }}>
        {images.map((img, i) => (
          <Card key={`${activeTab}-${i}`} img={img} i={i} count={count} angle={angle} radius={radius} cardW={cardW} cardH={cardH} />
        ))}
      </div>

    </section>
  );
};

export default memo(FanSlider);