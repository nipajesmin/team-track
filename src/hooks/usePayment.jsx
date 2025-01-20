import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const usePayment = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { refetch, data: payment = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?employeeEmail=${user.email}`);
            // Filter payments based on employeeEmail matching the logged-in user's email
            const filteredPayments = res.data.filter(payment => payment.employeeEmail === user.email);
            
            // Custom sorting by month
            const monthOrder = [
                "january", "february", "march", "april", "may", "june", "july", 
                "august", "september", "october", "november", "december"
            ];

            // Sort payments by month (chronologically), case-insensitive
            return filteredPayments.sort((a, b) => 
                monthOrder.indexOf(a.month.toLowerCase()) - monthOrder.indexOf(b.month.toLowerCase())
            );
        }
    });

    return [payment, refetch];
};

export default usePayment;



