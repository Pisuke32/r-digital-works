import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCheckCircle, FaSearch, FaChevronDown } from 'react-icons/fa';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // পৃথিবীর প্রায় সব দেশের লিস্ট
  const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const filteredCountries = allCountries.filter(c => 
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setSelectedCountry("");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleRating = (val) => {
    setRating(val);
    const happySound = new Audio('https://www.myinstants.com/media/sounds/yahoo.mp3'); 
    const sadSound = new Audio('https://www.myinstants.com/media/sounds/baby-crying-01.mp3');
    val >= 4 ? happySound.play() : sadSound.play();
  };

  const LivingStar = ({ side }) => {
    const isHappy = (hover || rating) >= 4;
    const isSad = (hover || rating) > 0 && (hover || rating) <= 3;
    return (
      <motion.div 
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${side === 'left' ? '-left-48' : '-right-48'} flex-col items-center z-50`}
        animate={isHappy ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : isSad ? { x: [-2, 2, -2] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        <AnimatePresence>
          {isHappy && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} exit={{ opacity: 0 }}
              className="bg-green-500 text-white font-black px-4 py-1 rounded-full text-xs mb-2">YEAHHH! 🔥</motion.div>
          )}
          {isSad && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} exit={{ opacity: 0 }}
              className="bg-red-600 text-white font-black px-4 py-1 rounded-full text-xs mb-2">NOOO! 😭</motion.div>
          )}
        </AnimatePresence>
        <div className="relative">
          <FaStar className={`text-9xl ${isHappy ? 'text-yellow-400' : isSad ? 'text-blue-900' : 'text-yellow-700/30'} transition-all duration-300`} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            {isHappy ? <motion.div animate={{ scale: [1, 1.5, 1] }} className="w-8 h-8 bg-black rounded-full mt-2 border-4 border-red-500" /> : 
             isSad ? <div className="w-8 h-4 border-t-4 border-black rounded-full mt-4" /> : 
             <div className="w-6 h-1 bg-black/50 mt-4" />}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">TRUSTED BY <span className="text-blue-500 italic">CLIENTS</span></h2>
          <p className="text-blue-400 text-xs md:text-sm mt-4 uppercase tracking-[0.4em] font-black italic">✦ Please give your honest review ✦</p>
        </div>

        <div className="relative max-w-xl mx-auto">
          <LivingStar side="left" />
          <LivingStar side="right" />

          <div className="bg-[#0a0a0a] border-2 border-white/5 p-8 md:p-10 rounded-[3rem] shadow-2xl relative z-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    
                    <div className="flex justify-center gap-4 mb-6">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" onMouseEnter={() => setHover(val)} onMouseLeave={() => setHover(0)} onClick={() => handleRating(val)}>
                          <FaStar className={`text-4xl md:text-5xl ${val <= (hover || rating) ? (val >= 4 ? 'text-yellow-400 drop-shadow-lg' : 'text-blue-600') : 'text-white/5'}`} />
                        </button>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
                      
                      {/* --- Searchable Country Select with Full List --- */}
                      <div className="relative" ref={dropdownRef}>
                        <div 
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-gray-400 cursor-pointer flex justify-between items-center"
                        >
                          <span className={selectedCountry ? "text-white" : ""}>{selectedCountry || "Select Country"}</span>
                          <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 w-full mt-2 bg-[#111] border border-white/10 rounded-2xl z-50 shadow-2xl overflow-hidden"
                            >
                              <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-white/5">
                                <FaSearch className="text-gray-500 text-xs" />
                                <input 
                                  autoFocus
                                  type="text" 
                                  placeholder="Type to search..." 
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  className="bg-transparent text-sm text-white outline-none w-full"
                                />
                              </div>
                              <div className="max-h-60 overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
                                {filteredCountries.map((country, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => { setSelectedCountry(country); setIsOpen(false); setSearchTerm(""); }}
                                    className="p-3 text-sm text-gray-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                                  >
                                    {country}
                                  </div>
                                ))}
                                {filteredCountries.length === 0 && <div className="p-4 text-xs text-gray-600 text-center">Country not found</div>}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <textarea rows="4" placeholder="Write your review here..." required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"></textarea>

                    <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">Submit Review 🚀</button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
                  <FaCheckCircle className="text-8xl text-green-500 mx-auto mb-6 animate-bounce" />
                  <h3 className="text-4xl font-black text-white tracking-tighter">SUCCESS!</h3>
                  <p className="text-gray-500 text-sm mt-4">Thank you for your review!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;