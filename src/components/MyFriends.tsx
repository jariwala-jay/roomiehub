import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Chat } from '@mui/icons-material'; // Import Chat icon from Material-UI

interface User {
  id: number;
  full_name: string;
  profile_pic: string; // Assuming profile_pic is a URL or base64 encoded image
}

const Friends = ( ) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('http://localhost:5000/api/friends');
          setFriends(response.data);
        }
      } catch (err) {
        setError('Failed to load friends.');
        console.log(err.message);
      } finally {
        setLoadingState(false);
      }
    };

    fetchFriends();
  },[]);

  const openChat = (userId: number) => {
    // Implement your logic to open chat for the given user ID
    console.log(`Opening chat for user with ID ${userId}`);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center  rounded-xl">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="w-full flex flex-col gap-4 ">
          {loading
            ? [1, 2, 3].map((skeleton) => (
                <div
                  key={skeleton}
                  className="bg-white rounded-lg hover:drop-shadow-xl p-2 flex items-center justify-between drop-shadow-md animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                </div>
              ))
            : friends.slice(0, 3).map((friend) => (
                <div
                  key={friend.id}
                  className={`bg-white rounded-lg hover:drop-shadow-xl p-2 flex items-center justify-between drop-shadow-md `}
                >
                  <div className="flex items-center space-x-4">
                    {friend.profile_pic && (
                      <img
                        src={`data:image/jpeg;base64,${Buffer.from(
                          friend.profile_pic
                        ).toString("base64")}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <span className="text-[#333231] font-bold">
                      {friend.full_name}
                    </span>
                  </div>
                  <a className="text-[#333231] hover:text-black" href="/chat">
                    <Chat className="h-6 text-[#333231] w-6" />
                  </a>
                </div>
              ))}
        </div>
        {!loading && friends.length === 0 && (
          <p className="text-gray-500">No friends found.</p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Friends;
