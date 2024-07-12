import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './profile';
import SearchAll from './searchAll';
import Chat from './chat';
import ProtectedRoute from "@/components/ProtectedRoute";
import Notifications from '@/components/Notifications';
import MyFriends from '@/components/MyFriends'; // Import the Friends component
import Friends from './friends';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import UpdatePreferences from './updatePreferences';

const Dashboard = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    profile_pic: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [section, setSection] = useState('home'); // Section state to switch between sections
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('preferences'); // State for active tab

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get("http://localhost:5000/api/users/profile");
          setProfile(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  const handleSectionClick = (section) => {
    setSection(section);
    setSidebarOpen(false); // Close the sidebar when a section is selected
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="flex  h-full  bg-white">
        {/* Sidebar */}
        <aside
          className={`fixed z-50 inset-y-0 border-r-2 border-gray-200  left-0 transform ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:static"
          } transition-transform duration-300 ease-in-out w-64 bg-white p-6 lg:relative`}
        >
          <div className="flex items-center justify-between mb-8">
            <img
              src="/logo.png"
              alt="RoomieHub logo"
              className="mb-4 lg:block hidden min-w-[150px] w-1/5"
            />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <CloseIcon className="h-6 w-6 text-black" />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSectionClick("home")}
              >
                <span>🏠</span>
                <span>Home</span>
              </li>
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSectionClick("profile")}
              >
                <span>📄</span>
                <span>Profile</span>
              </li>
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSectionClick("findRoommate")}
              >
                <span>🔍</span>
                <span>Find Roommate</span>
              </li>
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSectionClick("chat")}
              >
                <span>💬</span>
                <span>Chat</span>
              </li>
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSectionClick("settings")}
              >
                <span>⚙️</span>
                <span>Settings</span>
              </li>
              <li
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                <span>🚪</span>
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Hamburger Button */}
        <div className="p-4 pl-6  w-full flex justify-center items-center  bg-white lg:hidden fixed z-40 top-0 left-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon className="h-6 w-6 absolute left-4 top-4 text-black lg:hidden" />
          </button>
          <img
            src="/logo.png"
            alt="RoomieHub logo"
            className=" min-w-[150px] w-1/5"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 items-center md:p-6  md:pt-0 lg:mt-0 mt-[3.4rem]">
          {/* Profile Header */}
          {section === "home" && (
            <div className="">
              {/* Dashboard Content */}
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* My Friends Section */}

                <div className="col-span-1 p-6 h-[97vh] border-r-2 border-gray-200 pr-6 md:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {profile.profile_pic ? (
                        <img
                          src={`data:image/jpeg;base64,${Buffer.from(
                            profile.profile_pic
                          ).toString("base64")}`}
                          alt="Profile"
                          className="w-20 h-20 rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      )}
                      <div>
                        <h2 className="text-xl font-bold">
                          {profile.full_name}
                        </h2>
                        <p className="text-gray-600">Roommate Seeker</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mb-6">
                    <ul className="flex space-x-4">
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === 'preferences' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('preferences')}
                      >
                        Preferences
                      </li>
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === 'editPreferences' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('editPreferences')}
                      >
                        Edit Preferences
                      </li>
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === 'accountSettings' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('accountSettings')}
                      >
                        Account Settings
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    {activeTab === 'preferences' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Preferences</h2>
                        {/* Preferences Content */}
                      </div>
                    )}
                    {activeTab === 'editPreferences' && (
                      <div>
                        <div className='flex w-full'>
                        <UpdatePreferences/>
                        </div>
                      </div>
                    )}
                    {activeTab === 'accountSettings' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                        {/* Account Settings Content */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-1 min-w-[300px]  grid grid-cols-1">
                  <div className="bg-white p-6 pb-0 col-span-1 min-w-[300px]">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg font-bold mb-4">My Friends</h1>
                      <div>
                        <button
                          className="p-2 text-blue-500 rounded-xl text-sm font-semibold  mb-4"
                          onClick={() => handleSectionClick("myfriends")}
                        >
                          View more
                        </button>
                        <ArrowOutwardIcon fontSize='sm' className='text-blue-500' />
                      </div>
                    </div>
                    <MyFriends />
                  </div>
                  {/* Recent Activity */}
                  <div className="bg-white p-6 pt-0 col-span-1 min-w-[300px]">
                    <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                    <ul className="space-y-6">
                      <Notifications currentUser={currentUser} />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {section === "profile" && (
            <div>
              <Profile />
            </div>
          )}
          {section === "findRoommate" && (
            <div>
              <SearchAll />
            </div>
          )}
          {section === "chat" && (
            <div>
              <Chat />
            </div>
          )}
          {section === "settings" && (
            <div>{/* Settings component goes here */}</div>
          )}
          {section === "myfriends" && (
            <div>
              <Friends />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
