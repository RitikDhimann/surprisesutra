import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const embedUrls = [
  "https://www.instagram.com/p/DPbpdJ0kuE0/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/p/CqDfpoWPcQr/?igsh=MTV1MmR1M2c2ejVveg==",
  "https://www.instagram.com/reel/DT5amgnEr2I/?igsh=MWV2dzA0NTM5Z3V1aA=="
];

const getInstagramEmbedHtml = (url) => `
<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
`;

const InstagramSection = () => {

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before it comes into view
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="instagram-feed" className="pt-0 pb-5 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <h2 className="text-4xl md:text-7xl font-heading font-medium mb-2 px-2 tracking-tight">
              <span className="text-[#c73020]">Insta</span> <span className="text-[#fdd825] italic">Moments</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-xl px-2 font-jakarta opacity-80">
              Get daily decoration inspiration and latest updates from our studio.
            </p>
          </motion.div>
        </div>

        {/* Grid / Slider Section */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-start snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {embedUrls.map((url, index) => (
            <motion.div
              key={`embed-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="w-[85vw] min-w-[340px] sm:w-[400px] md:w-full md:min-w-0 shrink-0 snap-center flex justify-center rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 min-h-[400px]"
            >
              <div dangerouslySetInnerHTML={{ __html: getInstagramEmbedHtml(url) }} className="w-full flex justify-center p-2 lg:p-4 max-w-full" />
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/surprisesutra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action inline-flex items-center justify-center gap-3 bg-transparent text-[#c73020] border-2 border-[#c73020] font-montserrat tracking-widest text-xs py-5 px-10 transition-all duration-300 hover:bg-[#c73020] hover:text-white hover:border-transparent"
          >
            <Instagram size={20} />
            <span>Follow Us on Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
