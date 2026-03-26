import React from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Heart,
  Instagram,
  Facebook,
  Clock,
} from "lucide-react";
import ContactForm from "./Contact";

export default function ContactUs() {
  const contactDetails = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      value: "surprisesutra@gmail.com",
      action: "mailto:surprisesutra@gmail.com",
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      value: "+91-8886361515",
      action: "tel:+918886361515",
    },
    {
      id: 3,
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+91-8886361515",
      action: "https://wa.me/918886361515",
    },
    {
      id: 4,
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Sat: 10 AM - 7 PM",
    },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: Instagram,
      name: "Instagram",
      link: "https://instagram.com/surprisesutra",
    },
    {
      id: 2,
      icon: Facebook,
      name: "Facebook",
      link: "https://facebook.com/surprisesutra",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-brand pt-32 pb-20" style={{ background: "linear-gradient(135deg, #FFFB7D 0%, #FEDA77 40%, #FCAF45 80%, #F58529 100%)" }}>
      {/* Background blobs */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-white opacity-20 blur-[100px] rounded-full -z-0" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-white opacity-20 blur-[100px] rounded-full -z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Contact Info & Socials */}
          <div className="lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-brand-primary"></span>
                <span className="text-brand-brown font-black tracking-[0.2em] uppercase text-xs">
                  Get In Touch
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] text-brand-brown tracking-tighter">
                Let's <span className="text-brand-primary">Collaborate</span> On Your
                Next Event.
              </h1>
              <p className="text-brand-brown/70 text-lg font-bold max-w-sm leading-relaxed">
                Whether it's a grand celebration or an intimate surprise, we're
                here to bring your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactDetails.map((item) => (
                <a
                  key={item.id}
                  href={item.action}
                  className="group p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white hover:scale-[1.02] transition-all duration-500 flex items-start gap-4 shadow-sm hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest mb-1">
                      {item.title}
                    </h3>
                    <p className="text-brand-brown font-black group-hover:text-brand-primary transition-all duration-500 tracking-tight">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-black text-brand-brown/40 uppercase tracking-widest">
                <Heart size={16} className="text-brand-primary" />
                <span>Follow our journey</span>
              </div>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    className="w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-brand-brown/60 hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 shadow-sm"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-3/5">
            <ContactForm />
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #f97316 0%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 1024px) {
          h1 {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
}
