import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Heart, Mail, Phone, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assest/new_logo.png";

const BetterFooter = () => {
  return (
    <footer className="font-brand bg-white relative pt-32 md:pt-48 pb-10 md:pb-20 px-6 md:px-10 overflow-hidden">
      {/* Decorative Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fce4f3"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-32">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-4 mb-10 group overflow-hidden">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-16 md:h-20 flex items-center"
              >
                <img src={Logo} alt="Surprise Sutra" className="h-full w-auto object-contain" />
              </motion.div>
         
            </Link>
            
            <p className="text-brand-brown/50 font-bold leading-relaxed mb-12 text-base md:text-lg max-w-md">
              Crafting extraordinary moments and whimsical propz since 2024. Delhi's favorite surprise dealer.
            </p>

            {/* Newsletter */}
            <div className="relative max-w-md group">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-brown/30 mb-6">Join the Magic Mail</h4>
               <div className="relative">
                  <input 
                    type="email" 
                    placeholder="your@magic.com" 
                    className="w-full pl-6 pr-32 py-5 rounded-[2rem] bg-brand-pink/5 border-4 border-white shadow-xl focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-6 bg-brand-brown text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-brand-primary transition-colors flex items-center gap-2">
                     <Send size={14} /> <span>Join</span>
                  </button>
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-12 lg:gap-16">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-brown/30 mb-8">Exploration</h4>
              <ul className="space-y-4">
                {["Magical Kits", "Propz World", "Best Sellers", "New Magic"].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-brand-brown font-black hover:text-brand-primary transition-all text-sm uppercase tracking-widest flex items-center gap-3">
                      <Sparkles size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-brand-primary" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-brown/30 mb-8">Support</h4>
              <ul className="space-y-4">
                {[
                    { name: "Privacy Lore", path: "/privacy-policy" },
                    { name: "Terms of Play", path: "/terms-and-conditions" },
                    { name: "Refund Spells", path: "/refund-policy" },
                    { name: "Magic Delivery", path: "/shipping-policy" }
                  ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-brand-brown font-black hover:text-brand-primary transition-all text-sm uppercase tracking-widest flex items-center gap-3">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Master Contact Card */}
          <div className="lg:col-span-4 self-start">
             <motion.div 
               whileHover={{ y: -10 }}
               className="bg-white p-10 rounded-[3rem] border-[6px] border-[#FFF1F2] shadow-2xl relative overflow-hidden group"
             >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-pink/10 blob-mask blur-xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pastel-yellow/20 blob-mask-alt blur-xl group-hover:scale-150 transition-transform duration-700" />
                
                <h4 className="text-2xl font-heading font-black text-brand-brown tracking-tighter mb-8 leading-tight relative z-10">
                   Send a <br/> <span className="text-brand-primary">Magical Message?</span>
                </h4>
                
                <div className="space-y-8 relative z-10">
                   <a href="mailto:hello@magic.com" className="flex items-center gap-5 group/link">
                      <div className="w-12 h-12 bg-brand-pink/10 rounded-2xl flex flex-shrink-0 items-center justify-center text-brand-primary group-hover/link:bg-brand-primary group-hover/link:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <span className="font-black text-brand-brown uppercase tracking-widest text-sm break-all">Hello@SurpriseSutra.com</span>
                   </a>
                   
                   <a href="tel:+9112345678" className="flex items-center gap-5 group/link">
                      <div className="w-12 h-12 bg-pastel-yellow rounded-2xl flex flex-shrink-0 items-center justify-center text-brand-brown group-hover/link:bg-brand-brown group-hover/link:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <span className="font-black text-brand-brown uppercase tracking-widest text-sm">+91-PARTY-PROPZ</span>
                   </a>
                </div>

                {/* Social Bar */}
                <div className="mt-12 pt-8 border-t border-brand-pink/20 flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      href="#"
                      className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
             </motion.div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-brand-pink/20 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
              <p className="text-[10px] font-black text-brand-brown/30 uppercase tracking-[0.2em]">© 2024 SurpriseSutra — BUILT WITH MAGIC & DREAMS</p>
           </div>
           
           <div className="flex gap-8">
              <Link to="/faqs" className="text-[10px] font-black text-brand-brown/30 uppercase tracking-[0.2em] hover:text-brand-primary transition-colors">MAGIC FAQs</Link>
              <div className="flex items-center gap-2 text-brand-primary">
                 <Heart size={14} className="fill-brand-primary animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">PROPZ FOR LIFE</span>
              </div>
           </div>
        </div>
      </div>
      
      {/* Background Magical Dust */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 blur-[150px] animate-float" style={{background: "rgba(221,42,123,0.07)"}} />
         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blur-[120px] animate-float-delayed" style={{background: "rgba(129,52,175,0.07)"}} />
      </div>
    </footer>
  );
};

export default BetterFooter;
