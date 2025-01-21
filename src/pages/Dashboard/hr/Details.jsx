import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import usePayment from '../../../hooks/usePayment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const Details = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [payment] = usePayment(userDetails.email);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosSecure.get(`/users/${id}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false);
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

    const { name, email, photoURL, designation } = userDetails || {};

    // Transform payment data for the bar chart
    const chartData = payment.map((item) => ({
        month: `${item.month?.toUpperCase()}`,
        salary: item.price ? parseFloat(item.price) : 0,
    }));

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mb-8">
                <img
                    src={photoURL || 'https://via.placeholder.com/150'}
                    alt="User"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{name || 'No Name Available'}</h1>
                <p className="text-gray-600 mb-1"><strong>Email:</strong> {email || 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Designation:</strong> {designation || 'N/A'}</p>
            </div>
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Salary vs. Month</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                        domain={[0, 20000]} 
                        tickFormatter={(value) => `$${value}`} 
                    /> {/* Show prices on the Y-axis */}
                    <Bar
                        dataKey="salary"
                        fill="#8884d8"
                        label={{ position: 'top' }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default Details;


