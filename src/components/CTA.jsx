import React from 'react';

const CTA = ({ openModal }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Hosting Business?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Join thousands of successful resellers and start growing your business today with our powerful hosting platform.
        </p>
        <button 
          onClick={() => openModal('plan', 'Professional')}
          className="btn-accent hover:scale-105 hover:shadow-lg"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CTA;