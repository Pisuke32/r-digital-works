import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaVideo, FaEnvelopeOpenText, FaChartLine } from 'react-icons/fa6';

const services = [
  {
    title: "Video Editing",
    subtitle: "Professional Video Editing Portfolio",
    icon: <FaVideo />,
    result: "100% Client Satisfaction",
    rating: "5.0",
    desc: "High-quality video edits for YouTube and Social Media with custom motion graphics."
  },
  {
    title: "Email Marketing",
    subtitle: "Email Campaign Management",
    icon: <FaEnvelopeOpenText />,
    result: "Average 35% Open Rate",
    rating: "4.8",
    desc: "High conversion email marketing strategies and automated workflow setup."
  },
  {
    title: "Meta Marketing",
    subtitle: "Facebook & Instagram Ads",
    icon: <FaChartLine />,
    result: "Managed $5000+ Ad Spend",
    rating: "5.0",
    desc: "Driving sales through targeted Meta Ads and data-driven performance tracking."
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      // এখানে once: false দেওয়া হয়েছে যাতে ওপর-নিচ দুই দিকেই অ্যানিমেশন হয়
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      
      whileHover={{ y: -8, scale: 1.02 }} 
      className="relative group h-full"
    >
      <div className="absolute -inset-[1.5px] bg-gradient-to-b from-blue-600/20 to-transparent rounded-[32px] blur-[1px] opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl p-9 rounded-[32px] h-full relative z-10 border border-white/10 group-hover:border-blue-500/40 transition-all duration-500 flex flex-col justify-between shadow-2xl">
        
        <div>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
            className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-2xl text-blue-400 mb-8 border border-blue-500/20"
          >
            {service.icon}
          </motion.div>

          <div className="text-blue-500 font-black text-[11px] tracking-[0.35em] uppercase mb-3 italic">
            {service.title}
          </div>
          
          <h3 className="text-2xl font-bold mb-5 text-white leading-tight">
            {service.subtitle}
          </h3>
          
          <p className="text-gray-400 text-base mb-10 font-light leading-relaxed">
            {service.desc}
          </p>
        </div>
        
        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-black italic">Performance</span>
            <div className="flex items-center text-yellow-500 text-xs gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(service.rating) ? "drop-shadow-[0_0_8px_#eab308]" : "opacity-20"} />
              ))}
            </div>
          </div>

          <div className="relative group/btn cursor-default">
            <div className="absolute -inset-1 bg-blue-500/10 rounded-2xl blur-md opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
            <div className="relative bg-transparent border border-blue-500/30 py-4 rounded-2xl text-center group-hover:border-blue-500/60 transition-all shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]">
              <span className="text-blue-400 font-black text-[11px] md:text-xs uppercase tracking-[0.25em] drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                {service.result}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const stars = Array.from({ length: 80 });

  return (
    <section className="py-20 bg-[#050505] text-white px-6 relative overflow-hidden">
      
      {/* Background Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-4">
        
        {/* Title Section with Multi-directional Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic">
            Services <span className="text-blue-500">&</span> Results
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-600 mx-auto rounded-full mb-6 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          ></motion.div>
          <p className="text-blue-400 font-bold tracking-[0.6em] uppercase text-[10px] md:text-xs opacity-90">
            Defining the Future of Digital Works
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;