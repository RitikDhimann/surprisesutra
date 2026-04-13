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
    occasion: "",
    date: "",
    location: "",
    vision: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE}/api/queries`, formData);
      if (response.data.success) {
        toast.success(response.data.message || "Inquiry sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          occasion: "",
          date: "",
          location: "",
          vision: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Magic fumbled. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/50 backdrop-blur-sm p-8 md:p-12 shadow-[0_20px_40px_rgba(199,48,32,0.05)] border border-[#fdd825]/30 rounded-3xl"
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
              className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Contact/Whatsapp</label>
            <input 
              required type="tel" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="+91..."
              className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Email address</label>
          <input 
            required type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown rounded-xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Occasion</label>
            <select 
              required name="occasion" value={formData.occasion} onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown appearance-none cursor-pointer rounded-xl"
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
              className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Location</label>
          <input 
            required type="text" name="location" value={formData.location} onChange={handleChange}
            placeholder="Delhi / Gurgaon / Noida..."
            className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-[#c73020]/40 tracking-widest ml-2">Brief us your vision</label>
          <textarea 
            required name="vision" value={formData.vision} onChange={handleChange} rows="3"
            placeholder="Tell us a bit about your aesthetic..."
            className="w-full px-4 py-3 bg-white border border-[#fdd825]/50 focus:border-[#c73020] outline-none transition-all font-sans text-sm text-brand-brown resize-none rounded-xl"
          ></textarea>
        </div>

        <button 
          disabled={isSubmitting} type="submit"
          className="w-full bg-[#c73020] hover:bg-[#fdd825] text-white hover:text-[#c73020] py-4 mt-4 transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl font-black rounded-xl"
        >
          {isSubmitting ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">Request a response <Send size={14} /></span>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default QuickQuoteSection;
