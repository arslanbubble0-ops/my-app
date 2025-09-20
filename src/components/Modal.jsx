import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from './CustomSelect';

const Modal = ({ type, plan, onClose, showAlert }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Increased to match animation duration
    setStep(1);
    setFormData({});
    setErrors({});
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (type === 'login') {
      if (!data.email) newErrors.email = 'Email is required';
      else if (!validateEmail(data.email)) newErrors.email = 'Invalid email address';
      if (!data.password) newErrors.password = 'Password is required';
      else if (data.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    } 
    else if (type === 'signup') {
      if (!data.fullName) newErrors.fullName = 'Full name is required';
      if (!data.email) newErrors.email = 'Email is required';
      else if (!validateEmail(data.email)) newErrors.email = 'Invalid email address';
      if (!data.password) newErrors.password = 'Password is required';
      else if (data.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
    }
    else if (type === 'plan' && step === 1) {
      if (!data.domain) newErrors.domain = 'Domain name is required';
      if (!data.email) newErrors.email = 'Email is required';
      else if (!validateEmail(data.email)) newErrors.email = 'Invalid email address';
      if (!data.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (validateForm(data)) {
      if (type === 'plan' && step === 1) {
        setFormData(data);
        setStep(2);
      } else {
        console.log('Form submitted:', data);
        showAlert(`${type === 'login' ? 'Login' : 'Signup'} successful!`, 'success');
        handleClose();
      }
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        mass: 0.5,
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const stepIndicatorVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  const renderModalContent = () => {
    switch (type) {
      case 'login':
        return (
          <>
            <motion.h2 
              className="text-2xl font-bold text-primary-500 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Login to Your Account
            </motion.h2>
            <form onSubmit={handleSubmit}>
              <motion.div 
                className="mb-4"
                variants={formItemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >{errors.email}</motion.p>}
              </motion.div>
              <motion.div 
                className="mb-6"
                variants={formItemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Your password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >{errors.password}</motion.p>}
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full btn-primary py-3 rounded-lg font-semibold"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Login
              </motion.button>
            </form>
          </>
        );

      case 'signup':
        return (
          <>
            <motion.h2 
              className="text-2xl font-bold text-primary-500 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Create an Account
            </motion.h2>
            <form onSubmit={handleSubmit}>
              <motion.div 
                className="mb-4"
                variants={formItemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >{errors.fullName}</motion.p>}
              </motion.div>
              <motion.div 
                className="mb-4"
                variants={formItemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >{errors.email}</motion.p>}
              </motion.div>
              <motion.div 
                className="mb-6"
                variants={formItemVariants}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Create a password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >{errors.password}</motion.p>}
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full btn-primary py-3 rounded-lg font-semibold"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up
              </motion.button>
            </form>
          </>
        );

      case 'plan':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                className="text-2xl font-bold text-primary-500"
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 ? `Get Started with ${plan} Plan` : 'Complete Your Order'}
              </motion.h2>
              <div className="flex items-center">
                <motion.div 
                  variants={stepIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 1 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  1
                </motion.div>
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                <motion.div 
                  variants={stepIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 2 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  2
                </motion.div>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="mb-4"
                  variants={formItemVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-gray-700 mb-2 font-medium">Domain Name</label>
                  <input 
                    type="text" 
                    name="domain"
                    placeholder="yourdomain.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.domain ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.domain && <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >{errors.domain}</motion.p>}
                </motion.div>
                <motion.div 
                  className="mb-4"
                  variants={formItemVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >{errors.email}</motion.p>}
                </motion.div>
                <motion.div 
                  className="mb-6"
                  variants={formItemVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-gray-700 mb-2 font-medium">Payment Method</label>
                  <CustomSelect 
                    name="paymentMethod"
                    options={[
                      { value: '', label: 'Select payment method' },
                      { value: 'credit-card', label: 'Credit Card' },
                      { value: 'paypal', label: 'PayPal' },
                      { value: 'bank-transfer', label: 'Bank Transfer' }
                    ]}
                    error={errors.paymentMethod}
                  />
                  {errors.paymentMethod && <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >{errors.paymentMethod}</motion.p>}
                </motion.div>
                <motion.button 
                  type="submit" 
                  className="w-full btn-primary py-3 rounded-lg font-semibold"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Continue to Payment
                </motion.button>
              </form>
            ) : (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg mb-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Plan:</span>
                    <span className="font-semibold">{plan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Domain:</span>
                    <span className="font-semibold">{formData.domain}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold text-primary-500">
                      {plan === 'Starter' ? '£12.99' : plan === 'Professional' ? '£19.99' : '£29.99'}/month
                    </span>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      showAlert(`Your ${plan} plan has been successfully activated!`, 'success');
                      handleClose();
                    }}
                    className="btn-primary py-3 rounded-lg font-semibold"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Complete Purchase
                  </motion.button>
                </div>

                <motion.div 
                  className="text-center text-sm text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <i className="fas fa-lock mr-2"></i>
                  Your payment is secure and encrypted
                </motion.div>
              </motion.div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md mx-4 glass-card relative overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            <motion.button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times"></i>
            </motion.button>
            
            {renderModalContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;