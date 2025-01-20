import React, { useState } from 'react';
import { toast } from 'react-toastify';
import usePayment from '../../../hooks/usePayment';

const PaymentHistory = () => {
    const [payments] = usePayment(); // Get payments data using the custom hook
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calculate the range of payments to display
    const indexOfLastPayment = currentPage * rowsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

    // Handle "Load More" button click
    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    // Handle "Previous" button click
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>
            {payments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.month}</td>
                                    <td>{payment.year}</td>
                                    <td>{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={goToPreviousPage}
                            className="btn btn-primary"
                            disabled={currentPage === 1} // Disable on the first page
                        >
                            Previous
                        </button>
                        {indexOfLastPayment < payments.length && (
                            <button
                                onClick={loadMore}
                                className="btn btn-primary"
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center">No payment history found.</p>
            )}
        </div>
    );
};

export default PaymentHistory;





