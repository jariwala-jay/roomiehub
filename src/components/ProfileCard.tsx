import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from "@mui/material/Divider";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import NoDrinksRoundedIcon from "@mui/icons-material/NoDrinksRounded";
import LiquorRoundedIcon from "@mui/icons-material/LiquorRounded";

const ProfileCard = ({ user, currentUser, matchPercentage }) => {
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    // Check if a request is already sent
    const fetchRequestStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests/check', {
          params: { sender_id: currentUser.id, receiver_id: user.id }
        });
        setRequestSent(response.data.exists);
      } catch (error) {
        console.error('Error checking request status:', error);
      }
    };

    fetchRequestStatus();
  }, [currentUser.id, user.id]);

  const handleConnect = async () => {
    try {
      const requestBody = {
        sender_id: currentUser.id,
        receiver_id: user.id,
      };
      console.log('Sending connection request:', requestBody); // Log the request body
      await axios.post('http://localhost:5000/api/requests', requestBody);
      setRequestSent(true);
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-white  rounded-2xl shadow-lg">
      <div className="bg-[#eeeeee] p-2 rounded-xl">
        <div className="flex items-center relative space-x-4">
          <div className="w-16 h-16">
            <img
              src={
                user.profile_pic
                  ? `data:image/jpeg;base64,${Buffer.from(
                      user.profile_pic
                    ).toString("base64")}`
                  : "/man.png"
              }
              alt="User avatar"
              className="w-16 h-16 rounded-lg"
            />
          </div>
          <div className="text-left pr-2">
            <h2 className="text-xl text-gray-900  font-semibold">
              {user.full_name}
            </h2>
            <p className="text-gray-800  text-sm">
              <span className="font-medium">Age:</span> {user.age} |{" "}
              <span className="font-medium">Gender:</span> {user.gender}
            </p>
          </div>
          <div>
            {user.veg_nonveg === "Veg" ? (
              <div className="border-green-500 absolute top-2 right-2 border-2 rounded-sm p-1">
                <div className="bg-green-500 rounded-full min-w-3 h-3"></div>
              </div>
            ) : (
              <div className="border-red-500 absolute top-2 right-2 border-2 rounded-sm p-1">
                <div className="bg-red-500 rounded-full min-w-3 h-3"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4 items-center border-gray-300 border-[1px] p-4 rounded-lg mb-4">
          <div className="text-left space-y-1 ">
            <div className="flex items-center gap-1">
              <LocationOnIcon className="text-base " />
              <p className="font-bold"> {user.city}</p>
            </div>
            <div className="flex items-center gap-1">
              <AccountBalanceIcon className="text-base " />
              <p className="text-gray-600 text-sm"> {user.university}</p>
            </div>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="text-center space-y-1">
            <p className="font-bold">$ {user.budget}</p>
            <p className="text-gray-600 text-sm">Budget</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex flex-col px-2 items-start justify-between">
            <div className="flex items-center w-full justify-between">
              {" "}
              <span className="text-gray-700 text-base  font-semibold">
                About:
              </span>
              <div>
                {" "}
                {user.smoker === "no" ? (
                  <span className="text-gray-700 text-base mr-1  font-semibold">
                    <SmokeFreeIcon />
                  </span>
                ) : (
                  <span className="text-gray-700 text-base mr-1  font-semibold">
                    <SmokingRoomsIcon />
                  </span>
                )}
                {user.drinker === "no" ? (
                  <span className="text-gray-700 text-sm ">
                    <NoDrinksRoundedIcon />
                  </span>
                ) : (
                  <span className="text-gray-700 text-sm ">
                    <LiquorRoundedIcon />
                  </span>
                )}
               
              </div>
            </div>

            <span className="text-gray-700 mt-1 text-sm ">
              {user.description}
            </span>
          </div>
        </div>
      </div>
      <div className="flex mt-2 items-center justify-between">
        {!requestSent ? (
          <button
            onClick={handleConnect}
            className="bg-white text-[#4dc63b] text-sm border-gray-100 border-2 rounded-xl p-1 "
          >
            <PersonAddIcon text="[#4dc63b]" className="mr-2 text-xl" /> Add
            Friend
          </button>
        ) : (
          <p className="bg-gray-100 text-gray-600 text-sm px-2 border-gray-100 border-[1px] rounded-lg p-1">
            <CheckIcon fontSize="2" className="mr-2" />
            Sent
          </p>
        )}
        <p className="text-[#4dc63b] text-sm">
          Match: {matchPercentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
