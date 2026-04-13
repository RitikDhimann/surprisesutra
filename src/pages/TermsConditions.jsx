import { motion } from "framer-motion";
import { FileText, Shield, Gavel, CheckCircle } from "lucide-react";

const TermsConditions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const sections = [
    {
      title: "Service Usage",
      icon: Shield,
      content: "You agree to provide accurate information and cooperate with our team for event planning and execution. We reserve the right to refuse service if terms are not met."
    },
    {
      title: "Intellectual Property",
      icon: FileText,
      content: "All content, designs, and materials are owned by Surprise Sutra and protected under applicable copyright laws. Reproduction without consent is prohibited."
    },
    {
      title: "Limitation of Liability",
      icon: Gavel,
      content: "We are not responsible for delays or failures caused by factors beyond our control such as natural disasters or third-party disruptions."
    },
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: "By booking with us, you acknowledge and accept these terms and conditions in full. These terms may be updated from time to time."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-brand pt-32 pb-20" style={{ background: "linear-gradient(135deg, #FFFB7D 0%, #FEDA77 40%, #FCAF45 80%, #F58529 100%)" }}>
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-brand-primary/10 blur-[130px] rounded-full -z-0 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-white opacity-40 blur-[110px] rounded-full -z-0" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20 space-y-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -12, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white shadow-2xl mb-4 transform -rotate-2"
          >
            <FileText className="text-brand-primary" size={48} />
          </motion.div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="w-16 h-[2px] bg-brand-primary/40"></span>
              <span className="text-brand-brown font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
                The Playbook
              </span>
              <span className="w-16 h-[2px] bg-brand-primary/40"></span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.85] text-brand-brown tracking-tighter">
              Terms of <span className="text-brand-primary italic">Play</span>
            </h1>
            <p className="text-brand-brown/70 text-xl font-bold max-w-2xl mx-auto leading-relaxed italic">
              "Every great event starts with a clear set of rules for the magic to happen."
            </p>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="p-10 rounded-[3rem] bg-white/50 backdrop-blur-2xl border border-white/50 shadow-lg hover:shadow-3xl hover:bg-white/70 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Decorative background number */}
              <span className="absolute -right-4 -bottom-4 text-9xl font-black text-brand-primary/5 select-none pointer-events-none group-hover:text-brand-primary/10 transition-colors">
                0{index + 1}
              </span>

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                  <section.icon size={32} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-brand-brown tracking-tight">
                    {section.title}
                  </h3>
                  <p className="text-brand-brown/80 text-lg font-bold leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Closing Note */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="mt-20 p-8 rounded-[2rem] bg-brand-brown text-white text-center shadow-2xl"
        >
           <p className="text-lg font-bold">
             Questions about our Terms? <a href="mailto:surprisesutra@gmail.com" className="text-brand-secondary underline hover:text-white transition-colors">surprisesutra@gmail.com</a>
           </p>
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

export default TermsConditions;

