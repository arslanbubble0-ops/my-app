import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-server',
      title: 'Powerful Infrastructure',
      description: 'High-performance servers with SSD storage and the latest technology'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Enhanced Security',
      description: 'Free SSL certificates, malware scanning, and DDoS protection'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Expert Support',
      description: 'Our team of experts is always available to help you and your clients'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Lightning Fast Speeds',
      description: 'Optimized stack for maximum performance and faster loading times'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Easy Management',
      description: 'User-friendly control panel to manage all your clients and services'
    },
    {
      icon: 'fas fa-sync-alt',
      title: 'Daily Backups',
      description: 'Automatic daily backups to keep your data safe and secure'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Reseller Hosting</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you grow your hosting business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-4xl text-primary-600 mb-6">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;