import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State for the selected employee
    const [newSalary, setNewSalary] = useState(null); // State for the new salary
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false); // State for salary modal visibility
    const [isFiringModalOpen, setIsFiringModalOpen] = useState(false); // State for firing modal visibility


    // Fetch all employees
    const { data: employees = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data.filter(user => user.verified_status || user.role === 'HR'); // Only show verified users
        },
    });

    // Handle making an employee HR
    const handleMakeHR = async (id) => {
        try {
            await axiosSecure.patch(`/users/${id}/role`, { role: 'HR' });
            refetch(); // Refresh the employee list
            toast.success('Employee promoted to HR successfully.');
        } catch (error) {
            console.error('Error promoting employee:', error);
            toast.error('Failed to promote employee to HR.');
        }
    };

    // Handle firing an employee
    // const handleFireEmployee = async (id) => {
    //     const confirm = window.confirm('Are you sure you want to fire this employee?');
    //     if (confirm) {
    //         try {
    //             await axiosSecure.delete(`/users/${id}`);
    //             refetch(); // Refresh the employee list
    //             alert('Employee fired successfully.');
    //         } catch (error) {
    //             console.error('Error firing employee:', error);
    //             alert('Failed to fire employee.');
    //         }
    //     }
    // };
    // Open salary adjustment modal and set selected employee
    const handleSalaryAdjustment = (employee) => {
        setSelectedEmployee(employee);
        setNewSalary(employee.salary); // Set the current salary in the input field
        setIsSalaryModalOpen(true);
    };

    // Handle salary adjustment logic
    const handleSalarySubmit = async () => {
        if (newSalary <= selectedEmployee.salary) {
            toast.error('Salary must be greater than the current salary.');
            return;
        }

        try {
            const response = await axiosSecure.patch(`/users/${selectedEmployee._id}/salary`, {
                salary: newSalary,
            });

            if (response.status === 200) {
                toast.success('Salary updated successfully.');
                setIsSalaryModalOpen(false); // Close the modal after success
                refetch(); // Refetch data to reflect changes
            }
        } catch (error) {
            toast.error('Failed to update salary.');
            console.error(error);
        }
    };

      // Open firing modal and set selected employee
      const handleFireEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsFiringModalOpen(true);
    };

    // Confirm firing employee
    const confirmFireEmployee = async () => {
        try {
            const response = await axiosSecure.patch(`/users/${selectedEmployee._id}/fire`, {
                fired: true,
            });

            if (response.status === 200) {
                toast.success('Employee fired successfully.');
                setIsFiringModalOpen(false); // Close the modal
                refetch(); // Refresh the employee list
            }
        } catch (error) {
            console.error('Error firing employee:', error);
            toast.error('Failed to fire employee.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">All Employees</h2>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Designation</th>
                        <th className="border border-gray-300 px-4 py-2">Salary</th>
                        <th className="border border-gray-300 px-4 py-2">Make HR</th>
                        <th className="border border-gray-300 px-4 py-2">Fire</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.designation}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handleSalaryAdjustment(employee)}
                                    className="btn btn-sm btn-warning"
                                >
                                    Adjust Salary
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {employee.role !== 'HR' ? (
                                    <button
                                         onClick={() => handleMakeHR(employee._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Promote to HR
                                    </button>
                                ) : (
                                    'Already HR'
                                )}
                            </td>
                            {/* <td className="border border-gray-300 px-4 py-2">
                                <button
                                    // onClick={() => handleFireEmployee(employee._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Fire
                                </button>
                            </td> */}
                            <td className="border border-gray-300 px-4 py-2">
                                {employee.fired ? (
                                    <span className="text-red-500 font-bold">Fired</span>
                                ) : (
                                    <button
                                        onClick={() => handleFireEmployee(employee)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Fire
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Salary Adjustment Modal */}
            {isSalaryModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-xl font-bold mb-4">Adjust Salary</h3>
                        <p className="mb-2"><strong>Name:</strong> {selectedEmployee.name}</p>
                        <p className="mb-2"><strong>Current Salary:</strong> {selectedEmployee.salary}</p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">New Salary</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={newSalary}
                                onChange={(e) => setNewSalary(Number(e.target.value))}
                                placeholder="Enter new salary"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsSalaryModalOpen(false)}
                                className="btn btn-sm btn-gray"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSalarySubmit}
                                className="btn btn-sm btn-success"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
             {/* Firing Confirmation Modal */}
             {isFiringModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-xl font-bold mb-4">Confirm Firing</h3>
                        <p className="mb-4">
                            Are you sure you want to fire <strong>{selectedEmployee.name}</strong>?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsFiringModalOpen(false)}
                                className="btn btn-sm btn-gray"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmFireEmployee}
                                className="btn btn-sm btn-danger"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEmployeeList;
