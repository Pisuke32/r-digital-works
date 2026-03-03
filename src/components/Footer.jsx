import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// এখানে props হিসেবে onBookClick নেওয়া হয়েছে যাতে App.jsx থেকে ফাংশনটি কল করা যায়
const Footer = ({ onBookClick }) => {
  
  // তারার ডাটা (আগের মতোই রাখা হয়েছে)
  const starsData = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      left: `${Math.random() * 120 - 10}%`,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      drift: Math.random() * 200 - 100,
    }));
  }, []);

  const scrollVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  // আপনার সোশ্যাল লিংকগুলো এখানে ডিফাইন করা হয়েছে
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/rafil.ahmed.2024" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/rafil_ahmed0/" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/rafilahmed/" }
  ];

  return (
    <footer className="bg-[#050505] mt-20 md:mt-32 pt-16 pb-12 relative overflow-hidden font-sans border-t border-white/5">
      
      {/* তারার এনিমেশন */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {starsData.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, top: "-5%", left: star.left }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0],
              top: ["0%", "110%"], 
              x: [0, star.drift], 
              scale: [0.6, 1.2, 0.6]
            }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay,
              ease: "linear" 
            }}
            style={{ width: `${star.size}px`, height: `${star.size}px` }}
            className="absolute bg-white rounded-full shadow-[0_0_12px_3px_rgba(255,255,255,0.7)]"
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={scrollVariants}
          className="mb-20"
        >
          <motion.p 
            animate={{ 
              textShadow: ["0 0 5px #fff", "0 0 20px #fff", "0 0 5px #fff"],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-[11px] uppercase tracking-[0.6em] font-black mb-8"
          >
            — Reach out anytime —
          </motion.p>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-tight uppercase">
            <span className="text-white">Transforming </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Content</span> <br /> 
            <span className="text-blue-500 italic font-serif lowercase tracking-normal px-2">into</span> 
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Revenue.</span>
          </h2>
          
          <p className="text-gray-400 text-xs md:text-sm mb-12 opacity-80 max-w-xl mx-auto leading-relaxed font-medium">
            From High-End <span className="text-blue-400 font-bold">Video Editing</span> to Data-Driven <span className="text-purple-400 font-bold">Marketing</span>. <br/> 
            Let's scale your digital presence together.
          </p>

          <div className="flex flex-col items-center gap-10">
            {/* বুকিং বাটন: এটি ক্লিক করলে App.jsx-এর পপ-আপ খুলবে */}
            <motion.button 
              onClick={onBookClick}
              animate={{ 
                y: [0, -8, 0], 
                rotate: [0, -1, 1, -1, 0],
                boxShadow: [
                  "0 0 15px rgba(59, 130, 246, 0.4)", 
                  "0 0 30px rgba(59, 130, 246, 0.6)", 
                  "0 0 15px rgba(59, 130, 246, 0.4)"
                ]
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2.5, repeat: Infinity }
              }}
              whileHover={{ scale: 1.05 }}
              className="px-10 py-3 bg-transparent border-2 border-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 group relative z-20"
            >
              Book A Free Call 
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </motion.button>

            {/* সোশ্যাল লিংকগুলো আপডেট করা হয়েছে */}
            <div className="flex gap-8 relative z-20">
              {socialLinks.map((link, idx) => (
                <motion.a 
                  key={idx} 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#3b82f6" }}
                  className="text-gray-500 transition-all text-xl"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ফুটার ব্র্যান্ডিং */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 relative z-10">
          <div className="text-center md:text-left order-2 md:order-1">
              <h4 className="text-lg font-black text-white tracking-tighter mb-1">
                R.DigitalWorks<span className="text-blue-500">.com</span>
              </h4>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                Wonderful Digital Experience
              </p>
              <p className="text-gray-600 text-[8px] mt-4 font-bold uppercase tracking-widest">
                © ALL RIGHTS RESERVED R.DIGITALWORKS 2026
              </p>
          </div>

          <div className="order-3 text-center md:text-right">
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1 font-black">Created By</p>
              <span className="text-white font-serif italic text-2xl tracking-tight opacity-100 drop-shadow-lg">
                Rafil Ahmed
              </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;