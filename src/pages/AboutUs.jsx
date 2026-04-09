import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Heart, Star, PartyPopper, MapPin,
  Instagram, ArrowRight, Zap, ShieldCheck, Smile, Gift
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import aboutimg from "../assets/about.jpg.jpeg";
import gallery1 from "../assets/gallery-1.png";
import gallery2 from "../assets/gallery-2.png";
import gallery3 from "../assets/gallery-3.png";
import gallery4 from "../assets/gallery-4.png";
import gallery5 from "../assets/gallery-5.png";

const GALLERY = [
  { id: 1, src: gallery1, alt: "Real Setup 1" },
  { id: 2, src: gallery3, alt: "Real Setup 2" },
  { id: 3, src: gallery5, alt: "Real Setup 3" },
  { id: 4, src: gallery2, alt: "Real Setup 4" },
  { id: 5, src: gallery4, alt: "Real Setup 5" },
];

/* ─── Reusable fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

/* ─── Data ─── */
const stats = [
  { value: "1,500+", label: "Events Decorated", icon: <PartyPopper size={28} /> },
  { value: "52.9K",  label: "Instagram Followers", icon: <Instagram size={28} /> },
  { value: "100%",   label: "Smiles Guaranteed",  icon: <Smile size={28} /> },
  { value: "Delhi",  label: "NCR & Beyond",        icon: <MapPin size={28} /> },
];

const values = [
  {
    icon: <Sparkles size={32} />,
    title: "Creativity First",
    desc: "Every decoration is a canvas. We push the boundaries of imagination to craft set-ups that leave guests speechless.",
    gradient: "from-[#F58529] to-[#DD2A7B]",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Quality You Trust",
    desc: "Premium props, fade-resistant balloons, and food-safe materials — because your celebration deserves the very best.",
    gradient: "from-[#DD2A7B] to-[#8134AF]",
  },
  {
    icon: <Zap size={32} />,
    title: "On-Time Magic",
    desc: "We know surprises shouldn't be late. Our team arrives early, sets up fast, and vanishes before your guest arrives.",
    gradient: "from-[#8134AF] to-[#515BD4]",
  },
  {
    icon: <Heart size={32} />,
    title: "Made With Love",
    desc: "Each prop is crafted with genuine care. We celebrate your milestones as if they were our own.",
    gradient: "from-[#515BD4] to-[#DD2A7B]",
  },
];

const milestones = [
  { year: "2022", text: "Founded in a tiny Delhi flat with three balloons and a big dream." },
  { year: "2023", text: "Expanded to 200+ events. Launched custom hamper range for gifting." },
  { year: "2024", text: "Crossed 50K Instagram followers. Opened our first prop studio." },
  { year: "2025+", text: "Serving all of Delhi-NCR with same-day setups & DIY kit delivery." },
];

