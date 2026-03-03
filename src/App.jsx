import React, { useRef, useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaXTwitter, FaLinkedin, FaChevronDown, FaXmark, FaCalendarDays, FaClock, FaPaperPlane, FaHouse, FaStar, FaFlag, FaUsers, FaPlus, FaImage, FaCheck, FaTrash, FaBars } from 'react-icons/fa6'; // Added FaBars

// --- New Imports for Country Search ---
import Select from 'react-select';
import countries from 'world-countries';

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push, remove, update } from "firebase/database";

import Projects from './components/Projects';
import Tools from './components/Tools';
import About from './components/About';
import Reviews from './components/Reviews';
import Promises from './components/Promises';
import PaymentMethods from './components/PaymentMethods'; 
import Footer from './components/Footer'; 

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBEJkfYqMlaGArnW6M4TjGtTrgScg-jdgE",
  authDomain: "rafil-booking-system.firebaseapp.com",
  projectId: "rafil-booking-system",
  storageBucket: "rafil-booking-system.firebasestorage.app",
  messagingSenderId: "1051280885387",
  appId: "1:1051280885387:web:c10081d40014443ca6768e",
  measurementId: "G-R19FB4508K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Country Data & Custom Styling ---
const countryOptions = countries.map(country => ({
  value: `${country.flag} ${country.name.common}`,
  label: `${country.flag} ${country.name.common}`,
}));

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#111',
    borderColor: state.isFocused ? '#22c55e' : '#1f2937',
    borderRadius: '0.75rem',
    padding: '2px',
    fontSize: '14px',
    color: 'white',
    boxShadow: 'none',
    '&:hover': { borderColor: '#22c55e' }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#0a0a0a',
    border: '1px solid #1f2937',
    zIndex: 9999
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#166534' : 'transparent',
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px',
  }),
  singleValue: (base) => ({ ...base, color: 'white' }),
  input: (base) => ({ ...base, color: 'white' }),
  placeholder: (base) => ({ ...base, color: '#6b7280' })
};

