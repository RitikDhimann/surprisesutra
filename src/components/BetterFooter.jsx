import React from "react";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/new_logo.png";

const BetterFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Brand section */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={Logo} alt="Surprise Sutra" className="h-20 md:h-24 w-auto object-contain" />
            </Link>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F58529] mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li><Link to="/diy-kits" className="hover:text-[#F58529] transition-colors">DIY Kits</Link></li>
              <li><Link to="/services" className="hover:text-[#F58529] transition-colors">Services</Link></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#F58529] transition-colors bg-transparent border-none p-0 text-sm font-medium text-gray-600">About Us</button></li>
              <li><Link to="/contact" className="hover:text-[#F58529] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F58529] mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li><Link to="/privacy-policy" className="hover:text-[#F58529] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#F58529] transition-colors">Terms of Play</Link></li>
              <li><Link to="/faqs" className="hover:text-[#F58529] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-1">
             <h4 className="text-xs font-black uppercase tracking-widest text-[#F58529] mb-6">Connect</h4>
             <div className="space-y-4 mb-6">
               <a href="mailto:surprisesutra@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#F58529]">
                 <Mail size={16} />
                 <span>surprisesutra@gmail.com</span>
               </a>
               <a href="tel:+919999416896" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#F58529]">
                 <Phone size={16} />
                 <span>+91 99994 16896</span>
               </a>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                 <span>12 PM - 7 PM</span>
               </div>
             </div>
             <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#!" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:bg-[#F58529] hover:text-white transition-all">
                    <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex justify-center items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <p>© {currentYear} Surprise Sutra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default BetterFooter;
