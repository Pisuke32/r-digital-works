import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // কণাগুলোর সংখ্যা ২৫-৩০টি করা হয়েছে যাতে বেশি বোঝা যায়
  const particles = Array.from({ length: 30 });

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden min-h-screen">
      
      {/* --- জীবন্ত ব্যাকগ্রাউন্ড (বেশি উজ্জ্বল এবং স্পষ্ট) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
              backgroundColor: 'rgba(59, 130, 246, 0.4)', 
              width: Math.random() * 15 + 8 + 'px', 
              height: Math.random() * 15 + 8 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.8, 0], 
              scale: [1, 2.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="absolute w-72 h-72 bg-blue-600/15 rounded-full blur-[100px]"></div>
            <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-b from-blue-500 to-transparent shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="bg-[#0a0a0a] p-3 rounded-[2.4rem]">
                {/* --- আপনার ছবি এখানে ঠিক করা হয়েছে (public/rafil.jpg) --- */}
                <img 
                  src="/rafil.jpg" 
                  alt="Rafil Ahmed" 
                  className="w-64 h-80 md:w-72 md:h-96 object-cover rounded-[1.8rem] transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-2xl shadow-xl z-20 min-w-[100px] text-center border border-blue-400">
                <p className="text-3xl font-black leading-none">2+</p>
                <p className="text-[11px] font-bold uppercase tracking-tighter mt-1">Years Exp.</p>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              I'M <span className="text-blue-500 italic font-black">RAFIL AHMED</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl italic mb-8 font-medium">
              "I am a solo digital creator. I started my journey with 3 core skills to help businesses scale globally."
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {['Video Editing', 'Email Marketing', 'Meta Marketing'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/5 transition-all hover:bg-blue-500 hover:text-white">
                  {skill}
                </span>
              ))}
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-6"></div>
            <p className="text-gray-300 text-sm uppercase tracking-[0.3em] font-bold">
              Solo Creator • Result Driven • No Team
            </p>
          </motion.div>
        </div>

        {/* Video Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              About Me: <span className="text-blue-500 italic">My 3 Core Skills</span>
            </h3>
            
            <p className="text-gray-300 text-sm md:text-base mt-3 uppercase tracking-[0.15em] font-semibold opacity-80">
              Watch this video to know about my workflow and details
            </p>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_60px_rgba(59,130,246,0.15)] aspect-video mx-auto">
            <video 
              controls 
              className="w-full h-full object-cover"
              poster="/images/video-thumbnail.jpg"
            >
              <source src="/videos/your-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;