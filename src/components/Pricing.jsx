import React from 'react';

const Pricing = ({ openModal }) => {
  const plans = [
    {
      name: 'Starter',
      price: '£12.99',
      popular: false,
      features: [
        '50GB SSD Storage',
        'Unlimited Bandwidth',
        '10 cPanel Accounts',
        'Free SSL Certificates',
        '24/7 Support'
      ]
    },
    {
      name: 'Professional',
      price: '£19.99',
      popular: true,
      features: [
        '100GB SSD Storage',
        'Unlimited Bandwidth',
        '30 cPanel Accounts',
        'Free SSL Certificates',
        '24/7 Priority Support'
      ]
    },
    {
      name: 'Enterprise',
      price: '£29.99',
      popular: false,
      features: [
        '200GB SSD Storage',
        'Unlimited Bandwidth',
        'Unlimited cPanel Accounts',
        'Free SSL Certificates',
        '24/7 Premium Support'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col ${
                plan.popular ? 'border-2 border-accent-500 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{plan.name}</h3>
              <div className="text-4xl font-bold text-primary-600 mb-6 text-center">
                {plan.price}<span className="text-lg text-gray-500">/month</span>
              </div>
              
              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => openModal('plan', plan.name)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-accent-500 hover:bg-accent-600 text-white' 
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;