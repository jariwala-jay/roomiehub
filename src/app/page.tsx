"use client"
import Image from "next/image";

export default function Home() {
  return (
   <>
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Welcome to Roommate Finder</h1>
      <div className="flex space-x-4">
        <a href="/login">
          <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Login
          </button>
        </a>
        <a href="/register/basic">
          <button className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300">
            Register
          </button>
        </a>
      </div>
    </div>
   </>
  );
}
