import { useEffect } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const embedUrls = [
  "https://www.instagram.com/p/DPbpdJ0kuE0/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/p/CqDfpoWPcQr/?igsh=MTV1MmR1M2c2ejVveg==",
  "https://www.instagram.com/reel/DT5amgnEr2I/?igsh=MWV2dzA0NTM5Z3V1aA=="
];

const getInstagramEmbedHtml = (url) => `
<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
`;

const InstagramSection = () => {

  useEffect(() => { 
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
  }, []);

  return (
    <section id="instagram-feed" className="py-20 relative overflow-hidden" style={{background: "linear-gradient(135deg, #fff0f8 0%, #f5eeff 50%, #fff3e0 100%)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-full mb-4" style={{background: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)"}}>
              <Instagram size={20} />
              <span className="font-semibold text-sm">@surprisesutra</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 px-2" style={{background: "background: linear-gradient(90deg, #F58529, #DD2A7B, #8134AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>
              Follow the Magic ✨
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg px-2">
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
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-[#fd5949] to-[#d6249f] hover:from-[#d6249f] hover:to-[#285AEB] text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Instagram size={24} />
            <span>Follow Us on Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
