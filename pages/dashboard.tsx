import ProtectedRoute from '@/components/ProtectedRoute';
import Profile from './profile';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard! Here you can manage your profile, search for roommates, and more.</p>
        <Profile/>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
