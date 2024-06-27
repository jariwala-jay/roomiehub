import { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

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
        console.log(setNotifications);
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

    fetchNotifications();
    fetchRequests();
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
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Failed to respond to request:", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="bg-gray-200 p-2 mb-2 rounded">
              {notification.message}
            </div>
          ))
        )}
      </div>

      {requests.length === 0 ? (
        <p>No new requests</p>
      ) : (
        requests.map((request) => (
          <div key={request.id}>
            <p>{request.senderId} wants to connect</p>
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
        ))
      )}
    </div>
  );
};

export default Notifications;
