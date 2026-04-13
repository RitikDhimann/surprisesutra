import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, Database, Eye } from "lucide-react";

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: "We collect personal details such as your name, email address, phone number, and event preferences to provide you the best experience."
    },
    {
      title: "How We Use Your Data",
      icon: Eye,
      content: "Your data is used strictly for communication, bookings, and service-related updates. We do not share your data with third parties."
    },
    {
      title: "Security Measures",
      icon: ShieldCheck,
      content: "We use SSL encryption and other advanced security measures to keep your information safe at all times."
    },
    {
      title: "Contact Us",
      icon: Mail,
      content: (
        <>
          For any questions about our Privacy Policy, reach us at{" "}
          <span className="text-brand-primary font-black">surprisesutra@gmail.com</span>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-brand pt-32 pb-20" style={{ background: "linear-gradient(135deg, #FFFB7D 0%, #FEDA77 40%, #FCAF45 80%, #F58529 100%)" }}>
      {/* Dynamic Background Elements */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -z-0 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white opacity-40 blur-[100px] rounded-full -z-0" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl mb-6 transform rotate-3"
          >
            <Lock className="text-brand-primary" size={40} />
          </motion.div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[2px] bg-brand-primary"></span>
              <span className="text-brand-brown font-black tracking-[0.2em] uppercase text-xs">
                Legal Notice
              </span>
              <span className="w-12 h-[2px] bg-brand-primary"></span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] text-brand-brown tracking-tighter">
              Privacy <span className="text-brand-primary italic">Policy</span>
            </h1>
            <p className="text-brand-brown/70 text-lg font-bold max-w-2xl mx-auto leading-relaxed">
              We value your privacy and are committed to protecting your personal information.
            </p>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8"
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-2xl hover:bg-white/60 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm border border-brand-primary/10">
                  <section.icon size={28} />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-black text-brand-brown tracking-tight">
                    {section.title}
                  </h3>
                  <div className="text-brand-brown/70 text-lg font-bold leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-brand-brown/40 text-[10px] font-black uppercase tracking-[0.3em]"
        >
          © {new Date().getFullYear()} Surprise Sutra. All rights reserved.
        </motion.p>
      </div>

      <style jsx>{`
        .font-brand {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;

