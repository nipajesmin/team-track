import React from 'react';

const RulesAndRegulations = () => {
  const rules = [
    {
      title: 'User Authentication',
      description: 'All users must register and authenticate before accessing any features of TeamTrack. Unauthorized access is strictly prohibited.'
    },
    {
      title: 'Employee Role Management',
      description: 'HR and Admins have the authority to assign roles and manage employee permissions. Regular employees cannot modify their own roles.'
    },
    {
      title: 'HR Role Responsibilities',
      description: 'HR personnel are responsible for managing employee data, salary adjustments, and ensuring company policies are followed.'
    },
    {
      title: 'Payment and Salary Adjustments',
      description: 'Salary adjustments must be approved by HR. Employees will receive payments on the designated payroll dates.'
    },
    {
      title: 'Termination and Employee Removal',
      description: 'Only HR and Admins have the right to remove an employee from the system. Proper documentation is required for termination.'
    },
    {
      title: 'Data Security and Privacy',
      description: 'All user and employee data is confidential. Unauthorized sharing or misuse of data will lead to strict actions.'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rules and Regulations</h1>
      <p className="mb-4">Please adhere to the following rules and regulations while using TeamTrack.</p>
      
      <div className="bg-white p-6 rounded shadow-md">
        {rules.map((rule, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <h2 className="font-semibold text-lg">{rule.title}</h2>
            <p className="text-gray-700">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesAndRegulations;
