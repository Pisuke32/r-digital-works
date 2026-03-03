import React from 'react';
import { motion } from 'framer-motion';

const Promises = () => {
  const promiseData = [
    {
      title: "Video Editing",
      description: "Ensure your content stands out with cinematic storytelling and high-retention editing techniques designed for maximum engagement.",
    },
    {
      title: "Email Marketing",
      description: "Scale your revenue with automated workflows and personalized copy that turns subscribers into loyal recurring customers.",
    },
    {
      title: "Meta Marketing",
      description: "Expand your reach with targeted Meta ad strategies, designed to hit the right audience and deliver the highest ROI possible.",
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* --- বাম পাশের সুপার উজ্জ্বল বাবল --- */}
      <motion.div
        animate={{ 
          y: [0, -80, 0],
          x: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        // opacity বাড়িয়ে /40 করা হয়েছে এবং mix-blend-screen যোগ করা হয়েছে
        className="absolute -left-32 top-1/4 w-[500px] h-[500px] bg-blue-600/40 rounded-full blur-[80px] z-0 pointer-events-none mix-blend-screen"
      />

      {/* --- ডান পাশের সুপার উজ্জ্বল বাবল --- */}
      <motion.div
        animate={{ 
          y: [0, 80, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-1/4 w-[550px] h-[550px] bg-blue-500/30 rounded-full blur-[100px] z-0 pointer-events-none mix-blend-screen"
      />

      {/* --- মেইন কন্টেন্ট --- */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-blue-500 text-xs shadow-[0_0_10px_#3b82f6]">✦</span>
          <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
            Our Promises
          </span>
          <span className="text-blue-500 text-xs shadow-[0_0_10px_#3b82f6]">✦</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white mb-20 leading-tight tracking-tighter"
        >
          Excellence in every <br />
          <span className="text-blue-500 italic font-serif">Digital Strategy.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-16 w-full max-w-2xl relative">
          {promiseData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center group relative"
            >
              {/* গ্লোয়িং ডট */}
              <div className="mb-6 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_20px_#3b82f6] group-hover:bg-white transition-all"></div>
              
              <h4 className="text-white font-extrabold text-3xl md:text-4xl mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              
              <p className="text-gray-300 text-base md:text-xl leading-relaxed font-normal opacity-90 max-w-xl group-hover:text-white transition-opacity">
                {item.description}
              </p>

              {index !== promiseData.length - 1 && (
                <div className="mt-16 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promises;