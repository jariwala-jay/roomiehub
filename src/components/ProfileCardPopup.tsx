import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { motion } from "framer-motion";
import {
  LocationOn,
  AccountBalance,
  SmokeFree,
  SmokingRooms,
  NoDrinksRounded,
  LiquorRounded,
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";


interface ProfileCardPopupProps {
  user: {
    full_name: string;
    age: number;
    gender: string;
    city: string;
    university: string;
    budget: number;
    smoker: string;
    drinker: string;
    description: string;
    profile_pic?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileCardPopup: React.FC<ProfileCardPopupProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          borderRadius: "1rem",
        },
      }}
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogContent
        className="p-0 "
        sx={{ padding: 0, bgcolor: "transparent" }}
      >
        <motion.div className="w-full max-w-md mx-auto p-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-lg">
          <div className="bg-white bg-opacity-90 p-4 rounded-2xl">
            <div className="flex relative items-center space-x-4">
              <div className="w-20 h-20">
                <img
                  src={
                    user.profile_pic
                      ? `data:image/jpeg;base64,${Buffer.from(
                          user.profile_pic
                        ).toString("base64")}`
                      : "/man.png"
                  }
                  alt="User avatar"
                  className="w-20 h-20 rounded-full shadow-lg"
                />
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
              <div className="text-left pr-2">
                <h2 className="text-2xl text-gray-900 font-bold">
                  {user.full_name}
                </h2>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Age:</span> {user.age} |{" "}
                  <span className="font-medium">Gender:</span> {user.gender}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-6 items-center border-gray-300 border-[1px] p-4 rounded-lg mb-4">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1">
                  <LocationOn className="text-yellow-500" />
                  <p className="font-bold text-gray-800"> {user.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <AccountBalance className="text-yellow-500" />
                  <p className="text-gray-600 text-sm"> {user.university}</p>
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="text-center space-y-1">
                <p className="font-bold text-gray-800">$ {user.budget}</p>
                <p className="text-gray-600 text-sm">Budget</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex flex-col px-2 items-start justify-between">
                <div className="flex items-center w-full justify-between">
                  <span className="text-gray-800 text-base font-semibold">
                    About:
                  </span>
                  <div>
                    {user.smoker === "no" ? (
                      <SmokeFree className="text-green-500" />
                    ) : (
                      <SmokingRooms className="text-red-500" />
                    )}
                    {user.drinker === "no" ? (
                      <NoDrinksRounded className="text-green-500" />
                    ) : (
                      <LiquorRounded className="text-red-500" />
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{user.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCardPopup;
