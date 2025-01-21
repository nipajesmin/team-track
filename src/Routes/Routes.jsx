import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import WorkSheet from "../pages/Dashboard/employee/WorkSheet";
import PaymentHistory from "../pages/Dashboard/employee/PaymentHistory";
import EmployeeList from "../pages/Dashboard/hr/EmployeeList";
import Progress from "../pages/Dashboard/hr/Progress";
import AllEmployeeList from "../pages/Dashboard/Admin/AllEmployeeList";
import PayRoll from "../pages/Dashboard/Admin/PayRoll";
import AdminRoute from "./AdminRoute";
import Details from "../pages/Dashboard/hr/Details";
import PaymentModal from "../pages/Dashboard/Admin/PaymentModal";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ContactUs from "../pages/contact/ContactUs";
import AdminMessage from "../pages/Dashboard/Admin/AdminMessage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"/",
                element: <Home></Home>
            },
            {
                path:"/login",
                element: <Login></Login>
            },
            {
                path:"/register",
                element: <Register></Register>
            },
            {
                path:"/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children:[
                    {
                        path:"/dashboard",
                        element: <AdminHome></AdminHome>
                    },
                    {
                        path:"/dashboard/work-sheet",
                        element: <WorkSheet></WorkSheet>
                    },
                    {
                        path:"/dashboard/payment-history",
                        element: <PaymentHistory></PaymentHistory>
                    },
                    {
                        path:"/dashboard/employee-list",
                        element: <EmployeeList></EmployeeList>
                    },
                    {
                        path:"/dashboard/progress",
                        element: <Progress></Progress>
                    },
                    {
                        path:"/dashboard/all-employee-list",
                        element: <AdminRoute><AllEmployeeList></AllEmployeeList></AdminRoute>
                    },
                    {
                        path:"/dashboard/pay-roll",
                        element: <AdminRoute><PayRoll></PayRoll></AdminRoute>
                    },
                    {
                        path:"/dashboard/details/:id",
                        element: <Details></Details>
                    },
                    {
                        path:"/dashboard/payroll/payment-modal",
                        element: <PaymentModal></PaymentModal>
                    },
                    {
                        path:"/dashboard/allMessages",
                        element: <AdminMessage></AdminMessage>
                    },
                ]
            },
            
            {
                path:"contactUs",
                element:<ContactUs></ContactUs>
            }
            
            
        ]
    },
]);  