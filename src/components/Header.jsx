import React, { useState, useEffect } from 'react';

const Header = ({ openModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-500 shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <a 
            href="#" 
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-primary-500'
            }`}
          >
            20i
          </a>

          <button 
            className="md:hidden text-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} ${
              isScrolled ? 'text-white' : 'text-gray-800'
            }`}></i>
          </button>

          <nav className={`md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
              {['pricing', 'features', 'testimonials', 'footer'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                    className={`block py-2 md:py-0 font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full ${
                      isScrolled 
                        ? 'text-white hover:text-accent-500' 
                        : 'text-gray-800 hover:text-primary-500'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => openModal('login')}
              className={`font-medium transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-primary-500'
              }`}
            >
              Log in
            </button>
            <button 
              onClick={() => openModal('signup')}
              className={`btn-primary ${
                isScrolled ? 'bg-white text-primary-500 hover:bg-gray-100' : ''
              }`}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;