import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE } from "../config";
import useWindowSize from "../hooks/useWindowSize";

import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import a1 from "../assets/A (1).JPG";
import a2 from "../assets/A (2).jpg";
import a3 from "../assets/A (3).jpg";
import a4 from "../assets/A (4).jpg";
import a5 from "../assets/A (5).jpg";
import a6 from "../assets/A (6).jpg";
import a7 from "../assets/A (7).jpg";

/* ─── Service Data ─── */
const services = [
  {
    title: "Signature Teddy Tablescapes",
    desc: "Whimsical meets sophisticated. We combine our iconic pampas grass arrangements with playful teddy bears and delicate baby's breath to create a table setting that's heart-warming and picture-perfect.",
    image: b1,
    tags: ["Intimate", "Teddy", "Pampas"],
    price: "Starting from ₹3499"
  },
  {
    title: "Romantic Room Surprises",
    desc: "Transform your space into a dream. Featuring candlelit dining setups, dressed-up teddy mascots, and fresh hydrangea clusters under the glow of elegant chandeliers.",
    image: b2,
    tags: ["Anniversary", "Proposal", "Luxe"],
    price: "Starting from ₹4999"
  },
  {
    title: "Bespoke Baby & Kids Decor",
    desc: "For life's most precious new beginnings. We craft high-fashion floral installations, character-themed cutouts, and custom stationery that make every baby shower and birthday truly one-of-a-kind.",
    image: b3,
    tags: ["Baby Shower", "Birthday", "Thematic"],
    price: "Starting from ₹9999"
  },
  {
    title: "Corporate & Launch Events",
    desc: "Make your brand the center of attention. From disco-themed creator brunches to massive balloon installations and custom-branded arches, we design for impact and engagement.",
    image: b4,
    tags: ["Brand Launch", "Disco", "Corporate"],
    price: "Starting from ₹14999"
  },
  {
    title: "Grand Milestone Outdoors",
    desc: "Celebrate the big ones in style. Our marquee setups feature shimmering gold backdrops, neon signage, and luxurious floor-seating under a canopy of fairy lights and lanterns.",
    image: a1,
    tags: ["50th Birthday", "Outdoor", "Marquee"],
    price: "Starting from ₹19999"
  },
  {
    title: "Dreamy Proposal Decor",
    desc: "Create a moment that lasts forever with our bespoke proposal setups.",
    image: a2,
    tags: ["Proposal", "Romantic"],
    price: "Inquire for Pricing"
  },
  {
    title: "Elegant Wedding Accents",
    desc: "Adding a touch of class to your special day.",
    image: a3,
    tags: ["Wedding", "Luxury"],
    price: "Inquire for Pricing"
  },
  {
    title: "Whimsical Garden Party",
    desc: "Bringing the beauty of nature to your celebration.",
    image: a4,
    tags: ["Garden", "Nature"],
    price: "Inquire for Pricing"
  },
  {
    title: "Luxury Lounge Setup",
    desc: "Comfort meets style for your premium guests.",
    image: a5,
    tags: ["Lounge", "Luxe"],
    price: "Inquire for Pricing"
  },
  {
    title: "Artistic Floral Wall",
    desc: "A stunning backdrop for your most cherished photos.",
    image: a6,
    tags: ["Floral", "Backdrop"],
    price: "Inquire for Pricing"
  },
  {
    title: "Modern Minimalist Decor",
    desc: "Simple, clean, and absolutely stunning.",
    image: a7,
    tags: ["Minimalist", "Modern"],
    price: "Inquire for Pricing"
  }
];

/* ─── Gallery Data Placeholder ─── */

