import React from "react";
import { FaTasks, FaUserTie, FaChartLine, FaClock } from "react-icons/fa";

const Service = () => {
    return (
        <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Explore the wide range of services we provide to enhance your team's productivity.
            </p>
          </div>
  
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <FaTasks className="text-purple-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Task Management</h3>
              <p className="text-gray-600 mt-2">
                Streamline your tasks and ensure on-time completion with our efficient tools.
              </p>
            </div>
  
            {/* Service 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <FaUserTie className="text-purple-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Employee Tracking</h3>
              <p className="text-gray-600 mt-2">
                Monitor employee workflows and track performance in real-time.
              </p>
            </div>
  
            {/* Service 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <FaChartLine className="text-purple-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Analytics & Reports</h3>
              <p className="text-gray-600 mt-2">
                Gain insights with detailed analytics and custom reports.
              </p>
            </div>
  
            {/* Service 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <FaClock className="text-purple-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Time Management</h3>
              <p className="text-gray-600 mt-2">
                Optimize schedules and improve productivity with our time-tracking tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Service;