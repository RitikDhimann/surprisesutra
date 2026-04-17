import React, { useState, memo, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Gift, Baby, Heart, PartyPopper, X } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import RedBow from "../assets/red-bow.png";
import Video1 from "../assets/Aarviv2.mp4";
import Video2 from "../assets/Chiyav5.mp4";
import Video3 from "../assets/Cub SSv4.mp4";
import Video4 from "../assets/Divit Part 2v6.mp4";
import Video5 from "../assets/Goosev6.mp4";
import Video6 from "../assets/Pritika and Somil.mp4";
import Video7 from "../assets/SSKeychain.mp4";
import Video8 from "../assets/SSv4Opalite.mp4";
import Video9 from "../assets/Teddybearv3.mp4";
import Video10 from "../assets/Wishlinkv9.mp4";
import Video11 from "../assets/Divit Part 2v6 (1).mp4";
import Video12 from "../assets/Divitv9.mp4";

/* Categories Data */
const CATEGORIES = [
  {
    id: "birthday",
    label: "Birthday",
    Icon: Gift,
    videos: [Video1, Video2, Video3, Video4, Video5, Video6]
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    Icon: Baby,
    videos: [Video7, Video8, Video9, Video10, Video11, Video12]
  },
  {
    id: "anniversary",
    label: "Anniversary",
    Icon: Heart,
    videos: [Video1, Video3, Video5, Video7, Video9, Video11]
  },
  {
    id: "party",
    label: "Party Setups",
    Icon: PartyPopper,
    videos: [Video2, Video4, Video6, Video8, Video10, Video12]
  }
];

const Card = memo(({ video, i, count, angle, radius, cardW, cardH, onClick }) => {
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
      onClick={() => onClick(video)}
      whileHover={{ scale: 1.05 }}
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
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        cursor: "pointer",
      }}
    >
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
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
  const [activeTab] = useState(CATEGORIES[0].id);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cfg, setCfg] = useState({ radius: 350, cardW: 150, cardH: 240, height: 500 });

  useEffect(() => {
    if (width < 480) setCfg({ radius: 260, cardW: 180, cardH: 300, height: 480 });
    else if (width < 768) setCfg({ radius: 280, cardW: 170, cardH: 280, height: 480 });
    else if (width < 1024) setCfg({ radius: 360, cardW: 200, cardH: 320, height: 550 });
    else setCfg({ radius: 400, cardW: 240, cardH: 400, height: 750 });
  }, [width]);

  const { radius, cardW, cardH, height } = cfg;
  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const videos = currentCategory.videos;
  const count = videos.length;
  const angle = useMotionValue(0);

  useAnimationFrame((_t, delta) => {
    angle.set((angle.get() + 0.010 * delta) % 360);
  });

  return (
    <section style={{ padding: "5rem 0", background: "#ffffff", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 1rem" }}>
        {/* Custom Bow Divider replacing the badge */}
        <div className="relative w-full flex items-center justify-center -mt-8 -mb-10 sm:-mb-11 md:-mt-16 md:-mb-10 lg:-mt-16 lg:-mb-16 xl:-mt-24 xl:-mb-24 pointer-events-none z-0">
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
                className="w-28 sm:w-40 md:w-52 lg:w-60 xl:w-72 h-auto mix-blend-multiply"
              />
            </motion.div>
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 500, color: "#c73020", marginBottom: "0.5rem", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>
          Our <span style={{ color: "#fdd825", fontStyle: "italic" }}>Best Work.</span>
        </h2>
        <p style={{ color: "#6b7280", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 500, maxWidth: "600px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.8 }}>
          Real setups, real moments, real magic ✨
        </p>
      </div>

      <div style={{ position: "relative", width: "100vw", height: (height * 0.7), perspective: "1800px", transformStyle: "preserve-3d", marginTop: "3rem", willChange: "transform", transform: "translateZ(0)" }}>
        {videos.map((vid, i) => (
          <Card
            key={`${activeTab}-${i}`}
            video={vid}
            i={i}
            count={count}
            angle={angle}
            radius={radius}
            cardW={cardW}
            cardH={cardH}
            onClick={setSelectedVideo}
          />
        ))}
      </div>

      {/* Side Panel Drawer */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                zIndex: 100,
                cursor: "zoom-out"
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: width < 640 ? "100%" : "450px",
                // background: "#ffffff",
                boxShadow: "-10px 0 50px rgba(0,0,0,0.2)",
                zIndex: 101,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              {/* Header */}
              {/* <div style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6" }}> */}

              <div style={{
                flex: 1,
                position: "relative",   // ✅ important
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <button
                  onClick={() => setSelectedVideo(null)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    zIndex: 20,
                    background: "rgba(0,0,0,0.5)",  // thoda visible (optional)
                    border: "none",
                    borderRadius: "50%",
                    padding: "6px",
                    cursor: "pointer"
                  }}
                >
                  <X size={22} color="#fff" />
                </button>
              </div>

              {/* Video Player */}
              <div style={{ flex: 1, position: "relative", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video
                  src={selectedVideo}
                  autoPlay
                  controls
                  preload="metadata"
                  style={{ width: "100%", height: "100vh", maxHeight: "100%", objectFit: "cover" }}
                />
              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default memo(FanSlider);