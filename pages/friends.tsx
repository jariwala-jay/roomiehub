import { useState, useEffect } from 'react';
import axios from 'axios';
import FriendCard from '@/components/FriendCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomeNavbar from '@/components/HomeNavbar';

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact_info: string;
  email: string;
  country: string;
  state: string;
  city: string;
  university: string;
  budget: number;
  veg_nonveg: string;
  other_requirements: string;
}

const Friends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState('');

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
      }
    };

    fetchFriends();
  }, []);

  return (
    <ProtectedRoute>
      <HomeNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">My Friends</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {friends.length === 0 ? (
            <p>No friends found</p>
          ) : (
            friends.map(friend => (
              <FriendCard key={friend.id} user={friend} />
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Friends;
