import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Details = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const axiosSecure = useAxiosSecure();
    const [userDetails, setUserDetails] = useState(null); // State to store user details
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosSecure.get(`/users/${id}`);
                setUserDetails(response.data); // Set the user details
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        if (id) {
            fetchUserDetails();
        }
    }, [id, axiosSecure]);

    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (!userDetails) {
        return <div>User not found.</div>;
    }

    // Destructure user details with optional chaining
    const { name, email, photoURL, designation, salary, bank_account_no } = userDetails || {};

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <img
                    src={photoURL || 'https://via.placeholder.com/150'}
                    alt="User"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{name || 'No Name Available'}</h1>
                <p className="text-gray-600 mb-1"><strong>Email:</strong> {email || 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Designation:</strong> {designation || 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Salary:</strong> {salary || 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Bank Account No:</strong> {bank_account_no || 'N/A'}</p>
            </div>
        </div>
    );
};

export default Details;

