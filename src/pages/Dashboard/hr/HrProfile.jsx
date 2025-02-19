import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../providers/AuthProvider";

const HrProfile = () => {
    const { user } = useContext(AuthContext); 
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch('https://team-track-server.vercel.app/users')
                .then(response => response.json())
                .then(data => {
                    const loggedInUser = data.find(emp => emp.email === user.email);
                    setEmployee(loggedInUser);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;

    if (!employee) return <p>No profile found</p>;
    return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Hr Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <img
                src={employee.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Bank Account No:</strong> {employee.bank_account_no}</p>
            <p><strong>Salary:</strong> ${employee.salary}</p>
            <p>
                <strong>Verified Status:</strong>{" "}
                {employee.verified_status ? "Verified" : "Not Verified"}
            </p>
        </div>
    </div>
    );
};

export default HrProfile;