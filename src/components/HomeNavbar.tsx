import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import Notifications from '@/components/Notifications';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HomeNavbar = () => {
  const navbarRef = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > navbarRef.current.offsetTop) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleProfileMenuClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            "http://localhost:5000/api/users/profile"
          );
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

  return (
    <div
      ref={navbarRef}
      className={`w-full ${
        isSticky
          ? "sticky top-0 z-20 bg-[#fff7e4]"
          : "bg-[#fff7e4] max-w-[1540px] rounded-tl-2xl rounded-tr-2xl"
      }`}
    >
      <header className="w-full max-w-[1440px] px-4 lg:px-20 flex items-center justify-between text-right p-4">
        <Link href="/dashboard" passHref>
          <img src="/new-banner-logo.png" className="h-6 lg:h-9" alt="Logo" />
        </Link>
        
        <button
          className="lg:hidden flex text-black"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        
        <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-6">
          <Link href="/searchAll" passHref>
            <IconButton>
              <SearchIcon className='text-black' />
            </IconButton>
          </Link>
          
          <Link href="/friends" passHref>
            <IconButton>
              <PeopleIcon className='text-black' />
            </IconButton>
          </Link>
          
          <Link href="/chat" passHref>
            <IconButton>
              <ChatIcon className='text-black' />
            </IconButton>
          </Link>
          
          <Notifications currentUser={currentUser} />
          
          <div className="flex items-center space-x-4">
            {profile && profile.profile_pic ? (
              <IconButton onClick={handleProfileMenuClick}>
                <img
                  src={`data:image/jpeg;base64,${Buffer.from(
                    profile.profile_pic
                  ).toString("base64")}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </IconButton>
            ) : (
              <p>
                <button className="px-3 py-2 -mr-8 text-lg font-medium text-black bg-none border-black border-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                  Sign in
                </button>
              </p>
            )}
          </div>
          
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/profile" passHref>
                Edit Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/updatePreferences" passHref>
                Edit Preferences
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
          
          
        </nav>
      </header>
      
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute bg-[#fff7e4] p-4 top-14 left-0 right-0 z-30">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              Find a Roommate
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              My Friends
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              Chat
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              Notifications
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              Edit Profile
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              Edit Preferences
            </a>
            <a href="/register">
              <button className="w-full px-3 py-2 text-lg font-medium text-white bg-black border-black border-2 rounded-lg hover:bg-transparent hover:text-black transition-colors duration-300">
                Logout
              </button>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
