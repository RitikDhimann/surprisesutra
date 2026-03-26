import { useState, useEffect } from "react";
import { Phone, Mail, Sparkles, Send, User, MessageSquare } from "lucide-react";

import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../config";

const QuickQuoteSection = () => {


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Occasion filter removed as requested to simplify queries
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/api/queries`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Magic fumbled. Try again!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden font-brand">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-brand-brown/10 overflow-hidden flex flex-col border border-white/20 max-w-4xl mx-auto"
        >
          {/* Right Form */}
          <div className="p-8 sm:p-12 md:p-16 bg-white flex flex-col justify-center">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-black text-[10px] uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                Send Your Query
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-brand-brown mb-3 tracking-tighter italic">Let's Create Magic</h3>
              <p className="text-gray-500 text-sm font-medium">Have something specific in mind? Tell us and we'll bring it to life.</p>
            </div>

            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Name</label>
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
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
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
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
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

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Requirements / Query</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-gray-400 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision, specific theme, or any questions you have..."
                    rows="5"
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
