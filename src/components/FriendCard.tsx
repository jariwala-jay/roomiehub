import React from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  full_name: string;
  age: number;
  gender: string;
  contact_no: string;
  email: string;
  country: string;
  state: string;
  city: string;
  university: string;
  budget: number;
  veg_nonveg: string;
  description: string;
}

const FriendCard: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const handleChat = () => {
    router.push({
      pathname: "/chat",
      query: { userId: user.id, userName: user.full_name },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16">
          <img src="/man.png" alt="User avatar" />
        </div>
        <div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
            {user.full_name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <span className="font-medium">Age:</span> {user.age} |{" "}
            <span className="font-medium">Gender:</span> {user.gender}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Contact:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.contact_no}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Email:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Country:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.country}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            State:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.state}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            City:
          </span>
          <span className="text-gray-700 dark:text-gray-300">{user.city}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            University:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.university}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Budget:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            ${user.budget}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Dietary Preference:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.veg_nonveg}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Description:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {user.description}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleChat}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
