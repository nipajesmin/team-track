import { useContext } from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';

const useUserRole = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email, // Fetch only if email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data; // The full user object
        },
    });

    return { role: userData?.role || 'Employee', isLoading };
};

export default useUserRole;

