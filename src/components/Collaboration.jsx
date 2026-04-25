import React from "react";
import { motion } from "framer-motion";
import { Heart, Quote, Camera, Users, Cake } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import aboutimg from "../assets/about.jpg.jpeg";

const AboutUsSection = () => {
  useWindowSize();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-10 md:py-26 md:mt-10">
      {/* Decorative Elements */}


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Visual Side - Founders Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Artistic Frame */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#c73020]/5 rounded-[2rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
              <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl rotate-2 transition-transform group-hover:rotate-0 duration-500 border border-[#c73020]/10">
                <img
                  src={aboutimg}
                  alt="Shagun & Harshit"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-[1.5rem] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 bg-gray-50"
                />

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-[#fdd825] text-[#c73020] p-4 rounded-full shadow-lg border-2 border-white z-20"
                >
                  <Heart size={24} fill="#c73020" />
                </motion.div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              {[
                { icon: Users, text: "2500+ celebrations", color: "bg-blue-50" },
                { icon: Camera, text: "Humans of Bombay", color: "bg-pink-50" },
                { icon: Cake, text: "Dreamy Setups", color: "bg-orange-50" },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl ${item.color} border border-transparent hover:border-black/5 transition-all shadow-sm`}>
                  <item.icon size={18} className="text-[#c73020] shrink-0" />
                  <span className="text-[8px] sm:text-[10px] font-jakarta font-bold uppercase tracking-widest text-[#c73020] leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text Side - Storytelling */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center text-[#fdd825] mb-8 pb-1 border-b-2 border-[#fdd825]/30 group cursor-default"
            >
              <span className="font-montserrat font-bold text-[16px] sm:text-[19px] uppercase tracking-[0.4em]">A LITTLE ABOUT US</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-heading font-medium text-[#c73020] leading-[1.1] mb-8 tracking-tight"
            >
              We’re Shagun & Harshit — <br />
              <span className="text-brand-brown italic">partners in business, life,</span> <br />
              and everything in between 💛
            </motion.h2>

            <div className="space-y-6 text-brand-brown/80 font-libre text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                What began as a random idea 7 years ago has now been a part of over 2500 celebrations (and counting). Along the way, we’ve had our little viral moments, been featured on <span className="font-bold text-[#c73020]">Humans of Bombay</span>, and most importantly — been trusted with some really special days.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We even got married last year, somewhere between all the setups and celebrations — so this journey is as personal to us as it gets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-[#c73020]/10"
              >
                <div className="flex items-start gap-4">
                  <Quote size={32} className="text-[#fdd825] shrink-0" />
                  <p className="italic text-2xl text-[#c73020] font-heading leading-tight">
                    For us, it’s never just decor — it’s the moment, the reaction, and everything after
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;