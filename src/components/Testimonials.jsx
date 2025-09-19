import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      text: '"The reseller hosting platform is incredibly easy to use, and the support team is always helpful. My business has grown 200% since I started using 20i."',
      author: 'John Doe',
      company: 'Web Solutions Ltd.',
      initials: 'JD'
    },
    {
      text: '"I\'ve been using 20i reseller hosting for over 3 years now. The reliability is outstanding, and my clients are always happy with the performance."',
      author: 'Sarah Miller',
      company: 'Digital Agency',
      initials: 'SM'
    },
    {
      text: '"The features and pricing are unbeatable. I looked at several reseller hosting providers, and 20i offered the best value for money with premium features."',
      author: 'Robert Johnson',
      company: 'Tech Host',
      initials: 'RJ'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied resellers who have grown their business with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-4xl text-primary-600 mb-4">"</div>
              <p className="text-gray-600 italic mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;