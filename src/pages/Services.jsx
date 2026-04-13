import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, Phone, MessageCircle, MapPin, ArrowRight
} from "lucide-react";
import { toast } from "react-toastify";

import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import a0 from "../assets/A (0).jpg";
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
  }
];

/* ─── Gallery Data Placeholder ─── */
const galleryImages = [
  a2, a3, a4, a5, a6, a7
];

const Services = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="bg-[#fffbeb] min-h-screen font-brand text-brand-brown">
      
      {/* ─── Editorial Hero Section ─── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#c73020]/40 z-10" />
        <img 
          src={a0} 
          alt="Elegant event setup" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        />
        <div className="relative z-20 text-center text-white px-6 w-full max-w-4xl mx-auto pt-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tracking-[0.4em] text-[10px] md:text-xs uppercase font-black mb-6 drop-shadow-md"
          >
            The Surprise Sutra Signature
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-heading mb-6 tracking-tight drop-shadow-xl font-normal"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl font-sans italic opacity-90 font-light drop-shadow-md"
          >
            Curating beautiful atmospheres for life's most precious celebrations.
          </motion.p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center opacity-70 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold mb-2">Explore</span>
          <ArrowRight className="rotate-90" size={16} />
        </div>
      </section>

      {/* ─── Curated Experiences (Staggered Layout) ─── */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-brand-brown mb-6 font-normal">Curated Experiences</h2>
          <p className="text-brand-brown/60 text-lg md:text-xl font-sans leading-relaxed">
            We believe that true luxury lies in the details. Discover our range of bespoke decoration services, meticulously designed to transform your milestones into magical memories.
          </p>
        </div>
        
        <div className="space-y-32">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                key={idx} 
                className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Image Side */}
                <div className="w-full md:w-[55%] relative group">
                  <div className="overflow-hidden aspect-[4/3] bg-white shadow-xl rounded-2xl">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    />
                  </div>
                  {/* Subtle decorative block */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 sm:w-12 h-1/2 ${isEven ? 'bg-[#fdd825]/20' : 'bg-[#c73020]/10'} -z-10 ${isEven ? '-left-2 sm:-left-6' : '-right-2 sm:-right-6'}`} />
                </div>
                
                {/* Text Side */}
                <div className="w-full md:w-[45%] flex flex-col justify-center py-6">
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-3 py-1 bg-gray-50 border border-gray-100 uppercase tracking-widest font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading text-[#c73020] mb-6">{service.title}</h3>
                  <p className="text-brand-brown/70 text-base md:text-lg mb-8 leading-relaxed font-sans">{service.desc}</p>
                  <span className="text-[#fdd825] font-black uppercase text-xs tracking-widest bg-[#c73020] px-4 py-1.5 rounded-full w-max mb-10 block">{service.price}</span>
                  <button 
                    onClick={() => {
                        setFormData({...formData, occasion: service.title});
                        document.getElementById("query-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 w-max group text-[#c73020] hover:text-[#fdd825] transition-colors"
                  >
                    <span className="font-bold text-xs uppercase tracking-widest">Inquire Now</span>
                    <div className="w-8 h-[1px] bg-[#c73020] group-hover:bg-[#fdd825] group-hover:w-12 transition-all duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Photography Gallery / Masonry Layout ─── */}
      <section className="py-24 px-6 bg-[#fdd825]/10 border-t border-[#c73020]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading text-brand-brown mb-4 font-normal">Moments Captured</h2>
            <p className="text-brand-brown/60 text-lg font-sans">
              A glimpse into the magic we've created. When you look closely, you’ll see the thought, passion, and precision poured into every setup.
            </p>
          </div>
          
          {/* Dynamic Masonry Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
                <img 
                  src={img} 
                  alt={`Gallery showcase ${i}`}
                  loading="lazy" 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" 
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="text-xs font-bold uppercase tracking-widest text-[#c73020] hover:text-[#fdd825] underline decoration-[#fdd825] underline-offset-8 transition-colors">
              View Instagram for More
            </button>
          </div>
        </div>
      </section>

      {/* ─── Query Page / Inquiry Form ─── */}
      <section id="query-form" className="py-24 px-6 bg-[#fffbeb] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Elegant Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-medium text-[#c73020] leading-tight mb-8 tracking-tighter">
                Every celebration is <span className="text-[#fdd825] italic underline decoration-[#c73020]/20">different</span> — and honestly, we love it that way ✨
              </h2>
              <div className="text-sm md:text-base text-brand-brown/70 font-sans leading-relaxed mb-12 space-y-6">
                <p>From cozy, intimate surprises to full-blown party setups, we design decor that feels personal, thoughtful, and very you. Whether you have everything planned out or just a bunch of saved ideas and "something cute please" in mind, we'll take it from there.</p>
                <p>We're big on details (the kind people actually notice), smooth setups, and making sure you don't have to stress about a thing. You just show up, enjoy, and take all the credit 😌</p>
                <p className="font-bold underline decoration-brand-primary/20 underline-offset-4">Fill in your details here and let's start planning something that looks as good as it feels 💛</p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#c73020]/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <Phone size={12} className="text-[#fdd825]" /> Calling Hours
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">12:00 PM - 7:00 PM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <MessageCircle size={12} className="text-[#fdd825]" /> WhatsApp
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">+91 99994 16896</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-[#fdd825]" /> Studio
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">Delhi NCR, India</p>
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
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-heading text-[#c73020] mb-2">Start the Conversation</h3>
              <p className="text-xs uppercase tracking-widest text-[#c73020]/40 font-bold">No obligations, just inspiration.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-brand-brown/40 tracking-widest ml-2">Name</label>
                  <input 
                    required type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Contact/Whatsapp</label>
                  <input 
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91..."
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Email address</label>
                <input 
                  required type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-all font-sans text-sm text-brand-brown"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Occasion</label>
                  <select 
                    required name="occasion" value={formData.occasion} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Baby Welcome">Baby Welcome</option>
                    <option value="Proposal">Proposal / Dating</option>
                    <option value="Bachelor/Bachelorette">Bachelor / Bachelorette Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Wedding / Engagement">Wedding / Engagement</option>
                    <option value="Luxe Hamper">Luxe Hamper / Gifting</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Date</label>
                  <input 
                    required type="date" name="date" value={formData.date} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Location</label>
                <input 
                  required type="text" name="location" value={formData.location} onChange={handleChange}
                  placeholder="Delhi / Gurgaon / Noida..."
                  className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Brief us your vision</label>
                <textarea 
                  required name="vision" value={formData.vision} onChange={handleChange} rows="3"
                  placeholder="Tell us a bit about your aesthetic..."
                  className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown resize-none"
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