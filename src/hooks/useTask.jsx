import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useTask = () =>{

    const {user} =useContext(AuthContext);
    // tan stack query diye load korbo

    const axiosSecure = useAxiosSecure();
    const { refetch, data: task = [] } = useQuery({
        queryKey: ['task', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/tasks?email=${user.email}`)
            // Sort tasks by date (latest first)
            return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    })

    return [task, refetch]

};

export default useTask;

