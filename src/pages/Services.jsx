// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Send, Phone, MessageCircle, MapPin, ArrowRight
// } from "lucide-react";
// import { toast } from "react-toastify";

// import b1 from "../assets/b1.jpg";
// import b2 from "../assets/b2.jpg";
// import b3 from "../assets/b3.jpg";
// import b4 from "../assets/b4.jpg";
// import a0 from "../assets/A (0).jpg";
// import a1 from "../assets/A (1).JPG";
// import a2 from "../assets/A (2).jpg";
// import a3 from "../assets/A (3).jpg";
// import a4 from "../assets/A (4).jpg";
// import a5 from "../assets/A (5).jpg";
// import a6 from "../assets/A (6).jpg";
// import a7 from "../assets/A (7).jpg";

// /* ─── Service Data ─── */
// const services = [
//   {
//     title: "Signature Teddy Tablescapes",
//     desc: "Whimsical meets sophisticated. We combine our iconic pampas grass arrangements with playful teddy bears and delicate baby's breath to create a table setting that's heart-warming and picture-perfect.",
//     image: b1,
//     tags: ["Intimate", "Teddy", "Pampas"],
//     price: "Starting from ₹3499"
//   },
//   {
//     title: "Romantic Room Surprises",
//     desc: "Transform your space into a dream. Featuring candlelit dining setups, dressed-up teddy mascots, and fresh hydrangea clusters under the glow of elegant chandeliers.",
//     image: b2,
//     tags: ["Anniversary", "Proposal", "Luxe"],
//     price: "Starting from ₹4999"
//   },
//   {
//     title: "Bespoke Baby & Kids Decor",
//     desc: "For life's most precious new beginnings. We craft high-fashion floral installations, character-themed cutouts, and custom stationery that make every baby shower and birthday truly one-of-a-kind.",
//     image: b3,
//     tags: ["Baby Shower", "Birthday", "Thematic"],
//     price: "Starting from ₹9999"
//   },
//   {
//     title: "Corporate & Launch Events",
//     desc: "Make your brand the center of attention. From disco-themed creator brunches to massive balloon installations and custom-branded arches, we design for impact and engagement.",
//     image: b4,
//     tags: ["Brand Launch", "Disco", "Corporate"],
//     price: "Starting from ₹14999"
//   },
//   {
//     title: "Grand Milestone Outdoors",
//     desc: "Celebrate the big ones in style. Our marquee setups feature shimmering gold backdrops, neon signage, and luxurious floor-seating under a canopy of fairy lights and lanterns.",
//     image: a1,
//     tags: ["50th Birthday", "Outdoor", "Marquee"],
//     price: "Starting from ₹19999"
//   }
// ];

// /* ─── Gallery Data Placeholder ─── */
// const galleryImages = [
//   a2, a3, a4, a5, a6, a7
// ];

// const Services = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     occasion: "",
//     date: "",
//     location: "",
//     vision: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeService, setActiveService] = useState(0);

//   // Auto-play for the slideshow
//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveService((index) => (index + 1) % services.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       toast.success("Inquiry sent successfully! We'll get back to you soon.");
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         occasion: "",
//         date: "",
//         location: "",
//         vision: ""
//       });
//       setIsSubmitting(false);
//     }, 2000);
//   };

//   return (
//     <div className="bg-[#fffbeb] min-h-screen font-brand text-brand-brown">

//       {/* ─── Editorial Hero Section ─── */}
//       <section className="relative h-[40vh] min-h-[200px] flex items-center justify-center overflow-hidden">
//         {/* Removed Image and Dark Gradient per request */}


//         <div className="relative z-20 text-center text-[#c73020] px-6 w-full max-w-4xl mx-auto pt-10">

//           <motion.h1
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
//             className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 tracking-tight font-normal text-brand-brown"
//           >
//             Our Services
//           </motion.h1>
//         </div>

//       </section>



//       {/* ─── Query Page / Inquiry Form ─── */}
//       <section id="query-form" className=" px-6 bg-[#fffbeb] relative overflow-hidden">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

