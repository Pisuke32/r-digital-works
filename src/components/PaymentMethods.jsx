import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWallet } from 'react-icons/fa';

const PaymentSection = () => {
  const [showDetails, setShowDetails] = useState(false);

  // আপনার public ফোল্ডারের ফাইল নেমের সাথে মিলিয়ে পাথ সেট করা হয়েছে
  const paymentApps = [
    { name: "PayPal", url: "https://www.paypal.com", img: "/Paypal.png" },
    { name: "Binance", url: "https://www.binance.com", img: "/Binance.png" },
    { name: "Payoneer", url: "https://www.payoneer.com", img: "/Payoneer.png" },
    { name: "Bybit", url: "https://www.bybit.com", img: "/Bybit.png" },
    { name: "Western Union", url: "https://www.westernunion.com", img: "/Westernunione.png" }, 
    { name: "Bkash", url: "https://www.bkash.com", img: "/Bkash.png" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 80 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      className="py-24 bg-[#050505] text-white overflow-hidden relative font-sans"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* মেইন হেডার */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            PAYMENT <span className="text-blue-500 italic font-serif">METHODS</span>
          </h2>
          <p className="text-blue-400 tracking-[0.6em] text-[10px] md:text-xs mt-6 font-black uppercase opacity-90">
            ✦ SECURE GLOBAL TRANSACTIONS ✦
          </p>
        </div>

        {/* কার্ড গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {paymentApps.map((app, index) => (
            <motion.a
              key={index}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              <motion.div 
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-2 bg-blue-600/20 blur-2xl rounded-[2.5rem]"
              ></motion.div>

              <div className="relative bg-[#0a0a0a]/80 backdrop-blur-md border-2 border-blue-500/20 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 group-hover:border-blue-500/80 group-hover:scale-105 min-h-[160px]">
                {/* লোগো সেকশন */}
                <div className="h-16 w-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 p-3">
                   <img 
                     src={app.img} 
                     alt={app.name} 
                     className="w-full h-full object-contain brightness-110 group-hover:scale-110 transition-transform duration-300" 
                     onError={(e) => { e.target.style.display = 'none'; }} // ইমেজ না পেলে হাইড হবে
                   />
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-blue-500/80 group-hover:text-white transition-all text-center">
                  {app.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* See More বাটন */}
        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 0.15)", boxShadow: "0 0 50px rgba(37, 99, 235, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(true)}
            className="px-14 py-6 bg-transparent border-2 border-blue-600/40 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.5em] text-white flex items-center gap-4 mx-auto transition-all"
          >
            <FaWallet className="text-blue-500 text-lg" />
            See More Details
          </motion.button>
        </div>

        {/* ডিটেইলস মোডাল */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-2xl px-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-[#0a0a0a]/90 border-2 border-white/10 w-full max-w-xl rounded-[4rem] p-12 md:p-16 relative shadow-[0_0_100px_rgba(37,99,235,0.1)] max-h-[90vh] overflow-y-auto"
              >
                <button onClick={() => setShowDetails(false)} className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors">
                  <FaTimes size={28} />
                </button>

                <h3 className="text-4xl font-black mb-14 uppercase italic tracking-tighter text-white">
                  Payment <span className="text-blue-500">Info</span>
                </h3>
                
                <div className="space-y-6 text-left">
                  <DetailItem title="bKash Personal" value="+8801795719111" />
                  <DetailItem title="Western Union" value="Contact for Details" />
                  <DetailItem title="Binance UID" value="********" />
                  <DetailItem title="PayPal Email" value="rafilahmed31@gmail.com" />
                  <DetailItem title="Bybit UID" value="******" />
                  <DetailItem title="Payoneer Email" value="rafiluddinahmed@gmail.com" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};

const DetailItem = ({ title, value }) => (
  <div className="group">
    <p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.4em] mb-2 opacity-90">{title}</p>
    <p className="text-sm md:text-xl font-mono font-bold text-white bg-white/[0.03] backdrop-blur-lg p-4 rounded-2xl border border-white/10 border-l-4 border-l-blue-600 transition-all group-hover:bg-white/[0.07] group-hover:border-white/20">
      {value}
    </p>
  </div>
);

export default PaymentSection;