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
                        path:"/dashboard/work-sheet",
                        element: <WorkSheet></WorkSheet>
                    },
                    {
                        path:"/dashboard/payment-history",
                        element: <PaymentHistory></PaymentHistory>
                    },
                ]
            },
            
            
            
        ]
    },
]);  