const Services = () => {
  const { isMobile } = useWindowSize();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
    date: "",
    location: "",
    vision: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map 'vision' field to 'message' for the backend
      const submissionData = {
        ...formData,
        message: formData.vision
      };
      // Remove vision to avoid redundancy if the backend doesn't expect it
      delete submissionData.vision;

      await axios.post(`${API_BASE}/api/queries`, submissionData);

      toast.success("Inquiry sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        occasion: "",
        date: "",
        location: "",
        vision: ""
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fffbeb] min-h-screen font-brand text-brand-brown">

      <section className="mt-12 pt-16 pb-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-[10px] font-montserrat font-black uppercase text-[#c73020] tracking-[0.4em] mb-4"> Portfolio </h2>
            <h3 className="text-4xl md:text-6xl font-heading text-brand-brown leading-none tracking-tighter">
              Captured  <span className="text-[#fdd825] italic">Moments</span>
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-brown/50 font-jakarta max-w-sm text-sm"
          >
            A glimpse into the magic we've created. Every setup is a story of precision and passion.
          </motion.p>
        </div>

        <div className="relative h-[400px] md:h-[550px] flex items-center justify-center perspective-1000 overflow-hidden">
          {services.map((service, idx) => {
            // Circular offset logic for infinite loop
            const total = services.length;
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: isMobile ? `${offset * 95}%` : `${offset * 55}%`,
                  rotateY: offset * -20,
                  z: Math.abs(offset) * -150,
                  scale: isCenter ? 1 : 0.8,
                  zIndex: total - Math.abs(offset),
                  opacity: Math.abs(offset) > 3 ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-[220px] md:w-[320px] h-[350px] md:h-[480px] rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer"
                onClick={() => setActiveIndex(idx)}
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}

          {/* Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-30">
            <button
              onClick={() => setActiveIndex(prev => (prev - 1 + services.length) % services.length)}
              className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-[#c73020] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setActiveIndex(prev => (prev + 1) % services.length)}
              className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-[#c73020] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Editorial Hero Section ─── */}
      <section className="relative h-[10vh] min-h-[200px] flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-[#c73020] px-6 w-full max-w-4xl mx-auto pt-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 tracking-tight font-normal text-brand-brown"
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* ─── Query Page / Inquiry Form ─── */}
      <section id="query-form" className=" px-6 bg-[#fffbeb] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Elegant Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-medium text-[#c73020] leading-tight mb-8 tracking-tighter">
                Every celebration is <span className="text-[#fdd825] italic underline decoration-[#c73020]/10">different</span> — <br />
                and honestly, we love it that way ✨
              </h2>
              <div className="text-base md:text-lg text-brand-brown/70 font-jakarta leading-relaxed mb-12 space-y-8">
                <p>From cozy, intimate surprises to full-blown party setups, we design decor that feels personal, thoughtful, and very you. Whether you have everything planned out or just a bunch of saved ideas and "something cute please" in mind, we'll take it from there.</p>
                <p>We're big on details (the kind people actually notice), smooth setups, and making sure you don't have to stress about a thing. You just show up, enjoy, and take all the credit 😌</p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#c73020]/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <Phone size={12} className="text-[#fdd825]" /> Calling Hours
                  </p>
                  <p className="text-[#c73020] font-montserrat font-bold text-sm">12:00 PM - 7:00 PM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <MessageCircle size={12} className="text-[#fdd825]" /> WhatsApp
                  </p>
                  <p className="text-[#c73020] font-montserrat font-bold text-sm">+91 99994 16896</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-[#fdd825]" /> Studio
                  </p>
                  <p className="text-[#c73020] font-montserrat font-bold text-sm">Delhi NCR, India</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Editorial Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-white/50 backdrop-blur-sm p-8 md:p-12 shadow-[0_20px_40px_rgba(199,48,32,0.05)] border border-[#fdd825]/30"
          >
            <div className="mb-10 text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-heading text-[#c73020] leading-snug">
                Fill in your details below and let's start planning something that looks as good as it feels 💛
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-montserrat font-black uppercase text-brand-brown/40 tracking-widest ml-2">Name</label>
                  <input
                    required type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="ENTER YOUR NAME"
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Contact/Whatsapp</label>
                  <input
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91..."
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Email address</label>
                <input
                  required type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="YOU@EXAMPLE.COM"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Occasion</label>
                  <select
                    required name="occasion" value={formData.occasion} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown appearance-none cursor-pointer uppercase"
                  >
                    <option value="" disabled>SELECT OCCASION</option>
                    <option value="Birthday">BIRTHDAY</option>
                    <option value="Anniversary">ANNIVERSARY</option>
                    <option value="Baby Shower">BABY SHOWER</option>
                    <option value="Baby Welcome">BABY WELCOME</option>
                    <option value="Proposal">PROPOSAL</option>
                    <option value="Bachelor/Bachelorette">BACHELOR / BACHELORETTE PARTY</option>
                    <option value="Corporate Event">CORPORATE EVENT</option>
                    <option value="Others">OTHERS</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Date</label>
                  <input
                    required type="date" name="date" value={formData.date} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Location</label>
                <input
                  required type="text" name="location" value={formData.location} onChange={handleChange}
                  placeholder="DELHI / GURGAON / NOIDA..."
                  className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Brief us your vision</label>
                <textarea
                  required name="vision" value={formData.vision} onChange={handleChange} rows="3"
                  placeholder="TELL US A BIT ABOUT YOUR AESTHETIC..."
                  className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown resize-none placeholder:text-brand-brown/30"
                ></textarea>
              </div>

              <button
                disabled={isSubmitting} type="submit"
                className="w-full bg-[#c73020] hover:bg-[#fdd825] text-white hover:text-[#c73020] py-4 mt-4 transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl font-black"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">Request a response <Send size={14} /></span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </section>





    </div>
  );
};

export default Services;