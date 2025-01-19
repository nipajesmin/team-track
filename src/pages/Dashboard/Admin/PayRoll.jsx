import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayRoll = () => {
    const [payrollRequests, setPayrollRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchPayrollRequests = async () => {
            try {
                const response = await axiosSecure.get('/payroll-requests');
                setPayrollRequests(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching payroll requests:', error);
                toast.error('Failed to fetch payroll requests.');
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchPayrollRequests();
    }, [axiosSecure]);

    if (isLoading) {
        return <div>Loading payroll requests...</div>;
    }

    if (isError) {
        return <div>Error fetching payroll requests.</div>;
    }

    const handlePay = async (request) => {
        try {
            const response = await axiosSecure.patch(`/payroll-requests/${request._id}`, {
                paymentDate: new Date().toISOString(),
            });
    
            if (response.status === 200) {
                toast.success('Payment successful.');
                setPayrollRequests((prevRequests) =>
                    prevRequests.map((req) =>
                        req._id === request._id ? { ...req, paymentDate: new Date().toISOString() } : req
                    )
                );
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Failed to process payment.');
        }
    };
    
    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Pending Payroll Requests</h2>
            {payrollRequests.length === 0 ? (
                <div>No pending payroll requests.</div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Salary</th>
                            <th className="border border-gray-300 px-4 py-2">Month</th>
                            <th className="border border-gray-300 px-4 py-2">Year</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrollRequests.map((request) => (
                            <tr key={request._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.salary}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.month}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.year}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {request.paymentDate || 'Not Paid'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handlePay(request)}
                                        disabled={!!request.paymentDate} // Disable if already paid
                                    >
                                        {request.paymentDate ? 'Paid' : 'Pay'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PayRoll;
