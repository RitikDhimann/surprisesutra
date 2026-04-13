import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle, Sparkles, PhoneCall } from "lucide-react";

const faqsData = [
  {
    question: "What is Surprise Sutra?",
    answer:
      "Surprise Sutra is a creative event styling and decoration brand specializing in birthdays, anniversaries, weddings, and corporate events. We craft experiences that make every celebration truly magical."
  },
  {
    question: "How can I book a decoration service?",
    answer:
      "You can book directly through our website contact form or by calling us at +91 99994 16896. Our team will confirm your requirements and share design ideas before finalizing the booking."
  },
  {
    question: "Do you provide custom themes?",
    answer:
      "Absolutely! We specialize in personalized themes tailored to your preferences, venue size, and budget. From romantic setups to kids’ parties — we’ve got you covered."
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 7–10 days before your event. However, for larger events or weddings, a 3–4 week lead time helps ensure every detail is perfect."
  },
  {
    question: "What are your payment options?",
    answer:
      "We accept UPI, bank transfers, and major credit/debit cards. A small advance confirms your booking, and the remaining payment is due before event day."
  },
  {
    question: "What areas do you serve?",
    answer:
      "Currently, we provide decoration services in Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad."
  },
  {
    question: "What if I need to cancel my booking?",
    answer:
      "Cancellations can be made up to 72 hours before your event. Please check our Refund & Cancellation Policy page for detailed terms."
  }
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-brand pt-32 pb-20" style={{ background: "linear-gradient(135deg, #FFFB7D 0%, #FEDA77 40%, #FCAF45 80%, #F58529 100%)" }}>
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[130px] rounded-full -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white opacity-40 blur-[100px] rounded-full -z-0" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl mb-4"
          >
            <HelpCircle className="text-brand-primary" size={40} />
          </motion.div>
          
          <div className="space-y-4">
             <div className="flex items-center justify-center gap-3">
              <Sparkles size={16} className="text-brand-primary" />
              <span className="text-brand-brown font-black tracking-[0.2em] uppercase text-xs">
                Common Curiosities
              </span>
              <Sparkles size={16} className="text-brand-primary" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-brand-brown tracking-tighter leading-tight">
              Got <span className="text-brand-primary italic">Questions?</span>
            </h1>
            <p className="text-brand-brown/70 text-lg font-bold max-w-xl mx-auto leading-relaxed">
              We've gathered the most frequent questions to help you plan your perfect celebration.
            </p>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {faqsData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                ? "bg-white shadow-2xl border-brand-primary/20 scale-[1.02]" 
                : "bg-white/40 backdrop-blur-xl border-white/40 hover:bg-white/60"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none group"
              >
                <span className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
                  openIndex === index ? "text-brand-primary" : "text-brand-brown"
                }`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openIndex === index ? "bg-brand-primary text-white rotate-180" : "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white"
                }`}>
                  <ChevronDown size={24} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-brand-brown/70 text-lg font-bold leading-relaxed border-t border-brand-primary/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Help Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-10 rounded-[3rem] bg-white shadow-xl text-center border border-brand-primary/10"
        >
           <h3 className="text-2xl font-black text-brand-brown mb-4">Still need answers?</h3>
           <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="mailto:surprisesutra@gmail.com" className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white font-black hover:scale-105 transition-transform shadow-lg">
                <MessageCircle size={20} />
                Surprise Sutra
              </a>
              <a href="tel:+919999416896" className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-brown text-white font-black hover:scale-105 transition-transform shadow-lg">
                <PhoneCall size={20} />
                +91 99994 16896
              </a>
           </div>
        </motion.div>
      </div>

      <style jsx>{`
        .font-brand {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
};

export default Faqs;

