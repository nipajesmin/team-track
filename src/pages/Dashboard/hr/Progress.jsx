import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Progress = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // Fetch all work records
    const { data: workRecords = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['workRecords'],
        queryFn: async () => {
            const response = await axiosSecure.get('/tasks');
            return response.data;
        },
    });

    // Fetch all employees for the dropdown
    const { data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data.filter(user => user.role === 'Employee');
        },
    });

    // Handle filtering
    const filteredRecords = workRecords.filter(record => {
        const matchesEmployee = selectedEmployee ? record.email === selectedEmployee : true;
        const matchesMonth = selectedMonth
            ? new Date(record.date).toLocaleString('default', { month: 'long' }) === selectedMonth
            : true;
        return matchesEmployee && matchesMonth;
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Progress Records</h2>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                {/* Employee Dropdown */}
                <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">All Employees</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee.email}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                {/* Month Dropdown */}
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">All Months</option>
                    {Array.from({ length: 12 }, (_, i) =>
                        new Date(0, i).toLocaleString('default', { month: 'long' })
                    ).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Task</th>
                        <th className="border border-gray-300 px-4 py-2">Hours Worked</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record) => (
                        <tr key={record._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{record.name || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.task}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.hoursWorked}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(record.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Progress;
