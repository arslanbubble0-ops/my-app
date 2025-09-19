import React from 'react';

const Footer = () => {
  const footerLinks = {
    products: [
      'Web Hosting',
      'Reseller Hosting',
      'VPS Hosting',
      'WordPress Hosting',
      'Domain Names'
    ],
    company: [
      'About Us',
      'Contact Us',
      'Careers',
      'Blog',
      'News'
    ],
    support: [
      'Help Center',
      'Knowledge Base',
      'System Status',
      'Community Forum',
      'Contact Support'
    ],
    connect: [
      { icon: 'fab fa-facebook', text: 'Facebook' },
      { icon: 'fab fa-twitter', text: 'Twitter' },
      { icon: 'fab fa-linkedin', text: 'LinkedIn' },
      { icon: 'fab fa-instagram', text: 'Instagram' },
      { icon: 'fab fa-youtube', text: 'YouTube' }
    ]
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">20i</h3>
            <p className="text-gray-400 mb-4">
              Premium reseller hosting solutions for your business growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2023 20i. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;