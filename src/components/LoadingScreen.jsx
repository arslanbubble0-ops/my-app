import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className={`text-6xl text-white mb-6 transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-75'}`}>
          <i className="fas fa-server"></i>
        </div>
        
        <h1 className={`text-3xl font-bold text-white mb-4 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          20i Reseller Hosting
        </h1>
        
        <div className="w-64 h-2 bg-white/30 rounded-full mx-auto mb-6 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className={`text-white/80 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Loading premium hosting experience... {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;