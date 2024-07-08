import ProtectedRoute from "@/components/ProtectedRoute";
import Notifications from "@/components/Notifications";
import HomeNavbar from "@/components/HomeNavbar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      gsap.from(".card", { opacity: 0, y: 20, duration: 1, stagger: 0.2 });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-r from-[#E2EBF3] via-[#F2F8F3] to-[#FFEBEF]">
        <HomeNavbar handleLogout={handleLogout} />

        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>
            Welcome to your dashboard! Here you can manage your profile, search
            for roommates, and more.
          </p>
          <Notifications currentUser={currentUser} />
          <Link href="/updatePreferences" passHref>
            <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors card">
              Update Preferences
            </p>
          </Link>
          <Link href="/profile" passHref>
            <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors card">
              Update Profile
            </p>
          </Link>
          <Link href="/searchAll" passHref>
            <p className="px-4 mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors card">
              Search for Roommates
            </p>
          </Link>
          <Link href="/friends" passHref>
            <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors card">
              My Friends
            </p>
          </Link>
          <Link href="/chat" passHref>
            <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors card">
              Chat
            </p>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
