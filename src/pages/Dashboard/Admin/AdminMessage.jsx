import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic'; // Import the custom axios hook

const AdminMessage = () => {
  const [messages, setMessages] = useState([]);
  const axiosPublic = useAxiosPublic(); // Use the custom hook to get the axios instance

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetching the messages from the backend using the custom axios hook
        const response = await axiosPublic.get('/messages');
        setMessages(response.data); // Set the fetched messages into state
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [axiosPublic]); // Dependency array to re-fetch when the axiosPublic instance changes

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages from Visitors</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Message</th>
              
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <tr key={index}>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessage;

