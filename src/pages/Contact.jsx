import { useState, useEffect } from "react";
import { Phone, Mail, Sparkles, Send, Calendar, User, MessageSquare, Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const QuickQuoteSection = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (location.state?.occasion) {
      setFormData((prev) => ({
        ...prev,
        occasion: location.state.occasion,
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Magic is on its way! We'll contact you soon.");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden font-brand">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#DD2A7B]/10 rounded-full blur-[120px] animate-float-delayed" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-brand-brown/5 overflow-hidden flex flex-col lg:flex-row border border-gray-100"
        >
          {/* Left Content - Premium Image & Overlay */}
          <div className="lg:w-5/12 relative flex flex-col justify-center min-h-[400px] lg:min-h-[auto]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000&auto=format&fit=crop')" }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-brand-brown/80 to-[#DD2A7B]/80 mix-blend-multiply" />
            
            {/* Floating Glass Badges */}
            <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3 shadow-2xl hidden sm:flex"
            >
               <div className="bg-brand-primary rounded-full w-8 h-8 flex items-center justify-center">
                 <Sparkles size={16} className="text-white" />
               </div>
               <div className="text-white text-xs font-bold leading-tight">
                 100%<br/>Magical
               </div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col h-full justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-xs uppercase tracking-widest mb-8"
                >
                  <Sparkles size={14} className="text-brand-primary" />
                  <span>Let's Create Magic</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                  Book Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-yellow-400">
                    Dream Event
                  </span>
                </h2>
                <p className="text-base text-gray-200 font-medium mb-12 max-w-sm leading-relaxed">
                  Tell us about your upcoming celebration. From whimsical birthdays to grand romantic anniversaries, we make it unforgettable.
                </p>
              </div>

              {/* Glassmorphic Contact Cards */}
              <div className="space-y-4">
                <a href="tel:+919999416896" className="flex items-center gap-4 group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl transition-all cursor-pointer">
                  <div className="bg-white/10 p-3 rounded-xl group-hover:bg-brand-primary transition-colors">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-0.5">Call for Joy</p>
                    <p className="font-bold text-white text-sm md:text-base">+91 99994 16896</p>
                  </div>
                </a>
                
                <a href="mailto:hello@propz.com" className="flex items-center gap-4 group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl transition-all cursor-pointer">
                  <div className="bg-white/10 p-3 rounded-xl group-hover:bg-[#DD2A7B] transition-colors">
                    <Mail className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-0.5">Email Us</p>
                    <p className="font-bold text-white text-sm md:text-base">hello@propz.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-7/12 p-6 sm:p-10 md:p-12 lg:p-16 bg-white flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-brand-brown mb-2">Event Details</h3>
              <p className="text-gray-500 text-sm">Fill out the form below and our magic builders will get back to you shortly.</p>
            </div>

            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">Your Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alice Wonderland"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@adventure.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Occasion */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">The Occasion</label>
                  <div className="relative group">
                    <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="text-gray-400">Select Event Type...</option>
                      <option value="Birthday Party">Birthday Bash</option>
                      <option value="Baby Shower">Welcome Little One</option>
                      <option value="Anniversary">Love Celebration</option>
                      <option value="Engagement">The Big Yes</option>
                      <option value="Corporate Event">Work Magic</option>
                      <option value="Custom Events">Something Unique</option>
                    </select>
                  </div>
                </div>
                
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">Event Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">Your Vision</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the theme, colors, or any special requests..."
                    rows="3"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-sm font-bold text-brand-brown placeholder:text-gray-400 resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-brand-primary via-[#DD2A7B] to-[#8134AF] text-white py-4 md:py-5 px-6 rounded-2xl font-black text-sm md:text-base border-none shadow-[0_10px_30px_rgba(221,42,123,0.3)] hover:shadow-[0_15px_40px_rgba(221,42,123,0.4)] flex items-center justify-center gap-3 group transition-shadow"
              >
                <span className="tracking-wide">Submit Request</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickQuoteSection;
