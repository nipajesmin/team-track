import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {

    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        //  watch,
        formState: { errors },
    } = useForm()

    // Imgbb API key
    //const imgbbApiKey = 'YOUR_IMGBB_API_KEY';


    const onSubmit = async (data) => {
        // console.log("Form Data Submitted:", data);
        setUploading(true);

        const formData = new FormData();
        formData.append('image', data.photo[0]);

        try {
            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            // console.log(result)
            if (result.success) {
                const photoURL = result.data.display_url;

                createUser(data.email, data.password)

                    .then(() => {
                        //   console.log("updated")
                        updateUserProfile({ displayName: data.name, photoURL })
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    role: data.role,
                                    photoURL,
                                    bank_account_no: data.bank_account_no,
                                    salary: data.salary,
                                    designation: data.designation,
                                    verified_status: false, // Default value
                                };


                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            toast.success('Registration successful!', { position: 'top-center' });
                                            reset();
                                            navigate('/');

                                        }
                                    })
                                    .catch(error => toast.error('Failed to save user to database.', { position: 'top-center' }));
                            })
                            .catch(error => toast.error(error.message, { position: 'top-center' }));
                    })
                    .catch(error => toast.error(error.message, { position: 'top-center' }));
            } else {
                toast.error('Image upload failed. Please try again.', { position: 'top-center' });
            }
        } catch (error) {
            toast.error('An error occurred while uploading the image.', { position: 'top-center' });
        } finally {
            setUploading(false);
        }
    };



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
                        {/* <div className="form-control">
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
                        </div> */}
                        {/* Photo Upload Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Photo</span>
                            </label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                accept="image/*"
                                className="file-input file-input-bordered"
                            />
                            {errors.photo && <span className="text-red-600">Photo is required</span>}
                        </div>
                        {/* Role Dropdown */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                {...register('role', { required: true })}
                                className="select select-bordered"
                            >
                                <option value="" disabled selected>
                                    Select your role
                                </option>
                                <option value="Employee">Employee</option>
                                <option value="HR">HR</option>
                            </select>
                            {errors.role && <span className="text-red-600">Role is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bank Account Number</span>
                            </label>
                            <input
                                type="text"
                                {...register("bank_account_no", { required: true })}
                                placeholder="Bank Account Number"
                                className="input input-bordered"
                            />
                            {errors.bank_account_no && <span className="text-red-600">Bank account number is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Salary</span>
                            </label>
                            <input
                                type="number"
                                {...register("salary", { required: true })}
                                placeholder="Salary"
                                className="input input-bordered"
                            />
                            {errors.salary && <span className="text-red-600">Salary is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Designation</span>
                            </label>
                            <input
                                type="text"
                                {...register("designation", { required: true })}
                                placeholder="Designation"
                                className="input input-bordered"
                            />
                            {errors.designation && <span className="text-red-600">Designation is required</span>}
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
                        {/* <div className="form-control mt-6">
                            <button
                                //        onClick={handleGoogleSignIn}
                                type="button"
                                className="btn btn-primary"
                            >
                                Login with Google
                            </button>
                        </div> */}
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