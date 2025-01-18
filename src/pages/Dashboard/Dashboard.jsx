import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    const isAdmin = true;
    
    return (
        <div className='flex'>
           <div className='w-64 min-h-full bg-violet-600 text-white'>
            <ul className='p-4'>
                {
                    !isAdmin? <>
                 
                    <li><NavLink to="/dashboard/admin">admin route</NavLink></li>
                    </>
                    :
                    <>
                    <li><NavLink to="/dashboard/work-sheet">Worksheet</NavLink></li>
                    <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
                    </>
                }
            </ul>
           </div>
           <div className='flex-1'>
            <Outlet></Outlet>
           </div>
        </div>
    );
};

export default Dashboard;