import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentModal from './PaymentModal'; // Create this component

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); // Replace with your Stripe publishable key

const PayRoll = () => {
    const [payrollRequests, setPayrollRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handlePay = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    // const handlePaymentSuccess = (requestId, paymentDate) => {
    //     setPayrollRequests((prevRequests) =>
    //         prevRequests.map((req) =>
    //             req._id === requestId ? { ...req, status: 'Paid', paymentDate } : req
    //         )
    //     );
    //     setIsModalOpen(false);
    //     toast.success('Payment successful.');
    // };
    const handlePaymentSuccess = (requestId, paymentDate) => {
        setPayrollRequests((prevRequests) =>
            prevRequests.map((req) =>
                req._id === requestId
                    ? { ...req, status: 'Paid', paymentDate } // Update with actual payment date
                    : req
            )
        );
        setIsModalOpen(false);
        toast.success('Payment successful.');
    };
    

    if (isLoading) {
        return <div>Loading payroll requests...</div>;
    }

    if (isError) {
        return <div>Error fetching payroll requests.</div>;
    }

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
                                        disabled={request.status === 'Paid'}
                                    >
                                        {request.status === 'Paid' ? 'Paid' : 'Pay'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isModalOpen && (
                <Elements stripe={stripePromise}>
                    <PaymentModal
                        request={selectedRequest}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={handlePaymentSuccess}
                    />
                </Elements>
            )}
        </div>
    );
};

export default PayRoll;

