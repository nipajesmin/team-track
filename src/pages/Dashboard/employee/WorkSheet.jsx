import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';


const WorkSheet = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        task: 'Sales',
        hoursWorked: '',
        date: new Date(),
    });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            const fetchTasks = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/tasks?email=${user.email}`);
                    setTasks(response.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };
            fetchTasks();
        }
    }, [user?.email]);




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
            const taskData = { ...formData, email: user.email, date: formData.date.toISOString() };

            try {
                const response = await axios.post('http://localhost:3000/tasks', taskData);

                // Prepend the new task to the tasks array
                setTasks((prevTasks) => [response.data, ...prevTasks]);

                // Reset the form
                setFormData({ task: 'Sales', hoursWorked: '', date: new Date() });
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };




    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
            if (response.status === 200) {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    // const handleEdit = (id) => {
    //     const taskToEdit = tasks.find((task) => task.id === id);
    //     setFormData(taskToEdit);
    //     setTasks(tasks.filter((task) => task.id !== id));
    // };

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
                                    //   onClick={() => handleEdit(task.id)}
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
        </div>
    );
};

export default WorkSheet;
