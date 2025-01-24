import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from './GoogleLogin';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Login = () => {
    const { signInUser, setUser, signInWithGoogle , signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const from = location.state?.from?.pathname || "/";
    // Fetch all employees using useQuery
    const { data: employees = [], isLoading, isError, error } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data.filter(user => user.verified_status || user.role === 'HR'); // Only show verified users
        },
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     signInUser(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             setUser(user);

    //             // Show success toast
    //             toast.success('Login successful!', { position: 'top-center' });

    //             // Navigate after showing toast
    //             setTimeout(() => {
    //                 navigate(from, { replace: true });
    //             }, 2000); // Delay navigation by 2 seconds
    //         })
    //         .catch(error => {
    //             // Show error toast
    //             toast.error(error.message || 'Login failed!', { position: 'top-center' });
    //             // console.log('ERROR:', error.code, error.message);
    //             const errorMessage = error.message;
    //         });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signInUser(email, password);
            const user = result.user;
            

            // Check if the user is fired
            const loggedInUser = employees.find(emp => emp.email === user.email);

            if (loggedInUser && loggedInUser.fired) {
                // If the user is fired, log them out and show an error message
                toast.error('Access denied. User is fired.', { position: 'top-center' });
                // Log out the user
                await signOutUser(); 
                return;
            }

            setUser(user);
            // Show success toast
            toast.success('Login successful!', { position: 'top-center' });

            // Navigate after showing toast
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 2000); 
        } catch (error) {
            toast.error(error.message || 'Login failed!', { position: 'top-center' });
        }
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                //  console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                //  console.log('ERROR', error.message)
                const errorMessage = error.message;
            })
    }

    return (
        <div>
            <ToastContainer />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form
                            onSubmit={handleSubmit}
                            className="card-body">
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />

                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="bg-violet-900 text-white btn"
                                // disabled={loading}
                                >
                                    {/* {loading ? 'Logging in...' : 'Login'} */}
                                    Sign In
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                {/* <button
                                     onClick={handleGoogleSignIn}
                                    type="button"
                                    className="bg-violet-900 text-white btn"
                                // disabled={loading}
                                >
                                    Sign in with Google
                                </button> */}
                                <GoogleLogin></GoogleLogin>
                            </div>

                            <p className="text-sm text-center mt-2">
                                Don’t have an account?{' '}
                                <Link to="/register" className="link link-primary">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Login;