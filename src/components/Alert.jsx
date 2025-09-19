import React, { useEffect, useState } from 'react';

const Alert = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center max-w-md transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
      <div className="flex-1">
        {type === 'success' && <i className="fas fa-check-circle mr-3"></i>}
        {type === 'error' && <i className="fas fa-exclamation-circle mr-3"></i>}
        {type === 'warning' && <i className="fas fa-exclamation-triangle mr-3"></i>}
        {message}
      </div>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-4 text-white hover:text-white/70"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Alert;