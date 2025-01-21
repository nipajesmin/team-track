import React from 'react';
import { FaShippingFast, FaRegThumbsUp, FaHeadset } from 'react-icons/fa'; // Importing React Icons

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaRegThumbsUp size={40} />, // React Icon for thumbs up
      title: 'Quality Products',
      description: 'We offer top-quality products that meet your needs and exceed your expectations.',
    },
    {
      id: 2,
      
      icon: <FaShippingFast size={40} />, // React Icon for shipping
      title: 'Fast Delivery',
      description: 'Our delivery service is quick and reliable, ensuring you get your order in no time.',
    },
    {
      id: 3,
      icon: <FaHeadset size={40} />, // React Icon for customer support
      title: 'Customer Support',
      description: 'Our dedicated customer support team is available 24/7 to assist you with any inquiries.',
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4"> {/* Flexbox to center the icon */}
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;


