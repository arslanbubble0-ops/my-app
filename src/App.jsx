import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoadingScreen from './components/LoadingScreen';
import Alert from './components/Alert';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 5000);
  };

  const openModal = (modalType, plan = '') => {
    setSelectedPlan(plan);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPlan('');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      {alert.show && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ show: false, message: '', type: '' })} />
      )}

      <Header openModal={openModal} />
      <Hero openModal={openModal} showAlert={showAlert} />
      <Pricing openModal={openModal} />
      <Features />
      <Testimonials />
      <Footer />
      
      {activeModal && (
        <Modal 
          type={activeModal} 
          plan={selectedPlan} 
          onClose={closeModal}
          showAlert={showAlert}
        />
      )}
    </div>
  );
}

export default App;