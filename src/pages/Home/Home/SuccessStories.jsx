import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessStories = () => {
  const stories = [
    {
      company: 'TechCorp Solutions',
      story: 'After implementing TeamTrack, TechCorp streamlined employee management, reducing administrative workload by 40%. Their HR department now operates with improved efficiency and transparency.'
    },
    {
      company: 'InnovateX Enterprises',
      story: 'With TeamTrack, InnovateX optimized role assignments and payroll processing, resulting in a 30% increase in workforce productivity.'
    },
    {
      company: 'GlobalSoft Ltd.',
      story: 'GlobalSoft utilized TeamTrack to enhance employee tracking and salary adjustments, ensuring compliance with company policies and boosting employee satisfaction.'
    }
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Success Stories</h1>
      <p className="mb-6 text-center text-gray-600">Discover how companies have transformed their employee management with TeamTrack.</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md border-l-4 border-purple-700">
            <h2 className="text-xl font-semibold mb-2 text-purple-800 flex items-center">
              <FaCheckCircle className="mr-2 text-purple-700" /> {story.company}
            </h2>
            <p className="text-gray-700">{story.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;

