import {
  MessageSquare,
  Mail,
  Phone,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "./Contact";

export default function ContactUs() {
  return (
    <div className="bg-[#fffbeb] min-h-screen font-brand text-brand-brown">
      {/* ─── Query Page / Inquiry Form ─── */}
      <section id="query-form" className="py-32 md:py-48 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Elegant Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-[2px] bg-[#c73020]"></span>
                <span className="text-[#c73020] font-black tracking-[0.2em] uppercase text-xs">
                  Get In Touch
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-heading font-medium text-[#c73020] leading-tight mb-8 tracking-tighter">
                Let's <span className="text-[#fdd825] italic underline decoration-[#c73020]/20">Collaborate</span> On Your Next Event.
              </h1>
              <div className="text-sm md:text-base text-brand-brown/70 font-sans leading-relaxed mb-12 space-y-6">
                <p>From cozy, intimate surprises to full-blown party setups, we design decor that feels personal, thoughtful, and very you. Whether you have everything planned out or just a bunch of saved ideas and "something cute please" in mind, we'll take it from there.</p>
                <p>We're big on details (the kind people actually notice), smooth setups, and making sure you don't have to stress about a thing. You just show up, enjoy, and take all the credit 😌</p>
                <p className="font-bold underline decoration-[#c73020]/20 underline-offset-4">Fill in your details here and let's start planning something that looks as good as it feels 💛</p>
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
                    <MessageSquare size={12} className="text-[#fdd825]" /> WhatsApp
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">+91 99994 16896</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <Mail size={12} className="text-[#fdd825]" /> Surprise Sutra
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">surprisesutra@gmail.com</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-[#c73020]/40 tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-[#fdd825]" /> Studio
                  </p>
                  <p className="text-[#c73020] font-bold text-sm">Delhi NCR, India</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-[#c73020]/10">
                <a href="https://instagram.com/surprisesutra" className="p-3 bg-white shadow-sm hover:shadow-md transition-shadow text-[#c73020] rounded-full border border-[#fdd825]/30">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com/surprisesutra" className="p-3 bg-white shadow-sm hover:shadow-md transition-shadow text-[#c73020] rounded-full border border-[#fdd825]/30">
                  <Facebook size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Editorial Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
          
        </div>
      </section>
    </div>
  );
}
