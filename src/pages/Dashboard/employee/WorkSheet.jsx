import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTask from '../../../hooks/useTask';


const WorkSheet = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [tasks, refetch] = useTask();

    //  const [tasks, setTasks] = useState([]);
    //  const [,refetch] = useTask();
    const [formData, setFormData] = useState({
        task: 'Sales',
        hoursWorked: '',
        date: new Date(),
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);

    // useEffect(() => {
    //     if (user?.email) {
    //         const fetchTasks = async () => {
    //             try {
    //                 const response = await axios.get(http://localhost:3000/tasks?email=${user.email});
    //                 setTasks(response.data);
    //             } catch (error) {
    //                 console.error('Error fetching tasks:', error);
    //             }
    //         };
    //         fetchTasks();
    //     }
    // }, [user?.email]);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.hoursWorked) {
            const taskData = { 
                ...formData, 
                email: user.email, 
                name: user.displayName || "Anonymous", // Include the user's name
                date: formData.date.toISOString() 
            };
    
            try {
                await axiosSecure.post('tasks', taskData);
    
                // Reset the form
                setFormData({ task: 'Sales', hoursWorked: '', date: new Date() });
    
                // Trigger refetch to reload tasks
                refetch();
            } catch (error) {
              //  console.error('Error adding task:', error);
            }
        }
    };
    





    const handleDelete = async (id) => {
        try {
            const response = await axiosSecure.delete(`/tasks/${id}`);
            if (response.status === 200) {
                refetch(); // Refetch tasks after deletion
            }
        } catch (error) {
          //  console.error('Error deleting task:', error);
        }
    };


    // const handleEdit = (id) => {
    //     const taskToEdit = tasks.find((task) => task.id === id);
    //     setFormData(taskToEdit);
    //     setTasks(tasks.filter((task) => task.id !== id));
    // };

    const openEditModal = (task) => {
        setEditTask(task);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setEditTask(null);
    };

    // const handleEditSubmit = async (e) => {
    //     e.preventDefault();
    //     const updatedTask = { ...editTask, date: editTask.date.toISOString() };
    //     try {
    //         await axiosSecure.put(`/tasks/${editTask._id}`, updatedTask);
    //         closeEditModal();
    //         refetch();
    //     } catch (error) {
    //         console.error('Error updating task:', error);
    //     }
    // };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const updatedTask = {
            ...editTask,
            date: new Date(editTask.date).toISOString(), // Convert to ISO string
        };
    
      //  console.log('Updated Task:', updatedTask); // Debug log
    
        try {
            const response = await axiosSecure.put(`/tasks/${editTask._id}`, updatedTask);
          //  console.log('Update Response:', response); // Debug log
            closeEditModal();
            refetch();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    
    

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTask({ ...editTask, [name]: value });
    };

    // const handleEditDateChange = (date) => {
    //     setEditTask({ ...editTask, date });
    // };

    const handleEditDateChange = (date) => {
        setEditTask({ ...editTask, date: new Date(date) });
    };
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex gap-4 items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-md"
            >
                {/* Task Dropdown */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tasks</span>
                    </label>
                    <select
                        name="task"
                        value={formData.task}
                        onChange={handleInputChange}
                        className="select select-bordered"
                    >
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Content">Content</option>
                        <option value="Paper-work">Paper-work</option>
                    </select>
                </div>
                {/* Hours Worked */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hours Worked</span>
                    </label>
                    <input
                        type="number"
                        name="hoursWorked"
                        value={formData.hoursWorked}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        placeholder="Hours"
                    />
                </div>
                {/* Date Picker */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        className="input input-bordered"
                        dateFormat="yyyy-MM-dd"
                    />

                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-6 bg-violet-900">
                    Add
                </button>
            </form>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Task</th>
                        <th className="border border-gray-300 px-4 py-2">Hours Worked</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (

                        <tr key={task._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{task.task}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.hoursWorked}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {/* {new Date(task.date).toLocaleDateString('en-US')} */}
                                {task.date ? new Date(task.date).toLocaleDateString('en-US') : 'Invalid Date'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    //  onClick={() => handleEdit(task.id)}
                                    onClick={() => openEditModal(task)}
                                    className="btn btn-sm btn-warning mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)} // Use _id from MongoDB
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal modal-open"> {/* Add 'modal-open' */}
                    <div className="modal-box">
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task</span>
                                </label>
                                <select
                                    name="task"
                                    value={editTask.task}
                                    onChange={handleEditChange}
                                    className="select select-bordered"
                                >
                                    <option value="Sales">Sales</option>
                                    <option value="Support">Support</option>
                                    <option value="Content">Content</option>
                                    <option value="Paper-work">Paper-work</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Hours Worked</span>
                                </label>
                                <input
                                    type="number"
                                    name="hoursWorked"
                                    value={editTask.hoursWorked}
                                    onChange={handleEditChange}
                                    className="input input-bordered"
                                    placeholder="Hours"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <DatePicker
                                    selected={new Date(editTask.date)}
                                    onChange={handleEditDateChange}
                                    className="input input-bordered"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="btn btn-secondary"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default WorkSheet;

