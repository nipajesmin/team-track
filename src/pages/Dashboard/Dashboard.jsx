import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaClipboard, FaHistory, FaUsers, FaUser, FaChartLine, FaList, FaMoneyCheck } from 'react-icons/fa';

const Dashboard = () => {
    const isAdmin = true;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Sidebar and Content Wrapper */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-64 bg-violet-700 text-white shadow-lg">
                    <div className="p-4 text-center font-bold text-xl border-b border-violet-500">
                        Dashboard
                    </div>
                    <ul className="p-4 space-y-4">
                        {!isAdmin ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/admin"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        Admin Route
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/work-sheet"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaClipboard />
                                        Worksheet
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/payment-history"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaHistory />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/employee-list"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaUsers />
                                        Employee List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/details/:id"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaUser />
                                        Employee Details
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/progress"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaChartLine />
                                        Progress
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/all-employee-list"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaList />
                                        All Employee List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/pay-roll"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                                isActive ? 'bg-violet-500' : 'hover:bg-violet-600'
                                            }`
                                        }
                                    >
                                        <FaMoneyCheck />
                                        Payroll
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-6">
                    <Outlet />
                </div>
            </div>

            
        </div>
    );
};

export default Dashboard;

