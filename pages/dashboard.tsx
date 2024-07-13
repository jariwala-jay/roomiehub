import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./profile";
import SearchAll from "./searchAll";
import Chat from "./chat";
import ProtectedRoute from "@/components/ProtectedRoute";
import Notifications from "@/components/Notifications";
import MyFriends from "@/components/MyFriends";
import Friends from "./friends";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import UpdatePreferences from "./updatePreferences";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SuggestedProfilesCarousel from "@/components/SuggestedProfilesCarousel";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [section, setSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState("preferences");
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const fetchProfileAndSuggestedProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            "http://localhost:5000/api/users/profile"
          );
          setProfile(response.data);
          setLoading(false);

          const preferencesResponse = await axios.get(
            "http://localhost:5000/api/users/preferences"
          );
          const prefs = preferencesResponse.data;

          const userBudgetMax = response.data.budget * 1.2;

          const initialSearchCriteria = {
            ...prefs,
            budget_min: 0,
            budget_max: userBudgetMax,
            city: response.data.city || "",
          };

          let searchResponse = await axios.post(
            "http://localhost:5000/api/users/searchAll",
            initialSearchCriteria
          );

          if (searchResponse.data.length === 0) {
            searchResponse = await axios.post(
              "http://localhost:5000/api/users/searchAll",
              {}
            );
          }

          const matchResponse = await axios.post(
            "http://localhost:5000/api/users/match-percentage",
            {
              currentUser: response.data,
              profiles: searchResponse.data,
            }
          );

          setSuggestedProfiles(matchResponse.data);
        }
      } catch (err) {
        setError("Failed to load profile or suggested profiles.");
        setLoading(false);
      }
    };

    fetchProfileAndSuggestedProfiles();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  const handleSectionClick = (section) => {
    setSection(section);
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="flex relative h-full bg-white">
        <aside
          className={`fixed z-50 inset-y-0 border-r-2 border-gray-200 left-0 transform ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:static"
          } transition-transform duration-300 ease-in-out w-64 bg-white p-6 lg:relative`}
        >
          <div className="flex items-center justify-center mb-8">
            <img
              src="/logo.png"
              alt="RoomieHub logo"
              className="mb-4 lg:block hidden min-w-[150px] w-4/5"
            />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <CloseIcon className="h-6 w-6 text-black" />
            </button>
          </div>
          <nav className="h-[82vh] relative">
            <ul className="space-y-2">
              <li
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                  activeSection === "home" ? "font-bold" : ""
                }`}
                onClick={() => handleSectionClick("home")}
              >
                <span>
                  {activeSection === "home" ? (
                    <HomeIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <HomeOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "home" ? "font-semibold" : "font-medium"
                  }`}
                >
                  Home
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                  activeSection === "profile" ? "font-bold" : ""
                }`}
                onClick={() => handleSectionClick("profile")}
              >
                <span>
                  {activeSection === "profile" ? (
                    <PersonIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "profile"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  Profile
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                  activeSection === "findRoommate" ? "font-bold" : ""
                }`}
                onClick={() => handleSectionClick("findRoommate")}
              >
                <span className="">
                  {activeSection === "findRoommate" ? (
                    <SearchIcon
                      sx={{ fontSize: 30, fontWeight: "bold" }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <SearchIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "findRoommate"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  Find Roommate
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                  activeSection === "chat" ? "font-bold" : ""
                }`}
                onClick={() => handleSectionClick("chat")}
              >
                <span>
                  {activeSection === "chat" ? (
                    <ChatIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <ChatOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "chat" ? "font-semibold" : "font-medium"
                  }`}
                >
                  Chat
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                  activeSection === "settings" ? "font-bold" : ""
                }`}
                onClick={() => handleSectionClick("settings")}
              >
                <span>
                  {activeSection === "settings" ? (
                    <SettingsIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <SettingsOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "settings"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  Settings
                </span>
              </li>
              <li
                className="flex absolute bottom-5 items-center space-x-2 w-[95%] rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center w-full py-2 bg-[#333231] transition-colors duration-300 text-white rounded-xl border-r-4 border-b-4 border-[#eeeeee00] hover:border-b-4 hover:border-r-4 hover:border-[#ffc336]">
                  <span>
                    <LogoutIcon className="text-white" />
                  </span>
                  <span className="text-[#ffffff] text-center font-semibold text-xl">
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="p-4 pl-6 w-full flex justify-center items-center bg-white lg:hidden fixed z-40 top-0 left-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon className="h-6 w-6 absolute left-4 top-4 text-black lg:hidden" />
          </button>
          <img
            src="/logo.png"
            alt="RoomieHub logo"
            className="mx-auto min-w-[150px] w-1/5"
          />
        </div>

        <div className="flex-1 items-center md:p-6 md:pl-0 md:pt-0 lg:mt-0 mt-[3.4rem]">
          {section === "home" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                  <div className="mb-6">
                    <ul className="flex space-x-4">
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === "SuggestedRoomies"
                            ? "border-b-2 border-blue-500"
                            : "border-b-2 border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("SuggestedRoomies")}
                      >
                        Suggested Roomies
                      </li>
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === "editPreferences"
                            ? "border-b-2 border-blue-500"
                            : "border-b-2 border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("editPreferences")}
                      >
                        Edit Preferences
                      </li>
                      <li
                        className={`pb-2 cursor-pointer ${
                          activeTab === "accountSettings"
                            ? "border-b-2 border-blue-500"
                            : "border-b-2 border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("accountSettings")}
                      >
                        Account Settings
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6">
                    {activeTab === "SuggestedRoomies" && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">
                          Suggested Roomies
                        </h2>
                        <SuggestedProfilesCarousel
                          profiles={suggestedProfiles}
                          currentUser={currentUser}
                        />
                      </div>
                    )}
                    {activeTab === "editPreferences" && (
                      <div>
                        <div className="flex w-full">
                          <UpdatePreferences />
                        </div>
                      </div>
                    )}
                    {activeTab === "accountSettings" && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">
                          Account Settings
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-1 min-w-[300px] grid grid-cols-1">
                  <div className="bg-white p-6 pb-0 col-span-1 min-w-[300px]">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg font-bold mb-4">My Friends</h1>
                      <div>
                        <button
                          className="p-2 text-blue-500 rounded-xl text-sm font-semibold mb-4"
                          onClick={() => handleSectionClick("myfriends")}
                        >
                          View more
                        </button>
                        <ArrowOutwardIcon
                          fontSize="sm"
                          className="text-blue-500"
                        />
                      </div>
                    </div>
                    <MyFriends />
                  </div>
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
              <SearchAll
                currentUser={currentUser}
                initialProfiles={suggestedProfiles}
              />
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
