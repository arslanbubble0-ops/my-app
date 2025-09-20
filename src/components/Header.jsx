import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ openModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3 } },
    exit: { x: "100%", transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`fixed top-0 w-full z-[40] transition-all duration-300 ${
        scrolled && !mobileOpen
          ? "bg-white shadow-md backdrop-blur-sm"
          : mobileOpen
          ? "bg-white shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative z-10">
        {/* Logo */}
        <div
          className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled || mobileOpen ? "text-purple-700" : "text-white"
          }`}
        >
          20i
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {["Pricing", "Features", "Testimonials", "Footer"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase());
              }}
              className={`font-medium transition-colors duration-300 ${
                scrolled || mobileOpen
                  ? "text-purple-700 hover:text-purple-500"
                  : "text-white hover:text-accent-400"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => openModal("login")}
            className={`font-medium transition-colors duration-300 ${
              scrolled || mobileOpen ? "text-purple-700" : "text-white"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => openModal("signup")}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              scrolled || mobileOpen
                ? "bg-white text-purple-700 hover:bg-gray-100 border border-purple-700"
                : "bg-purple-700 text-white hover:bg-purple-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger/Close Button */}
        <button
          className={`md:hidden text-2xl z-50 transition-colors duration-300 relative ${
            scrolled || mobileOpen ? "text-purple-700" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {/* Hamburger Icon */}
          <div className={`transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Close Icon */}
          <div className={`absolute top-0 left-0 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Strong Overlay for Clear Separation */}
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[60]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              />

              {/* Solid Glassy Menu with Clear Background */}
              <motion.nav
                className="fixed top-0 right-0 h-screen w-80 z-[70] overflow-hidden shadow-2xl"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ 
                  maxHeight: '100vh',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Solid Background Layer */}
                <div className="absolute inset-0 bg-white/90"></div>
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-white/20 to-purple-50/30"></div>
                
                {/* Left Border for Clear Separation */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700"></div>
                
                {/* Content Container */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Menu Header */}
                  <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-purple-100">
                    <div className="text-3xl font-bold text-purple-700 drop-shadow-sm">
                      20i
                    </div>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="text-purple-700 text-xl p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 shadow-sm"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Menu Items with Solid Cards */}
                  <div className="flex flex-col gap-3 flex-1">
                    {["Pricing", "Features", "Testimonials", "Footer"].map((item, index) => (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.toLowerCase());
                        }}
                        className="relative group text-purple-800 font-semibold text-lg py-4 px-6 rounded-2xl transition-all duration-300 block overflow-hidden shadow-sm hover:shadow-md border border-purple-100 hover:border-purple-200"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.9) 100%)',
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{item}</span>
                        
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Action Buttons with Solid Styling */}
                  <div className="flex flex-col gap-4 pt-8 border-t-2 border-purple-100">
                    <motion.button
                      onClick={() => {
                        openModal("login");
                        setMobileOpen(false);
                      }}
                      className="relative w-full py-4 px-6 font-semibold rounded-2xl transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-md border-2 border-purple-200 hover:border-purple-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,1) 100%)',
                        color: '#6B46C1'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Log in</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        openModal("signup");
                        setMobileOpen(false);
                      }}
                      className="relative w-full py-4 px-6 font-semibold rounded-2xl transition-all duration-300 overflow-hidden group shadow-md hover:shadow-lg border-2 border-purple-600"
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 font-bold">Sign Up</span>
                    </motion.button>
                  </div>
                </div>

                {/* Additional Border for Extra Separation */}
                <div className="absolute inset-0 rounded-l-2xl border-2 border-white/60 pointer-events-none"></div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;