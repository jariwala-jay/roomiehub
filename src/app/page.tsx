"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <header className="w-full p-4 bg-gradient-to-r from-[#7B68EE] to-gray-900 shadow-md">
          <div className="max-w-[1440px] flex justify-between w-full mx-auto">
            <div className="text-2xl font-bold text-white">RoomieHub</div>
            <nav className="space-x-4">
              <a href="#" className="text-gray-200 hover:text-white">
                Find a Roommate
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main className="flex flex-col items-center mt-16 text-center px-4">
          <div className="flex flex-col items-center">
            {" "}
            <h1 className="text-5xl font-bold mt-[8rem] mb-4 text-gray-800">
              Find Your Perfect Roommate
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              RoomieHub is the easiest way to find compatible roommates and
              create your dream living situation.
            </p>
            <div className="flex space-x-4 mb-40">
              <a href="/login">
                <button className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition-colors duration-300">
                  Login
                </button>
              </a>
              <a href="/register">
                <button className="px-6 py-3 text-lg font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  Register
                </button>
              </a>
            </div>
          </div>

          <section className="max-w-[1440px] w-full text-left bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="my-auto flex-col">
                <h2 className="text-md font-bold text-gray-800">
                  How it Works
                </h2>
                <h3 className="text-4xl font-bold text-gray-800 mb-4">
                  Streamline Your Roommate Search
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  RoomieHub makes it easy to find compatible roommates and
                  create your ideal living situation. Our platform connects you
                  with like-minded individuals, simplifying the process of
                  finding the perfect match.
                </p>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
                    <div className="text-purple-500">
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
                          strokeWidth={2}
                          d="M8 16h.01M12 16h.01M16 16h.01M21 16.88V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.12a2 2 0 01.74-1.6l.3-.23c1.54-1.1 2.78-2.45 3.68-4.02A4.992 4.992 0 0112 5a4.992 4.992 0 014.28 2.03c.9 1.57 2.14 2.92 3.68 4.02l.3.23c.58.44.74 1.16.74 1.6z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Search for Roommates
                      </h4>
                      <p className="text-gray-600">
                        Browse our extensive database of verified roommate
                        profiles to find your perfect match.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
                    <div className="text-purple-500">
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
                          strokeWidth={2}
                          d="M12 11c.667-1.333 1-2.667 1-4a6 6 0 00-6-6M18 11c-.667-1.333-1-2.667-1-4a6 6 0 00-6-6M21 16v5a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5a2 2 0 012-2h4a2 2 0 012 2zM9 16v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h4a2 2 0 012 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Connect with Ease
                      </h4>
                      <p className="text-gray-600">
                        Communicate with potential roommates through our secure
                        messaging platform.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
                    <div className="text-purple-500">
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
                          strokeWidth={2}
                          d="M9.75 17L3 12l6.75-5v10zm5.5-10L21 12l-6.75 5V7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Find Your New Home
                      </h4>
                      <p className="text-gray-600">
                        Discover available rooms and apartments that match your
                        preferences.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
                    <div className="text-purple-500">
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
                          strokeWidth={2}
                          d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m-4-4v-4a4 4 0 10-8 0v4M6 17v2a2 2 0 002 2h8a2 2 0 002-2v-2m4-4v-4a4 4 0 10-8 0v4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Streamline the Process
                      </h4>
                      <p className="text-gray-600">
                        Manage your roommate search and move-in process all in
                        one place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-20 py-8">
            <div className="max-w-screen-lg mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Ready to Find Your Ideal Roommate?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Join RoomieHub today and take the first step towards creating
                your perfect living arrangement.
              </p>
              <a
                href="/register"
                className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </section>
        </main>

        <footer className="w-full py-6 bg-gradient-to-r from-[#7B68EE] to-gray-900 mt-12">
          <div className="text-center text-white text-sm">
            © 2024 RoomieHub. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4 mt-2 text-white text-sm">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              FAQ
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
