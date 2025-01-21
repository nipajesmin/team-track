import React, { useContext } from 'react';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch all employees
    const { data: employees = [], isLoading, isError, error } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data.filter(user => user.verified_status || user.role === 'HR'); // Only show verified users
        },
    });

    // Count employees based on roles
    const totalEmployees = employees.length;
    const totalHR = employees.filter(emp => emp.role === 'HR').length;
    const totalAdmins = employees.filter(emp => emp.role === 'admin').length;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">
                Welcome, {user?.displayName || 'User'}
            </h2>
            <p className="text-gray-600 mb-8">
                Here's an overview of your team and roles in the organization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {/* Total Employees */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Total Employees</h3>
                    <p className="text-gray-600">{totalEmployees}</p>
                </div>

                {/* Total HR */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Total HR</h3>
                    <p className="text-gray-600">{totalHR}</p>
                </div>

                {/* Total Admins */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Total Admins</h3>
                    <p className="text-gray-600">1</p>
                </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-violet-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Welcome Message</h3>
                <p>
                    Thank you for your contributions! Whether you're managing employees, handling HR responsibilities, or working on projects, your efforts make a difference. Keep up the great work!
                </p>
            </div>
        </div>
    );
};

export default AdminHome;