/* ─── Component ─── */
const AboutUs = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-brand bg-[#fffbeb] overflow-x-hidden min-h-screen">

      {/* ═══════════ NEW PREMIUM HERO STORY ═══════════ */}
      <section className="relative pt-32 md:pt-48 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#c73020]/5 rounded-[2rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
                <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl rotate-2 transition-transform group-hover:rotate-0 duration-500 border border-[#c73020]/10">
                  <img
                    src={aboutimg}
                    alt="Shagun & Harshit"
                    className="w-full h-auto rounded-[1.5rem] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 bg-gray-50"
                  />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-[#fdd825] text-[#c73020] p-4 rounded-full shadow-lg border-2 border-white z-20"
                  >
                    <Heart size={24} fill="#c73020" />
                  </motion.div>
                </div>
              </div>

              {/* Badges Strip */}
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: PartyPopper, text: "2500+ celebrations" },
                  { icon: Instagram, text: "Humans of Bombay" },
                  { icon: PartyPopper, text: "Dreamy Setups" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#c73020]/10 shadow-sm">
                    <item.icon size={20} className="text-[#c73020]" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#c73020] leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text Side */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#fdd825] text-[#c73020] font-black text-xs shadow-sm mb-8 border border-[#c73020]/10"
              >
                <Sparkles size={14} />
                <span>A LITTLE ABOUT US 💛</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-[#c73020] leading-[1.05] mb-8 tracking-tight"
              >
                We’re Shagun & Harshit — <br />
                <span className="text-brand-brown italic">partners in business, life,</span> <br />
                and everything in between 💛
              </motion.h1>

              <div className="space-y-6 text-brand-brown/80 font-libre text-lg leading-relaxed">
                <p>What began as a random idea 7 years ago has now been a part of over 2500 celebrations (and counting). Along the way, we’ve had our little viral moments, been featured on <span className="font-bold text-[#c73020]">Humans of Bombay</span>, and most importantly — been trusted with some really special days.</p>
                <p>We even got married last year, somewhere between all the setups and celebrations — so this journey is as personal to us as it gets.</p>
                <div className="flex items-center gap-4 mt-10">
                   <button onClick={() => navigate("/contact")} className="bg-[#c73020] text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#fdd825] hover:text-[#c73020] transition-colors shadow-xl">Start Your Story</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Real Magic Slideshow Section ── */}
      <section className="py-24 px-6 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-medium text-[#c73020] mb-4 tracking-tight">Real setups, real moments, real magic ✨</h3>
            <div className="w-24 h-1.5 bg-[#fdd825] mx-auto rounded-full" />
          </div>

          <div className="relative h-[400px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#fffbeb]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img src={GALLERY[activeSlide].src} alt={GALLERY[activeSlide].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-[#fdd825] w-10" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS STRIP ═══════════ */}
      <section className="py-12 sm:py-16 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff 0%, #fffbeb 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="group relative p-4 sm:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border-2 lg:border-4 border-white shadow-xl text-center overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, #fffbeb, #fff8e1)" }}
              >
                <div
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto mb-3 sm:mb-4 shadow-lg scale-90 sm:scale-100"
                  style={{ background: "linear-gradient(135deg, #DD2A7B, #8134AF)" }}
                >
                  {s.icon}
                </div>
                <p className="text-xl sm:text-3xl md:text-4xl font-heading font-black text-brand-brown mb-1 sm:mb-2">{s.value}</p>
                <p className="text-[9px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-brand-brown/50 leading-snug max-w-[120px] sm:max-w-none mx-auto">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION / STORY ═══════════ */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff 0%, #fffbeb 50%, #fff8f0 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Timeline */}
            <div className="space-y-0">
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 shadow-sm"
                style={{ background: "#fef3c7", color: "#b45309" }}
              >
                <Star size={14} /> Our Journey
              </motion.div>
              <div className="relative pl-8">
                {/* vertical line */}
                <div
                  className="absolute left-0 top-0 w-1 h-full rounded-full"
                  style={{ background: "linear-gradient(to bottom, #F58529, #DD2A7B, #8134AF, #515BD4)" }}
                />
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="relative mb-10 last:mb-0"
                  >
                    {/* dot */}
                    <div
                      className="absolute -left-[2.15rem] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #DD2A7B, #8134AF)" }}
                    />
                    <span
                      className="text-xs font-black uppercase tracking-widest"
                      style={{ color: "#DD2A7B" }}
                    >{m.year}</span>
                    <p className="mt-1 text-base font-bold text-brand-brown/80 leading-relaxed">{m.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mission text */}
            <div>
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 shadow-sm"
                style={{ background: "#fef3c7", color: "#b45309" }}
              >
                <Heart size={14} /> Our Mission
              </motion.div>
              <motion.h2
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                className="text-3xl md:text-5xl font-heading font-black text-brand-brown leading-tight mb-8"
              >
                We don't just decorate — we{" "}
                <span
                  style={{ background: "linear-gradient(90deg,#DD2A7B,#8134AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  tell your story.
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                className="text-base md:text-lg text-brand-brown/70 font-bold leading-relaxed mb-6"
              >
                Born out of a deep love for celebrations, Surprise Sutra was built to make every birthday, 
                anniversary, baby shower, and bachelorette feel truly one-of-a-kind. We believe the details 
                matter — the right balloon arch, the perfect color palette, a personalised prop — these tiny 
                touches create memories that last a lifetime.
              </motion.p>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
                className="text-base md:text-lg text-brand-brown/70 font-bold leading-relaxed"
              >
                From intimate home setups to grand event venues across Delhi-NCR, our team brings creativity, 
                speed, and genuine warmth to every single project.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ VALUES ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fffdf5 0%, #fffbeb 100%)" }}>
        <div className="absolute top-0 right-0 w-[35%] h-[40%] blur-3xl pointer-events-none"
          style={{ background: "rgba(221,42,123,0.06)" }} />
        <div className="absolute bottom-0 left-0 w-[35%] h-[40%] blur-3xl pointer-events-none"
          style={{ background: "rgba(129,52,175,0.06)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-black text-xs uppercase tracking-widest mb-6 shadow-lg"
              style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B)" }}
            >
              <Zap size={14} /> What We Stand For
            </motion.div>
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-3xl md:text-5xl font-heading font-black text-brand-brown"
            >
              Our <span style={{ background: "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>core values</span>
            </motion.h2>
          </div>

          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible no-scrollbar">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                className="shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-4 border-white shadow-xl relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fff8e1 100%)" }}
              >
                {/* gradient icon bubble */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg bg-gradient-to-br ${v.gradient}`}
                >
                  {v.icon}
                </div>
                <h3 className="text-xl font-heading font-black text-brand-brown mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm font-bold text-brand-brown/70 leading-relaxed">{v.desc}</p>
                {/* subtle bg icon */}
                <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(v.icon, { size: 120 })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INSTAGRAM STRIP ═══════════ */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #fff 0%, #fffbeb 50%, #fff8f0 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-white font-black text-xs uppercase tracking-widest mb-6 shadow-lg"
            style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)" }}
          >
            <Instagram size={16} /> @surprisesutra
          </motion.div>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-3xl md:text-5xl font-heading font-black mb-6"
            style={{ background: "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Follow the magic on Instagram
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="text-base text-brand-brown/70 font-bold mb-10"
          >
            Over 52,900 people follow our daily decoration inspiration. Join the community!
          </motion.p>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://www.instagram.com/surprisesutra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-transform"
              style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)" }}
            >
              <Instagram size={20} /> Follow Us
            </a>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-white text-brand-brown font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-transform border-4 border-white"
            >
              Book Now <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff8f0 0%, #fff 100%)" }}>
        <div
          className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          style={{ background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)" }}
        >
          {/* decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 sm:px-5 py-2 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
              <Gift size={14} className="w-3 h-3 sm:w-4 sm:h-4" /> Let's Celebrate
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black text-white mb-4 sm:mb-6 leading-tight">
              Ready to make your next event unforgettable?
            </h2>
            <p className="text-white/90 font-medium text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              Reach out and let's plan something magical together — from concept to clean-up, we've got you covered.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-white font-black text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl hover:-translate-y-1 transition-transform"
              style={{ color: "#DD2A7B" }}
            >
              Start Planning <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
