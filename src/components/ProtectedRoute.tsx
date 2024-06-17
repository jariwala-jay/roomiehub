import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:5000/api/users/profile')
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
