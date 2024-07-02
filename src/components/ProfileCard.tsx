import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileCard = ({ user, currentUser }) => {
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    // Check if a request is already sent
    const fetchRequestStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests/check', {
          params: { sender_id: currentUser.id, receiver_id: user.id }
        });
        setRequestSent(response.data.exists);
      } catch (error) {
        console.error('Error checking request status:', error);
      }
    };

    fetchRequestStatus();
  }, [currentUser.id, user.id]);

  const handleConnect = async () => {
    try {
      const requestBody = {
        sender_id: currentUser.id,
        receiver_id: user.id,
      };
      console.log('Sending connection request:', requestBody); // Log the request body
      await axios.post('http://localhost:5000/api/requests', requestBody);
      setRequestSent(true);
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16">
          <img
            src={user.profile_pic ? `data:image/jpeg;base64,${Buffer.from(user.profile_pic).toString('base64')}` : "/man.png"}
            alt="User avatar"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
            {user.full_name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <span className="font-medium">Age:</span> {user.age} |{' '}
            <span className="font-medium">Gender:</span> {user.gender}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Contact:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.contact_no}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Email:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            City:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.city}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            University:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.university}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Budget:
          </span>
          <span className="text-gray-700 dark:text-gray-300">${user.budget}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Dietary Preference:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.veg_nonveg}</span>
        </div>
        <div className="flex items-center justify-between">
          {!requestSent ? (
            <button onClick={handleConnect} className="bg-blue-500 text-white p-2 rounded">Connect</button>
          ) : (
            <p>Request Sent</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
