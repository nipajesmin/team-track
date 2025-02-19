import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Basic Plan',
      price: '$19/month',
      features: ['User Authentication', 'Employee Management', 'Basic Reports']
    },
    {
      name: 'Pro Plan',
      price: '$49/month',
      features: ['All Basic Features', 'HR Role Management', 'Salary Adjustments', 'Advanced Analytics']
    },
    {
      name: 'Enterprise Plan',
      price: 'Custom Pricing',
      features: ['All Pro Features', 'Dedicated Support', 'Custom Integrations', 'Advanced Security']
    }
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Pricing & Plans</h1>
      <p className="mb-6 text-center text-gray-600">Choose the best plan for your team and scale with TeamTrack.</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white p-6 rounded shadow-md border-l-4 border-purple-700">
            <h2 className="text-xl font-semibold mb-2 text-purple-800 text-center">{plan.name}</h2>
            <p className="text-center text-gray-700 text-lg font-bold">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaCheckCircle className="mr-2 text-purple-700" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