function App() {
  const nextSectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const [bookedSlots, setBookedSlots] = useState([]);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [dynamicClients, setDynamicClients] = useState([]);
  const [newClient, setNewClient] = useState({ 
    name: '', 
    project: '', 
    photo: '', 
    flag: '🇧🇩 Bangladesh', 
    status: 'Ongoing' 
  });

  const [adminClickCount, setAdminClickCount] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [pendingClients, setPendingClients] = useState([]);

  // --- Secret Admin Features State ---
  const [clientsClickCount, setClientsClickCount] = useState(0);
  const [reportClickCount, setReportClickCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewReports, setViewReports] = useState(false);
  const [allReports, setAllReports] = useState([]);

  // --- Mobile Menu State ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const clientsRef = ref(db, 'approved_clients/');
    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val();
      setDynamicClients(data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []);
    });

    const pendingRef = ref(db, 'pending_clients/');
    onValue(pendingRef, (snapshot) => {
      const data = snapshot.val();
      setPendingClients(data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []);
    });

    const bookedRef = ref(db, 'bookings/');
    onValue(bookedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setBookedSlots(Object.values(data).map(item => `${item.date}|${item.time}`));
    });

    onValue(ref(db, 'reports/'), (snapshot) => {
        const data = snapshot.val();
        setAllReports(data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []);
    });
  }, []);

  const handleNameClick = () => {
    setAdminClickCount(prev => prev + 1);
    if (adminClickCount + 1 >= 10) {
      const pass = prompt("Enter Admin Password:");
      if (pass === "rafil7890") {
        setIsAdminOpen(true);
      } else {
        alert("Incorrect Password!");
      }
      setAdminClickCount(0);
    }
  };

  const handleClientsSecret = () => {
    setClientsClickCount(prev => {
        if (prev + 1 >= 30) {
            const pass = prompt("Enter Secret Password to Edit Clients:");
            if (pass === "rafil7890") {
                setIsEditMode(true);
                alert("Edit Mode On! You can now edit all details including country name.");
            } else {
                alert("Wrong Password!");
            }
            return 0;
        }
        return prev + 1;
    });
  };

  const handleReportSecret = () => {
    setReportClickCount(prev => {
        if (prev + 1 >= 30) {
            const pass = prompt("Enter Secret Password to View Reports:");
            if (pass === "rafil7890") {
                setViewReports(true);
            } else {
                alert("Wrong Password!");
            }
            return 0;
        }
        return prev + 1;
    });
  };

  const updateClientField = (id, field, value) => {
    update(ref(db, `approved_clients/${id}`), { [field]: value });
  };

  const approveClient = (client) => {
    const approvedRef = ref(db, `approved_clients/${client.id}`);
    set(approvedRef, { ...client, id: null }).then(() => {
      remove(ref(db, `pending_clients/${client.id}`));
      alert("Client Approved!");
    });
  };

  const deleteClient = (id, type) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const path = type === 'pending' ? `pending_clients/${id}` : `approved_clients/${id}`;
      remove(ref(db, path));
    }
  };

  const deleteReport = (id) => {
    if(window.confirm("Delete this report?")) {
        remove(ref(db, `reports/${id}`));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClient({ ...newClient, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.photo) return;
    const submissionRef = ref(db, 'pending_clients/');
    const newSubmissionRef = push(submissionRef);
    set(newSubmissionRef, { ...newClient, timestamp: new Date().toISOString() });
    alert("Details sent for approval!");
    setIsSubmitOpen(false);
    setNewClient({ name: '', project: '', photo: '', flag: '🇧🇩 Bangladesh', status: 'Ongoing' });
  };

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroStars = Array.from({ length: 80 });
  const fallingStarsHero = Array.from({ length: 20 });

  const socialLinks = [
    { Icon: FaFacebook, url: "https://www.facebook.com/rafil.ahmed.2024" },
    { Icon: FaInstagram, url: "https://www.instagram.com/rafil_ahmed0/" },
    { Icon: FaWhatsapp, url: "https://wa.me/+971556225032" },
    { Icon: FaXTwitter, url: "https://x.com/AhmedRafil94429" },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/in/rafilahmed/" },
    { Icon: FaEnvelope, url: "mailto:rafilahmed31@gmail.com" }
  ];

  const submitReport = () => {
    if (reportText.trim() === "") return;
    const reportsRef = ref(db, 'reports/');
    const newReportRef = push(reportsRef);
    set(newReportRef, { message: reportText, timestamp: new Date().toISOString() });
    alert("Thank you! Your report has been submitted.");
    setReportText("");
    setIsReportOpen(false);
  };

  const handleFinalSubmit = (method) => {
    const bookingsListRef = ref(db, 'bookings/');
    const newBookingRef = push(bookingsListRef);
    set(newBookingRef, { date: bookingData.date, time: bookingData.time, createdAt: new Date().toISOString() });
    const message = `Hi Rafil, I want to book a free consultation call.%0A📅 Date: ${bookingData.date}%0A⏰ Time: ${bookingData.time}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/+971556225032?text=${message}`, '_blank');
    } else {
      window.location.href = `mailto:rafilahmed31@gmail.com?subject=Consultation Booking&body=${message.replace(/%0A/g, '\n')}`;
    }
    setIsModalOpen(false);
    setStep(1);
    setBookingData({ date: '', time: '' });
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden relative font-sans">
      
      {/* --- Fixed Top Container for Branding & Menu --- */}
      <div className="fixed top-0 left-0 w-full z-[999] p-6 flex justify-between items-start pointer-events-none">
        
        {/* Left Branding Box */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1 pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-md p-3 rounded-2xl border border-white/5 shadow-xl">
          <h2 onClick={handleNameClick} className="text-white font-bold text-sm tracking-widest uppercase cursor-pointer select-none">Rafil Ahmed</h2>
          <div className="flex gap-2.5">
            <button onClick={() => {setIsClientsOpen(true); handleClientsSecret();}} className="text-blue-500 text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors text-left flex items-center gap-1">
                <FaUsers /> My Clients
            </button>
            <button onClick={() => setIsSubmitOpen(true)} className="text-green-500 text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors text-left flex items-center gap-1">
                <FaPlus /> Join Now
            </button>
          </div>
        </motion.div>

        {/* Right Menu: Desktop Menu and Mobile Hamburger Button */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Desktop Only Menu */}
          <div className="hidden md:flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-2xl">
            <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600/20 rounded-full transition-all text-[10px] font-bold tracking-widest uppercase text-gray-300 hover:text-white">
              <FaHouse className="text-blue-500" /> Home
            </a>
            <a href="#reviews" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600/20 rounded-full transition-all text-[10px] font-bold tracking-widest uppercase text-gray-300 hover:text-white">
              <FaStar className="text-blue-500" /> Review
            </a>
            <button onClick={() => {setIsReportOpen(true); handleReportSecret();}} className="flex items-center gap-2 px-4 py-2 hover:bg-red-600/20 rounded-full transition-all text-[10px] font-bold tracking-widest uppercase text-gray-300 hover:text-white border-none cursor-pointer bg-transparent">
              <FaFlag className="text-blue-500" /> Report
            </button>
          </div>

          {/* Mobile Only Hamburger Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-full text-blue-500 hover:text-white transition-all shadow-xl">
            <FaBars size={18} />
          </button>
        </div>
      </div>

      {/* --- Mobile Sidebar Navigation --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Overlay with Blur */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]" />
            
            {/* Sidebar Content */}
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-64 bg-[#0a0a0a] border-l border-white/10 z-[1002] p-8 flex flex-col gap-8 shadow-2xl">
              <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-gray-500 hover:text-white mb-6"><FaXmark size={24} /></button>
              
              <nav className="flex flex-col gap-6">
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-gray-300 hover:text-blue-500 transition-colors">
                  <FaHouse size={16} /> Home
                </a>
                <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-gray-300 hover:text-blue-500 transition-colors">
                  <FaStar size={16} /> Review
                </a>
                <button onClick={() => {setIsMobileMenuOpen(false); setIsReportOpen(true); handleReportSecret();}} className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-gray-300 hover:text-red-500 transition-colors bg-transparent border-none text-left w-full cursor-pointer">
                  <FaFlag size={16} /> Report
                </button>
              </nav>

              <div className="mt-auto border-t border-white/5 pt-6 text-center">
                <p className="text-[8px] text-gray-600 uppercase tracking-widest">Wonderful Digital Works</p>
                <p className="text-[8px] text-gray-600 uppercase tracking-widest mt-1">© R.DigitalWorks 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Rest of your original App structure (Hero, Modals, Sections) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-screen">
        {heroStars.map((_, i) => (
          <motion.div key={`twinkle-${i}`} className="absolute rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: Math.random() > 0.5 ? '#3b82f6' : '#ffffff', width: Math.random() * 3 + 2 + 'px', height: Math.random() * 3 + 2 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }} animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }} />
        ))}
        {fallingStarsHero.map((_, i) => (
          <motion.div key={`fall-${i}`} className="absolute bg-white rounded-full opacity-20" style={{ width: '2px', height: '2px', left: Math.random() * 100 + '%', top: '-5%' }} animate={{ y: ['0vh', '100vh'], opacity: [0, 0.5, 0] }} transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }} />
        ))}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        <section className="flex flex-col items-center justify-start text-center px-4 pt-28 md:pt-36 pb-12">
          <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={1} className="mb-8 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <img src="/profile.jpg" alt="Rafil Ahmed Profile" className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-blue-500/50 shadow-2xl object-cover hover:scale-110 transition-transform duration-500" />
          </motion.div>
          <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={2} className="mb-6 text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
            ✦ Wonderful Digital Works Experience ✦
          </motion.div>
          <motion.h1 variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={3} className="text-6xl md:text-9xl font-bold tracking-tighter drop-shadow-2xl select-none leading-none">
            <span className="text-gray-200">R.Digital</span>
            <span className="text-blue-500 italic font-serif ml-2">Works</span>
          </motion.h1>
          <motion.p variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={4} className="mt-8 text-gray-400 text-lg md:text-2xl max-w-3xl font-light italic leading-relaxed">
            We don't just edit videos, we create <span className="text-white font-bold not-italic underline underline-offset-8 decoration-blue-500/40">Digital Masterpieces</span>.
          </motion.p>
          <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={5} className="flex gap-6 md:gap-10 justify-center mt-12">
            {socialLinks.map(({ Icon, url }, index) => (
              <motion.a key={index} href={url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.3, y: -8 }} className="text-3xl md:text-4xl text-gray-500/70 transition-all duration-300 hover:text-blue-500"><Icon /></motion.a>
            ))}
          </motion.div>
          <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={6} className="mt-14">
            <button onClick={() => setIsModalOpen(true)} className="px-12 py-4 bg-transparent border border-blue-500/50 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              Book A Free Call ↗
            </button>
          </motion.div>
          <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} custom={7} className="mt-24 mb-64 flex flex-col items-center gap-4 cursor-pointer group" onClick={scrollToNext}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-blue-500 text-3xl">
              <FaChevronDown />
            </motion.div>
            <p className="text-white font-black tracking-[0.4em] uppercase text-[10px] md:text-xs drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
              Your Success, My Responsibility
            </p>
          </motion.div>
        </section>

        {/* ... (All your original modales stay here, identical) ... */}
        <AnimatePresence>
          {isClientsOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsClientsOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-[#0a0a0a] border border-blue-500/30 p-8 rounded-3xl max-w-md w-full shadow-2xl">
                <button onClick={() => setIsClientsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaXmark size={20} /></button>
                <div className="mb-6 flex justify-between items-start">
                   <div>
                      <h3 className="text-2xl font-bold text-blue-500">Global Clients</h3>
                      <p className="text-gray-400 text-xs mt-1 italic">Building trust across borders {isEditMode && "• Edit Mode Active"}</p>
                   </div>
                   {isEditMode && (
                     <button onClick={() => setIsEditMode(false)} className="bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-green-500 transition-all">Done</button>
                   )}
                </div>
                <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                   {dynamicClients.length > 0 ? dynamicClients.map((client, index) => (
                      <div key={index} className="bg-[#111] border border-gray-800 p-3 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-all relative">
                         <img src={client.photo || 'https://via.placeholder.com/150'} alt={client.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20 shadow-lg" />
                         <div className="flex-1 ml-2">
                            {isEditMode ? (
                                <input className="bg-transparent border-b border-blue-500/40 text-white font-bold text-sm w-full outline-none mb-1" defaultValue={client.name} onBlur={(e) => updateClientField(client.id, 'name', e.target.value)} />
                            ) : (
                                <p className="text-white font-bold text-sm leading-tight">{client.name}</p>
                            )}
                            
                            {isEditMode ? (
                                <input className="bg-transparent border-b border-gray-700 text-gray-400 text-[10px] w-full outline-none" defaultValue={client.project} onBlur={(e) => updateClientField(client.id, 'project', e.target.value)} />
                            ) : (
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest leading-tight mt-0.5">{client.project}</p>
                            )}
                            
                            {isEditMode ? (
                                <input className="bg-transparent border-b border-blue-400/40 text-blue-400 text-[11px] font-bold w-full outline-none mt-1.5" defaultValue={client.flag} onBlur={(e) => updateClientField(client.id, 'flag', e.target.value)} />
                            ) : (
                                <p className="text-blue-400 text-[11px] font-bold flex items-center gap-1.5 mt-1.5 bg-blue-500/10 w-fit px-2 py-0.5 rounded-md">
                                    {client.flag || '🌐 Global'}
                                </p>
                            )}
                         </div>
                         <div className="flex flex-col items-end gap-2">
                            <div className={`text-[8px] font-black px-2 py-1 rounded-full uppercase ${client.status === 'Ongoing' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>
                                {client.status}
                            </div>
                            {isEditMode && (
                                <button onClick={() => deleteClient(client.id, 'approved')} className="text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"><FaTrash size={14}/></button>
                            )}
                         </div>
                      </div>
                   )) : (
                     <div className="text-center py-10 text-gray-600 text-sm italic">No approved clients yet.</div>
                   )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ... (Secret Report View Modal, Submission Modal, Admin Modal - all stay identical) ... */}
        <AnimatePresence>
            {viewReports && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} onClick={() => setViewReports(false)} className="absolute inset-0 bg-black/98 backdrop-blur-md" />
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-[#0a0a0a] border border-red-500/30 p-8 rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-red-500 font-bold uppercase tracking-widest">User Reports (Admin)</h3>
                            <button onClick={() => setViewReports(false)} className="text-gray-500"><FaXmark size={20}/></button>
                        </div>
                        <div className="space-y-3">
                            {allReports.length > 0 ? allReports.map(rep => (
                                <div key={rep.id} className="bg-[#111] p-4 rounded-xl border border-gray-800 flex justify-between items-start">
                                    <div className="flex-1 pr-4">
                                        <p className="text-sm text-gray-200">{rep.message}</p>
                                        <span className="text-[9px] text-gray-500 uppercase mt-2 block">{new Date(rep.timestamp).toLocaleString()}</span>
                                    </div>
                                    <button onClick={() => deleteReport(rep.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><FaTrash size={14}/></button>
                                </div>
                            )) : <p className="text-center text-gray-600 italic">No reports found.</p>}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        <AnimatePresence>
          {isSubmitOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSubmitOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0a0a0a] border border-green-500/30 p-8 rounded-3xl max-w-sm w-full shadow-2xl">
                <button onClick={() => setIsSubmitOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaXmark size={20} /></button>
                <h3 className="text-xl font-bold mb-6 text-center text-green-500 uppercase tracking-widest">Join List</h3>
                <form onSubmit={handleClientSubmit} className="flex flex-col gap-4">
                    <label className="w-full h-32 border border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500/50 transition-all overflow-hidden bg-[#111]">
                      {newClient.photo ? (
                        <img src={newClient.photo} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <FaImage className="text-gray-600 text-2xl mb-2" />
                          <span className="text-gray-500 text-[10px] uppercase font-bold">Select Photo from Gallery</span>
                        </>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    <input required placeholder="Your Name" className="bg-[#111] border border-gray-800 p-3 rounded-xl text-sm outline-none focus:border-green-500 text-white" onChange={(e) => setNewClient({...newClient, name: e.target.value})} />
                    <div className="flex flex-col gap-2">
                      <Select options={countryOptions} placeholder="Search Country..." styles={customSelectStyles} onChange={(selected) => setNewClient({...newClient, flag: selected.value})} />
                      <select className="w-full bg-[#111] border border-gray-800 p-3 rounded-xl text-sm outline-none text-white" onChange={(e) => setNewClient({...newClient, status: e.target.value})}>
                        <option value="Ongoing">Working Now</option>
                        <option value="Done">Project Done</option>
                      </select>
                    </div>
                    <input required placeholder="Project Type" className="bg-[#111] border border-gray-800 p-3 rounded-xl text-sm outline-none focus:border-green-500 text-white" onChange={(e) => setNewClient({...newClient, project: e.target.value})} />
                    <button type="submit" className="w-full py-4 bg-green-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-green-500 transition-all">Join</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setIsModalOpen(false); setStep(1);}} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0a0a0a] border border-blue-500/30 p-8 rounded-3xl max-w-sm w-full shadow-2xl">
                <button onClick={() => {setIsModalOpen(false); setStep(1);}} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaXmark size={20} /></button>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FaCalendarDays className="text-blue-500 text-4xl mb-4 mx-auto" />
                    <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full bg-[#111] border border-gray-800 p-3 rounded-xl mb-6 text-white focus:border-blue-500 outline-none" onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
                    <button disabled={!bookingData.date} onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 rounded-xl font-bold disabled:opacity-50 text-sm">Next</button>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FaClock className="text-blue-500 text-4xl mb-4 mx-auto" />
                    <div className="flex flex-col gap-3 mb-6 max-h-64 overflow-y-auto pr-1">
                      {[{ display: "15:00 UTC (9:00 PM BDT)", val: "09:00 PM BDT / 15:00 UTC" }, { display: "18:00 UTC (12:00 AM BDT)", val: "12:00 AM BDT / 18:00 UTC" }, { display: "20:00 UTC (02:00 AM BDT)", val: "02:00 AM BDT / 20:00 UTC" }, { display: "22:00 UTC (04:00 AM BDT)", val: "04:00 AM BDT / 22:00 UTC" }, { display: "00:00 UTC (06:00 AM BDT)", val: "06:00 AM BDT / 00:00 UTC" }].map((t) => {
                        const isBooked = bookedSlots.includes(`${bookingData.date}|${t.val}`);
                        return (
                          <button key={t.val} disabled={isBooked} onClick={() => setBookingData({...bookingData, time: t.val})} className={`flex justify-between items-center p-4 rounded-xl border text-xs transition-all ${isBooked ? 'border-red-900/30 bg-red-950/10 opacity-50 cursor-not-allowed' : bookingData.time === t.val ? 'bg-blue-600 border-blue-600' : 'border-gray-800 bg-[#111] hover:border-blue-500/50'}`}>
                            <span>{t.display}</span>
                            {isBooked && <span className="bg-red-600 text-[9px] px-2 py-1 rounded-full text-white font-black">Booked</span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => {setStep(1); setBookingData({...bookingData, time: ''});}} className="w-1/3 py-3 bg-gray-900 rounded-xl text-[10px]">Back</button>
                      <button disabled={!bookingData.time} onClick={() => setStep(3)} className="w-2/3 py-3 bg-blue-600 rounded-xl text-[10px]">Next</button>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FaPaperPlane className="text-blue-500 text-4xl mb-4 mx-auto" />
                    <button onClick={() => handleFinalSubmit('whatsapp')} className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-black font-bold rounded-xl text-sm mb-3"><FaWhatsapp size={20} /> WhatsApp</button>
                    <button onClick={() => handleFinalSubmit('email')} className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-bold rounded-xl text-sm"><FaEnvelope size={18} /> Email</button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isReportOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReportOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0a0a0a] border border-red-500/30 p-8 rounded-3xl max-w-sm w-full shadow-2xl">
                <button onClick={() => setIsReportOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaXmark size={20} /></button>
                <div className="text-center">
                  <FaFlag className="text-red-500 text-4xl mb-4 mx-auto" />
                  <textarea value={reportText} onChange={(e) => setReportText(e.target.value)} className="w-full h-32 bg-[#111] border border-gray-800 p-3 rounded-xl mb-4 text-white focus:border-red-500 outline-none resize-none text-sm" placeholder="Describe issue..." />
                  <button onClick={submitReport} className="w-full py-4 bg-red-600 rounded-xl font-bold text-xs uppercase tracking-widest">Send Report</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAdminOpen && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminOpen(false)} className="absolute inset-0 bg-black/98 backdrop-blur-xl" />
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-[#0a0a0a] border border-yellow-500/30 p-8 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <button onClick={() => setIsAdminOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><FaXmark size={24} /></button>
                <div className="space-y-6">
                  {pendingClients.map(client => (
                    <div key={client.id} className="bg-[#111] p-4 rounded-2xl flex items-center justify-between border border-gray-800 text-white">
                      <div className="flex items-center gap-4">
                        <img src={client.photo} className="w-12 h-12 rounded-full object-cover" />
                        <div><p className="font-bold text-sm">{client.name} <span className="text-blue-500">{client.flag}</span></p><p className="text-[10px] text-gray-500">{client.project}</p></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approveClient(client)} className="p-3 bg-green-600/10 text-green-500 rounded-xl hover:bg-green-600 transition-all"><FaCheck /></button>
                        <button onClick={() => deleteClient(client.id, 'pending')} className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 transition-all"><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                  {dynamicClients.map(client => (
                    <div key={client.id} className="bg-[#050505] p-3 rounded-xl flex items-center justify-between border border-gray-900 text-white">
                      <div className="flex items-center gap-2"><img src={client.photo} className="w-8 h-8 rounded-full object-cover" /><p className="text-[10px] font-medium">{client.name}</p></div>
                      <button onClick={() => deleteClient(client.id, 'approved')} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><FaTrash size={12}/></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- All Main Sections (identical) --- */}
        <div ref={nextSectionRef} className="relative z-10 bg-[#050505] pt-40">
          <Projects />
          <div className="mt-32"><Tools /></div>
          <div className="mt-40"><About /></div>
          <div className="mt-40"><Promises /></div>
          <div className="mt-20"><PaymentMethods /></div>
          <div id="reviews" className="mt-20"><Reviews /></div>
          <Footer onBookClick={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  );
}

export default App;