//           {/* Left Side: Elegant Text */}
//           <div className="order-2 lg:order-1">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl md:text-5xl font-heading font-medium text-[#c73020] leading-tight mb-8 tracking-tighter">
//                 Every celebration is <span className="text-[#fdd825] italic underline decoration-[#c73020]/10">different</span> — <br />
//                 and honestly, we love it that way ✨
//               </h2>
//               <div className="text-base md:text-lg text-brand-brown/70 font-jakarta leading-relaxed mb-12 space-y-8">
//                 <p>From cozy, intimate surprises to full-blown party setups, we design decor that feels personal, thoughtful, and very you. Whether you have everything planned out or just a bunch of saved ideas and "something cute please" in mind, we'll take it from there.</p>
//                 <p>We're big on details (the kind people actually notice), smooth setups, and making sure you don't have to stress about a thing. You just show up, enjoy, and take all the credit 😌</p>
//               </div>

//               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#c73020]/10">
//                 <div className="space-y-1">
//                   <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
//                     <Phone size={12} className="text-[#fdd825]" /> Calling Hours
//                   </p>
//                   <p className="text-[#c73020] font-montserrat font-bold text-sm">12:00 PM - 7:00 PM</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
//                     <MessageCircle size={12} className="text-[#fdd825]" /> WhatsApp
//                   </p>
//                   <p className="text-[#c73020] font-montserrat font-bold text-sm">+91 99994 16896</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-[10px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
//                     <MapPin size={12} className="text-[#fdd825]" /> Studio
//                   </p>
//                   <p className="text-[#c73020] font-montserrat font-bold text-sm">Delhi NCR, India</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Side: Editorial Form */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="order-1 lg:order-2 bg-white/50 backdrop-blur-sm p-8 md:p-12 shadow-[0_20px_40px_rgba(199,48,32,0.05)] border border-[#fdd825]/30"
//           >
//             <div className="mb-10 text-center space-y-4">
//               <h3 className="text-xl md:text-2xl font-heading text-[#c73020] leading-snug">
//                 Fill in your details below and let’s start planning something that looks as good as it feels 💛
//               </h3>

//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-[11px] font-montserrat font-black uppercase text-brand-brown/40 tracking-widest ml-2">Name</label>
//                   <input
//                     required type="text" name="name" value={formData.name} onChange={handleChange}
//                     placeholder="ENTER YOUR NAME"
//                     className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Contact/Whatsapp</label>
//                   <input
//                     required type="tel" name="phone" value={formData.phone} onChange={handleChange}
//                     placeholder="+91..."
//                     className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Email address</label>
//                 <input
//                   required type="email" name="email" value={formData.email} onChange={handleChange}
//                   placeholder="YOU@EXAMPLE.COM"
//                   className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Occasion</label>
//                   <select
//                     required name="occasion" value={formData.occasion} onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown appearance-none cursor-pointer uppercase"
//                   >
//                     <option value="" disabled>SELECT OCCASION</option>
//                     <option value="Birthday">BIRTHDAY</option>
//                     <option value="Anniversary">ANNIVERSARY</option>
//                     <option value="Baby Shower">BABY SHOWER</option>
//                     <option value="Baby Welcome">BABY WELCOME</option>
//                     <option value="Proposal">PROPOSAL / DATING</option>
//                     <option value="Bachelor/Bachelorette">BACHELOR / BACHELORETTE PARTY</option>
//                     <option value="Corporate Event">CORPORATE EVENT</option>
//                     <option value="Wedding / Engagement">WEDDING / ENGAGEMENT</option>
//                     <option value="Luxe Hamper">LUXE HAMPER / GIFTING</option>
//                     <option value="Others">OTHERS</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Date</label>
//                   <input
//                     required type="date" name="date" value={formData.date} onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown uppercase"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Location</label>
//                 <input
//                   required type="text" name="location" value={formData.location} onChange={handleChange}
//                   placeholder="DELHI / GURGAON / NOIDA..."
//                   className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown placeholder:text-brand-brown/30"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[11px] font-montserrat font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Brief us your vision</label>
//                 <textarea
//                   required name="vision" value={formData.vision} onChange={handleChange} rows="3"
//                   placeholder="TELL US A BIT ABOUT YOUR AESTHETIC..."
//                   className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-montserrat font-bold text-xs text-brand-brown resize-none placeholder:text-brand-brown/30"
//                 ></textarea>
//               </div>

