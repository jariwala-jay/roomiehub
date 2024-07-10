import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Notifications = ({ currentUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/notifications",
          {
            params: { user_id: currentUser.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } 
    };

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (currentUser && currentUser.id) {
          const response = await axios.get(
            `http://localhost:5000/api/requests/received/${currentUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRequests(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } 
    };

    const fetchData = async () => {
      await Promise.all([fetchNotifications(), fetchRequests()]);
      setLoading(false);
    }

    fetchData();
  }, [currentUser]);

  const handleResponse = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Failed to respond to request:", error);
    }
  };

  return (
    <>
      <ul className="space-y-4">
        {loading ? (
          <>
            <Skeleton height={40} count={5} />
          </>
        ) : notifications.length === 0 && requests.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          <>
            {notifications.slice(0,3).map((notification, index) => (
              <li key={index} className="flex items-center space-x-4">
                {notification.sender && notification.sender.profile_pic ? (
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(notification.sender.profile_pic).toString('base64')}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                )}
                <div>
                  <p className="font-bold">{notification.message}</p>
                  <p className="text-gray-600">{notification.timestamp}</p>
                </div>
              </li>
            ))}
            {requests.map((request) => (
              <li key={request.id} className="flex items-center space-x-4">
                {request.sender && request.sender.profile_pic ? (
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(request.sender.profile_pic).toString('base64')}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                )}
                <div>
                  <p className="font-bold">{request.sender.full_name} wants to connect</p>
                  <p className="text-gray-600">{request.timestamp}</p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleResponse(request.id, "accepted")}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleResponse(request.id, "rejected")}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default Notifications;
