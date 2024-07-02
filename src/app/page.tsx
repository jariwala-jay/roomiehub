"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState("/hero.jpg");

  const features = {
    feature1: "/hero.jpg",
    feature2: "/hero.jpg",
    feature3: "/hero.jpg",
  };

  const changeImage = (feature) => {
    const imgElement = document.getElementById("featureImage");
    imgElement.classList.remove("scale-100");
    imgElement.classList.add("scale-75");

    setTimeout(() => {
      setCurrentImage(features[feature]);
      imgElement.classList.remove("scale-75");
      imgElement.classList.add("scale-100");
    }, 150);
  };
  return (
    <div className="mx-auto p-[1rem]">
      <Navbar />

      <div
        className="flex flex-col max-w-[2160px] relative w-full relative rounded-xl  mx-auto
       items-center  min-h-screen bg-[#fff7e4]"
      >
        <main className="flex flex-col items-center mt-[5%] text-center px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-7xl max-w-[75%] font-rubik font-bold mb-4 text-gray-800">
              Home to your roommate search and community
            </h1>
            <p className="text-lg max-w-[70%] font-medium text-gray-600 mb-8">
              RoomieHub gives you the tools to find your ideal roommate and
              create the perfect living situation.
            </p>
            <div className="flex space-x-4 mb-40">
              <a href="/register">
                <button className="px-5 py-3 border-black border-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                  Sign up for free
                </button>
              </a>
            </div>
          </div>

          <section className=" absolute -bottom-[20%] max-w-[76%]   w-full text-left bg-white p-8 rounded-lg shadow-lg">
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
                  <div className="p-4 bg-gradient-to-r from-[#FAFAFA] to-[#FBF5E6] border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
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
                  <div className="p-4 bg-gradient-to-r from-[#FAFAFA] to-[#FBF5E6] border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
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
                  <div className="p-4 bg-gradient-to-r from-[#FAFAFA] to-[#FBF5E6] border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
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
                  <div className="p-4 bg-gradient-to-r from-[#FAFAFA] to-[#FBF5E6] border border-gray-200 rounded-lg shadow-sm flex flex-col items-start space-y-4">
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
        </main>
      </div>
      <div className="relative h-[10rem]"></div>
      <div className="flex flex-col rounded-3xl max-w-[90%] mx-auto items-center mt-20 pb-20 justify-center min-h-screen bg-gray-50">
        <main className="flex flex-col items-center mt-16 text-center px-20">
          <div className="grid mb-20 grid-cols-5">
            {" "}
            <h1 className="text-5xl px-3 col-span-3 text-left font-bold mb-6 text-gray-800">
              The eaSiest way t0 find all your rO0m mates in One place
            </h1>
            <p className=" text-2xl font-medium col-span-2 text-left text-gray-600 mb-8">
              Create and sell courses, livestreams, or coach with 1:1s. Manage
              your community, and offer subscriptions to your content.
            </p>
          </div>

          <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white   grid grid-cols-2 pr-6 py-6 gap-4 rounded-lg shadow-lg">
              <div className="relative   overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Beautiful livestreams"
                  className="absolute -left-20 h-full w-[]  rounded-xl"
                />
              </div>
              <div className="-ml-16 ">
                {" "}
                <h3 className="text-2xl text-left  font-semibold text-gray-800 mb-2">
                  Beautiful livestreams
                </h3>
                <p className="text-left text-gray-600">
                  The easiest and most engaging platform to go live with
                  multiple guests and bring your audience on stage. Sell
                  tickets, accept donations, utilize analytics, pre-sales and
                  post-event engagement tools.
                </p>
                <a
                  href="#"
                  className="text-blue-500 text-left hover:underline mt-4 block"
                >
                  Explore more
                </a>
              </div>
            </div>
            <div className="bg-white   grid grid-cols-2 pr-6 py-6 gap-4 rounded-lg shadow-lg">
              <div className="relative   overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Beautiful livestreams"
                  className="absolute -left-20 h-full w-[]  rounded-xl"
                />
              </div>
              <div className="-ml-16 ">
                {" "}
                <h3 className="text-2xl text-left  font-semibold text-gray-800 mb-2">
                  Beautiful livestreams
                </h3>
                <p className="text-left text-gray-600">
                  The easiest and most engaging platform to go live with
                  multiple guests and bring your audience on stage. Sell
                  tickets, accept donations, utilize analytics, pre-sales and
                  post-event engagement tools.
                </p>
                <a
                  href="#"
                  className="text-blue-500 text-left hover:underline mt-4 block"
                >
                  Explore more
                </a>
              </div>
            </div>
            <div className="bg-white   grid grid-cols-2 pr-6 py-6 gap-4 rounded-lg shadow-lg">
              <div className="relative   overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Beautiful livestreams"
                  className="absolute -left-20 h-full w-[]  rounded-xl"
                />
              </div>
              <div className="-ml-16 ">
                {" "}
                <h3 className="text-2xl text-left  font-semibold text-gray-800 mb-2">
                  Beautiful livestreams
                </h3>
                <p className="text-left text-gray-600">
                  The easiest and most engaging platform to go live with
                  multiple guests and bring your audience on stage. Sell
                  tickets, accept donations, utilize analytics, pre-sales and
                  post-event engagement tools.
                </p>
                <a
                  href="#"
                  className="text-blue-500 text-left hover:underline mt-4 block"
                >
                  Explore more
                </a>
              </div>
            </div>
            <div className="bg-white   grid grid-cols-2 pr-6 py-6 gap-4 rounded-lg shadow-lg">
              <div className="relative   overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Beautiful livestreams"
                  className="absolute -left-20 h-full w-[]  rounded-xl"
                />
              </div>
              <div className="-ml-16 ">
                {" "}
                <h3 className="text-2xl text-left  font-semibold text-gray-800 mb-2">
                  Beautiful livestreams
                </h3>
                <p className="text-left text-gray-600">
                  The easiest and most engaging platform to go live with
                  multiple guests and bring your audience on stage. Sell
                  tickets, accept donations, utilize analytics, pre-sales and
                  post-event engagement tools.
                </p>
                <a
                  href="#"
                  className="text-blue-500 text-left hover:underline mt-4 block"
                >
                  Explore more
                </a>
              </div>
            </div>
          </div>

          <section className="w-full  p-8 rounded-lg ">
            <h2 className="text-3xl font-bold mb-4 relative text-gray-800">
              Community{" "}
              <span className="bg-[#faeed0] absolute -top-5 text-black text-sm px-2 py-1 rounded ml-2">
                NEW
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Set up your community page and start building your tribe.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-6">
                <div
                  id="feature1"
                  className="custom-border p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => changeImage("feature1")}
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    Publish posts, collect comments and likes
                  </h4>
                </div>
                <div
                  id="feature2"
                  className="custom-border p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => changeImage("feature2")}
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    Choose who can see and comment on your posts
                  </h4>
                </div>
                <div
                  id="feature3"
                  className="custom-border p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => changeImage("feature3")}
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    The members of your community can meet and connect
                  </h4>
                </div>
              </div>

              <div className="w-full">
                <img
                  id="featureImage"
                  src={currentImage}
                  alt="Community feature screenshot"
                  className="w-full rounded-lg shadow-lg transition-transform duration-300 scale-100"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
      <div>
        <section className=" p-20  py-40 relative flex items-center justify-center">
          <div className="max-w-screen-lg mx-auto text-center relative z-10">
            <h2 className="text-7xl font-bold mb-14 text-gray-800">
              Become a Roomie
            </h2>
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-3 text-lg border mr-4 rounded-md mb-4"
            />
            <a
              href="/register"
              className="inline-block px-8 py-3 text-lg font-medium border-[#eeeeee00] border-r-4 text-black bg-[#FFE095] rounded-lg hover:bg-gradient-to-r hover:border-b-4 hover:border-r-4 hover:border-[#ffc336] transition-colors duration-300"
            >
              Sign up for free
            </a>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-radial from-white to-yellow-100 rounded-full p-60 px-[800px]"></div>
          </div>
        </section>

        <footer className="w-full py-6 bg-[#FFE095] mt-12 rounded-bl-2xl rounded-br-2xl">
          <div className="text-center text-black text-sm">
            © 2024 RoomieHub. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4 mt-2 text-black text-sm">
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
