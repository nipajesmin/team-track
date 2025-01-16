import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { createUser,updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        //  watch,
        formState: { errors },
    } = useForm()

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                //  console.log(result.user);
                const loggedUser = result.user;
                console.log(loggedUser)
                toast.success('Registration successful!', { position: 'top-center' });
                 updateUserProfile({ displayName: data.name, photoURL: data.url })
                     .then(() => {
                        reset();
                         setTimeout(() => {
                             navigate('/');
                         }, 3000);
                     })
                    .catch(error => {
                             toast.error(error.message, { position: 'top-center' });
                    });
            })

    }
    return (
        <div>

            <ToastContainer />
            <h1 className="text-3xl md:text-5xl font-bold pb-5 pt-4 bg-base-200 text-center">
                Register Now!
            </h1>

            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        //  onSubmit={handleRegister}
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="name"
                                className="input input-bordered"
                            // required
                            />
                            {errors.name && <span className='text-red-600'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                            // required
                            />
                            {errors.email && <span className='text-red-600'>Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                {...register("url", { required: true })}
                                name="url"
                                placeholder="Photo URL"
                                className="input input-bordered"
                              //  required
                            />
                            {errors.url && <span className='text-red-600'>url is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                                            message: "Password must contain at least one capital letter and one special character"
                                        }
                                    })}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered w-full"
                                />
                                {errors.password && (
                                    <span className='text-red-600'>{errors.password.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type='submit' value="Register" />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                //        onClick={handleGoogleSignIn}
                                type="button"
                                className="btn btn-primary"
                            >
                                Login with Google
                            </button>
                        </div>
                    </form>
                    <p className="ml-4 mb-4 pl-12">
                        Already have an account? Please <Link to="/signin" className="text-blue-600">SignIn</Link>
                    </p>
                </div>
            </div>
        </div>


    );
};

export default Register;