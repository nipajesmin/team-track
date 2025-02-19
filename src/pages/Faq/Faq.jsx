import React, { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is TeamTrack?',
      answer: 'TeamTrack is an advanced platform designed for managing employees effectively. It offers features like user authentication, employee role management, HR role management, salary adjustments, and more.'
    },
    {
      question: 'How do I add a new employee to TeamTrack?',
      answer: 'To add a new employee, navigate to the Employee Management section, click on "Add Employee," and fill in the required details.'
    },
    {
      question: 'Can HR modify employee salaries?',
      answer: 'Yes, HR managers have the authority to adjust employee salaries from the Salary Management section in the dashboard.'
    },
    {
      question: 'Is there a way to track employee performance?',
      answer: 'Yes, TeamTrack provides performance tracking tools to help HR and managers evaluate employee productivity and progress.'
    },
    {
      question: 'How do I remove an employee from the system?',
      answer: 'An HR or admin user can remove an employee by navigating to the Employee List, selecting the employee, and clicking "Remove."'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="mb-4">Here are some common questions about TeamTrack.</p>
      
      <div className="bg-white p-6 rounded shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <button
              className="w-full text-left font-semibold text-lg focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
