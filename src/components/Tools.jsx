import React from 'react';
import { motion } from 'framer-motion';

const softwares = [
  { name: "Premiere", img: "/premier pro.png" },
  { name: "After Effects", img: "/aftereffects.png" },
  { name: "CapCut", img: "/capcut.png" },
  { name: "Audition", img: "/aduition.jpg" },
  { name: "Meta Business", img: "/meta.png" },
  { name: "Instantly.ai", img: "/instantly.ai.png" },
  { name: "Apollo.io", img: "/apllo.io.png" },
  { name: "Mailchimp", img: "/mailchimp.png" },
];

const Software = () => {
  const duplicatedSoftwares = [...softwares, ...softwares];

  return (
    <section className="py-20 bg-black overflow-hidden relative">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Stylish Heading - Font & Style Same */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              SOFTWARE <span className="text-blue-500 italic drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]">/ TOOLS</span>
            </h2>
            
            <div className="mt-5 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              <p className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                 ✦ Trend-Setting Workflow ✦
              </p>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Balanced Slider - Half Inch Reduced */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Central Blue Beam Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-[28px] pointer-events-none z-0" />

          <div className="relative flex items-center h-40 overflow-hidden">
            <motion.div 
              className="flex gap-10 md:gap-16 items-center whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              style={{ width: "max-content" }}
            >
              {duplicatedSoftwares.map((app, index) => (
                <div key={index} className="flex flex-col items-center gap-4 group/item relative py-8">
                  
                  {/* Perfectly Sized Glowing Circle Container */}
                  <div className="relative">
                    {/* Circle Hover Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover/item:opacity-50 transition-all duration-500" />
                    
                    {/* Circle Icon Box - Reduced Size, Circular, & Masked */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-4 rounded-full bg-[#080808] border border-white/5 group-hover/item:border-blue-500/40 transition-all duration-500 group-hover/item:-translate-y-2 group-hover/item:shadow-[0_0_25px_rgba(59,130,246,0.25)] overflow-hidden">
                      <img 
                        src={app.img} 
                        alt={app.name} 
                        // এখানে rounded-full এবং object-cover যোগ করা হয়েছে
                        className="w-full h-full object-cover rounded-full brightness-90 group-hover/item:brightness-110 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* App Name */}
                  <span className="text-gray-500 text-[8.5px] font-black uppercase tracking-[0.25em] group-hover/item:text-blue-400 transition-colors">
                    {app.name}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Premium Edge Fading */}
            <div className="absolute inset-y-0 left-0 w-28 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Software;