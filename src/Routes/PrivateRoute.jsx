import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user ,loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className='flex min-h-screen justify-center items-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>


    }
    if (user && user?.email) {
        return children;
    }
    return (
        <div>
            <Navigate state={{ from: location }} to="/login"></Navigate>
        </div>
    );
};

export default PrivateRoute;