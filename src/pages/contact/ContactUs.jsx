import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';  // Import the custom hook

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic(); // Use the custom hook to get the axios instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error('Please provide both email and message!');
      return;
    }

    setLoading(true);

    try {
      // Sending the POST request to save the message using the axiosPublic instance
      const response = await axiosPublic.post('/messages', {
        email,
        message,
      });

      // Show success toast
      toast.success('Your message has been sent successfully!');

      // Clear the form fields after successful submission
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
        <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">We'd love to hear your thoughts, suggestions, or questions!</p>

      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Message</label>
            <textarea
              placeholder="Enter your message"
              className="textarea textarea-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-control">
            <button
              type="submit"
              className={`btn bg-violet-900 text-white ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;


