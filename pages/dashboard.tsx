import ProtectedRoute from "@/components/ProtectedRoute";
import Notifications from "@/components/Notifications";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  if (!currentUser) return <div>Loading...</div>;


  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to your dashboard! Here you can manage your profile, search
          for roommates, and more.
        </p>
        <Notifications currentUser={currentUser} />
        <Link
          href={{
            pathname: "/updatePreferences",
            query: currentUser,
          }}
        >
          <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Preferences
          </p>
        </Link>
        <Link
          href={{
            pathname: "/profile",
            query: currentUser,
          }}
        >
          <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Profile
          </p>
        </Link>
        <Link
          href={{
            pathname: "/search",
            query: currentUser,
          }}
        >
          <p className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Search for Roommates
          </p>
        </Link>
        <Link
          href={{
            pathname: "/searchAll",
            query: currentUser,
          }}
        >
          <p className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Search for Roommates
          </p>
        </Link>
        <Link href="/friends">
          <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            My Friends
          </p>
        </Link>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
