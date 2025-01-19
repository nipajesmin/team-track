import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State for the selected employee
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Fetch employees using useQuery
    const { data: employees = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // Filter users with the role "Employee"
            return res.data.filter(user => user.role === 'Employee');
        },
    });

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading employees...</div>;
    }

    if (isError) {
        return <div>Error fetching employees: {error.message}</div>;
    }

    // Open modal and set selected employee
    const handlePay = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    // Handle pay action
    const handlePayAction = async () => {
        const month = document.querySelector('input[placeholder="Enter month (e.g., January)"]').value;
        const year = document.querySelector('input[placeholder="Enter year (e.g., 2025)"]').value;
    
        if (!month || !year) {
            toast.error('Please enter both month and year.');
            return;
        }
    
        const paymentRequest = {
            employeeId: selectedEmployee._id,
            name: selectedEmployee.name,
            salary: selectedEmployee.salary,
            month,
            year,
            status: 'Pending', // Initial status for approval
        };
    
        try {
            const response = await axiosSecure.post('/payroll-requests', paymentRequest);
            if (response.status === 201) {
                toast.success('Payment request created successfully.');
                setIsModalOpen(false); // Close the modal
            } else {
                throw new Error('Failed to create payment request.');
            }
        } catch (error) {
            toast.error('Error creating payment request.');
            console.error(error);
        }
    };
    

    const handleToggleVerification = async (employee) => {
        const newStatus = !employee.verified_status; // Toggle the current status
        try {
            const response = await axiosSecure.patch(`/users/${employee._id}/verify`, {
                verified_status: newStatus,
            });

            if (response.status === 200) {
                toast.success(`Verification status updated to ${newStatus ? 'Verified' : 'Not Verified'}`);
                refetch(); // Refetch the data to reflect the change
            }
        } catch (error) {
            toast.error('Failed to update verification status.');
            console.error(error);
        }
    };

    return (

        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Employee List</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Bank Account No</th>
                        <th className="border border-gray-300 px-4 py-2">Verification</th>
                        <th className="border border-gray-300 px-4 py-2">Designation</th>
                        <th className="border border-gray-300 px-4 py-2">Salary</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                        <th className="border border-gray-300 px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{employee.name || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.bank_account_no || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handleToggleVerification(employee)}
                                    className={`btn btn-sm ${employee.verified_status ? 'btn-warning' : 'btn-success'}`}
                                >
                                    {employee.verified_status ? 'Unverify' : 'Verify'}
                                </button>
                            </td>

                            <td className="border border-gray-300 px-4 py-2">{employee.designation || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.salary || 'N/A'}</td>
                            {/* <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handlePay(employee)}
                                    className="btn btn-sm btn-success"
                                >
                                    PAY
                                </button>
                            </td> */}
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handlePay(employee)}
                                    className={`btn btn-sm ${employee.verified_status ? 'btn-success' : 'btn-gray'}`}
                                    disabled={!employee.verified_status} // Disable button if not verified
                                >
                                    PAY
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    className="btn btn-sm bg-violet-600"
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}
            {isModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-xl font-bold mb-4">Pay Employee</h3>
                        <p className="mb-2"><strong>Name:</strong> {selectedEmployee.name}</p>
                        <p className="mb-2"><strong>Salary:</strong> {selectedEmployee.salary}</p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Month</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter month (e.g., January)"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter year (e.g., 2025)"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleCloseModal}
                                className="btn btn-sm btn-gray"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayAction}
                                className="btn btn-sm btn-success"
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeList;


