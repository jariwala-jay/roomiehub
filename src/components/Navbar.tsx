import React from 'react'

const Navbar = () => {
  return (
    <div className="flex w-full ">
      <header className="w-full flex rounded-xl p-4 bg-none ">
        <div className="max-w-[1440px] flex justify-between w-full mx-auto">
          <div className="text-2xl font-bold text-black">RoomieHub</div>
          <nav className="space-x-8">
            <a href="#" className="text-black hover:text-[#464646]">
              Find a Roommate
            </a>
            <a href="#" className="text-black hover:text-[#464646]">
              About
            </a>
            <a href="#" className="text-black hover:text-[#464646]">
              Guide
            </a>
            <a href="#" className="text-black hover:text-[#464646]">
              Contact
            </a>

            <a href="/login">
              <button className="px-3 py-1 -mr-6 text-lg  font-medium text-black bg-none border-black border-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                Sign in
              </button>
            </a>
            <a href="/register">
              <button className="px-3 py-1 border-black border-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                Sign up for free
              </button>
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar
