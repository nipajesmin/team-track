import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const GoogleLogin = () => {
    const { signInWithGoogle, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                // const userInfo = {
                //     name: result.user?.displayName, 
                //     email: result.user?.email,
                //     role: 'Employee',
                //     photoURL: result.user?.photoURL, // Image URL from imgbb
                   
                // };
                const userInfo = {
                    name: result.user?.displayName || 'No Name',
                    email: result.user?.email || 'No Email',
                    role: 'Employee',
                    photoURL: result.user?.photoURL || 'No Photo',
                    bankAccountNumber: 'Not Provided',
                    designation: 'Not Assigned',
                    salary: 0, // Default salary
                    verified_status: false,
                };
                
                axiosPublic.post('/users', userInfo)
                .then(res =>{

                    setUser(user);

                // Show success toast
                toast.success('Google login successful!', { position: 'top-center' });

                // Navigate after successful login
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                })
                .catch(error => {
                    // Handle backend errors
                    toast.error('Failed to save user data!', { position: 'top-center' });
                    console.error(error);
                });
                
            })
            .catch(error => {
                // Show error toast
                toast.error(error.message || 'Google login failed!', { position: 'top-center' });
            });
    };
    return (
        <button
            onClick={handleGoogleSignIn}
            type="button"
            className="bg-violet-900 text-white btn"
        >
            Sign in with Google
        </button>
    );
};

export default GoogleLogin;