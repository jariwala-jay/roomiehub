import ProtectedRoute from "@/components/ProtectedRoute";
import Link from 'next/link';



const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to your dashboard! Here you can manage your profile, search
          for roommates, and more.
        </p>
        <Link href="/updatePreferences">
          <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Preferences
          </p>
        </Link>
        <Link href="/profile">
          <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Profile
          </p>
        </Link>
        <Link href="/search">
            <p className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Search for Roommates
            </p>
          </Link>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