//               <button
//                 disabled={isSubmitting} type="submit"
//                 className="w-full bg-[#c73020] hover:bg-[#fdd825] text-white hover:text-[#c73020] py-4 mt-4 transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl font-black"
//               >
//                 {isSubmitting ? (
//                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
//                 ) : (
//                   <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">Request a response <Send size={14} /></span>
//                 )}
//               </button>
//             </form>
//           </motion.div>

//         </div>
//       </section>



//       {/* ─── Cinematic Slideshow ─── */}


//       {/* ─── Photography Gallery / Magazine Collage ─── */}
//       <section className="py-24 px-4 md:px-8 bg-[#fdd825]/10 border-t border-[#c73020]/10 overflow-hidden">
//         <div className="w-full">
//           <div className="text-center mb-20 max-w-2xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-heading text-brand-brown mb-6 font-normal tracking-tight italic">
//               Moments Captured
//             </h2>
//             <div className="h-1 w-20 bg-[#fdd825] mx-auto mb-8" />
//             <p className="text-brand-brown/70 text-lg font-jakarta">
//               A glimpse into the magic we've created. When you look closely, you’ll see the thought, passion, and precision poured into every setup.
//             </p>
//           </div>

//           {/* Magazine Style Collage Grid - MATCHING REFERENCE IMAGE PATTERN */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[350px]">
            
//             {/* Slot 1: Col 1, Rows 1-2 (Tall) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//               className="col-span-1 row-span-2 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a2} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 2: Col 2, Row 1 (Square) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
//               className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a3} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 3: Col 3, Row 1 (Square) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
//               className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a4} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 4: Col 4, Rows 1-2 (Tall) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
//               className="col-span-1 row-span-2 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a5} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 5: Col 2, Row 2 (Mid-Left Square) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
//               className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a6} alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 6: BRAND TEXT CARD (Col 3, Row 2) */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
//               className="col-span-1 row-span-1 bg-white flex flex-col items-center justify-center p-8 text-center shadow-sm rounded-xl border border-[#fdd825]/10"
//             >
//               <span className="font-heading italic text-[#c73020] text-xl mb-1 lowercase leading-none">the</span>
//               <h4 className="font-heading font-normal text-3xl md:text-5xl text-brand-brown tracking-tighter uppercase mb-0 leading-none">
//                 Surprise
//               </h4>
//               <h4 className="font-heading font-normal text-3xl md:text-5xl text-brand-brown tracking-tighter uppercase mb-4 leading-none">
//                 Sutra
//               </h4>
//               <p className="font-heading text-lg text-brand-brown/60 mb-2">Editorial Moments</p>
//               <p className="font-montserrat font-bold text-[9px] tracking-[0.4em] text-[#c73020] uppercase">
//                 EST. 2024 • NCR
//               </p>
//             </motion.div>

//             {/* Slot 7: Col 1, Row 3 (Bottom Left) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
//               className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a7} alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 8: Col 2-3, Row 3 (Wide Horizontal) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
//               className="col-span-2 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={a1} alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//             {/* Slot 9: Col 4, Row 3 (Bottom Right) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
//               className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group"
//             >
//               <img src={b1} alt="Gallery 8" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//             </motion.div>

//           </div>

//           <div className="text-center mt-20">
//             <button className="px-10 py-5 bg-white border border-brand-brown/10 text-brand-brown font-montserrat font-bold text-xs uppercase tracking-[0.3em] hover:bg-[#c73020] hover:text-white transition-all duration-500 rounded-full shadow-sm hover:shadow-2xl">
//               Explore More on Instagram
//             </button>
//           </div>
//         </div>
//       </section>



//     </div>
//   );
// };

