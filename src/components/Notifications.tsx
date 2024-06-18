import { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (currentUser && currentUser.id) {
          const response = await axios.get(`http://localhost:5000/api/requests/received/${currentUser.id}`);
          setRequests(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const handleResponse = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, { status });
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Failed to respond to request:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {requests.length === 0 ? (
        <p>No new requests</p>
      ) : (
        requests.map(request => (
          <div key={request.id}>
            <p>{request.senderId} wants to connect</p>
            <button onClick={() => handleResponse(request.id, 'accepted')} className="bg-green-500 text-white p-2 rounded">Accept</button>
            <button onClick={() => handleResponse(request.id, 'rejected')} className="bg-red-500 text-white p-2 rounded">Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
