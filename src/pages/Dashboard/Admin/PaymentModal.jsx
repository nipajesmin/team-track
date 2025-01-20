import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentModal = ({ request, onClose, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const totalPrice = request.salary; // Assuming the salary is the price to be paid
    //console.log(totalPrice);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure
                .post("/create-payment-intent", { price: totalPrice })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => {
                    console.error("Error fetching client secret:", err);
                    setError("Failed to initialize payment.");
                });
        }
    }, [axiosSecure, totalPrice]);

    const handlePayment = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            toast.error("Stripe is not loaded yet.");
            return;
        }
    
        setIsProcessing(true);
    
        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card details are invalid.");
            setIsProcessing(false);
            return;
        }
    
        // Create payment method
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {  // Move billing_details here
                email: user?.email || "anonymous",
                name: user?.displayName || "anonymous",
            },
        });
    
        if (paymentError) {
            setError(paymentError.message);
            setIsProcessing(false);
            return;
        }
        else{
          //  console.log('payment method', paymentMethod)
            setError('');
        }
    
        //Confirm the payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,  // Pass the paymentMethod id here
        });
    
        if (confirmError) {
            setError(confirmError.message);
            setIsProcessing(false);
            return;
        }
    
        if (paymentIntent.status === "succeeded") {
          //  console.log('transaction id', paymentIntent.id)
            // Save payment details to the server
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date().toISOString(),
                status: "paid",
                requestId: request._id, // Assuming you want to link this payment to the request
                employeeID: request.employeeId,
                employeeName: request.name,
                employeeEmail: request.employeeEmail,
                month: request.month,
                year: request.year,
            };
    
            try {
                const res = await axiosSecure.post("/payments", payment);
              //  console.log('payment saved',res);
                if (res.data?.paymentResult?.insertedId) {
                    toast.success("Payment successful!");
                    onSuccess(request._id, new Date().toLocaleDateString()); // Notify parent component
                    Swal.fire({  // SweetAlert2 success alert
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    onClose(); // Close the modal
                }
            } catch (error) {
            //    console.error("Error saving payment details:", error);
                setError("Failed to save payment details.");
            }
        }
    
        setIsProcessing(false);
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Pay for {request.name}</h2>
                <p className="mb-2">Salary: ${request.salary}</p>
                <form onSubmit={handlePayment}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Card Details</label>
                        <div className="border border-gray-300 rounded p-2">
                            <CardElement />
                        </div>
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="btn btn-secondary mr-2"
                            onClick={onClose}
                            disabled={isProcessing}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!stripe || isProcessing || !clientSecret}
                        >
                            {isProcessing ? "Processing..." : "Pay"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;

