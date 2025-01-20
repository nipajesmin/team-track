import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useHR = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isHR = false, isLoading: isHRLoading } = useQuery({
        queryKey: [user?.email, 'isHR'],
        enabled: !!user?.email && !loading, // Ensure the query only runs if user is loaded and has an email
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            return res.data?.hr; // Adjust the property based on your API response
        },
    });

    return [isHR, isHRLoading];
};

export default useHR;