// export default Services;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, Phone, MessageCircle, MapPin
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

      {/* ─── Editorial Hero Section ─── */}
      <section className="relative h-[40vh] min-h-[200px] flex items-center justify-center overflow-hidden">
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

      {/* ─── Photography Gallery / Magazine Collage ─── */}
      <section className="py-24 px-4 md:px-8 bg-[#fdd825]/10 border-t border-[#c73020]/10 overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-heading text-brand-brown mb-6 font-normal tracking-tight italic">
              Moments Captured
            </h2>
            <div className="h-1 w-20 bg-[#fdd825] mx-auto mb-8" />
            <p className="text-brand-brown/70 text-lg font-jakarta">
              A glimpse into the magic we've created. When you look closely, you'll see the thought, passion, and precision poured into every setup.
            </p>
          </div>

          {/*
            ─── GRID LAYOUT (matches reference image) ───────────────────────────
            5 columns. Rows use fixed heights.

            Row 1-2 (tall):  Col 1 tall | Col 2 sq | Col 3 sq | Col 4 sq | Col 5 tall
            Row 2:           (cont.)    | Col 2 sq | TEXT CARD | Col 4 sq | (cont.)
            Row 3:           Col 1 sq   | Col 2–3 wide          | Col 4 sq | Col 5 sq
          */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "1fr 1.4fr 1.4fr 1.4fr 1fr",
              gridTemplateRows: isMobile ? "repeat(auto-fill, 240px)" : "320px 320px 320px",
              gap: isMobile ? "10px" : "6px",
            }}
          >

            {/* ── Col 1, Rows 1–2: Tall left ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ gridColumn: isMobile ? "1" : "1", gridRow: isMobile ? "1" : "1 / 3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a2} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 2, Row 1: Square top-left-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ gridColumn: isMobile ? "2" : "2", gridRow: isMobile ? "1" : "1" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a3} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 3, Row 1: Square top-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ gridColumn: isMobile ? "1" : "3", gridRow: isMobile ? "2" : "1" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a4} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 4, Row 1: Square top-right-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ gridColumn: isMobile ? "2" : "4", gridRow: isMobile ? "2" : "1" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a5} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 5, Rows 1–2: Tall right ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
              style={{ gridColumn: isMobile ? "1" : "5", gridRow: isMobile ? "3" : "1 / 3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a6} alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 2, Row 2: Square mid-left-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              style={{ gridColumn: isMobile ? "2" : "2", gridRow: isMobile ? "3" : "2" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a7} alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 3, Row 2: Brand Text Card (center) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              style={{ gridColumn: isMobile ? "1 / 3" : "3", gridRow: isMobile ? "4" : "2" }}
              className="bg-white flex flex-col items-center justify-center p-6 text-center shadow-sm rounded-xl border border-[#fdd825]/10"
            >
              <span className="font-heading italic text-[#c73020] text-lg mb-1 lowercase leading-none">the</span>
              <h4 className="font-heading font-normal text-3xl md:text-4xl text-brand-brown tracking-tighter uppercase leading-none">
                Surprise
              </h4>
              <h4 className="font-heading font-normal text-3xl md:text-4xl text-brand-brown tracking-tighter uppercase mb-3 leading-none">
                Sutra
              </h4>
              <p className="font-heading text-base text-brand-brown/60 mb-2">Editorial Moments</p>
              <p className="font-montserrat font-bold text-[9px] tracking-[0.4em] text-[#c73020] uppercase">
                EST. 2024 • NCR
              </p>
            </motion.div>

            {/* ── Col 4, Row 2: Square mid-right-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
              style={{ gridColumn: isMobile ? "1" : "4", gridRow: isMobile ? "5" : "2" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={b2} alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 1, Row 3: Square bottom-left ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              style={{ gridColumn: isMobile ? "2" : "1", gridRow: isMobile ? "5" : "3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={b3} alt="Gallery 8" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 2–3, Row 3: Wide horizontal center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}
              style={{ gridColumn: isMobile ? "1 / 3" : "2 / 4", gridRow: isMobile ? "6" : "3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={a1} alt="Gallery 9" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 4, Row 3: Square bottom-right-center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              style={{ gridColumn: isMobile ? "1" : "4", gridRow: isMobile ? "7" : "3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={b4} alt="Gallery 10" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

            {/* ── Col 5, Row 3: Square bottom-right ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55 }}
              style={{ gridColumn: isMobile ? "2" : "5", gridRow: isMobile ? "7" : "3" }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={b1} alt="Gallery 11" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>

          </div>
          {/* ─────────────────────────────────────────────────────────────────── */}

          <div className="text-center mt-20">
            <button className="px-10 py-5 bg-white border border-brand-brown/10 text-brand-brown font-montserrat font-bold text-xs uppercase tracking-[0.3em] hover:bg-[#c73020] hover:text-white transition-all duration-500 rounded-full shadow-sm hover:shadow-2xl">
              Explore More on Instagram
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;