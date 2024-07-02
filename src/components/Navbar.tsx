import React from 'react'

const Navbar = () => {
  return (
    <div className="flex w-full ">
      <header className="w-full px-20 flex rounded-xl p-4 bg-none ">
        <div className="max-w-[1440px] flex justify-between w-full mx-auto">
          <div className="text-2xl font-bold text-black">RoomieHub</div>
          <nav className="space-x-12">
            
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              FIND A ROOMMATE
            </a>
            <a
              href="#"
              className="text-black font-medium  hover:text-[#464646]"
            >
              ABOUT
            </a>
            <a
              href="#"
              className="text-black font-medium  hover:text-[#464646]"
            >
              GUIDE
            </a>
            <a
              href="#"
              className="text-black font-medium  hover:text-[#464646]"
            >
              CONTACT
            </a>

            <a href="/login">
              <button className="px-3 py-2 -mr-8 text-lg  font-medium text-black bg-none border-black border-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                Sign in
              </button>
            </a>
            <a href="/register">
              <button className="px-3 py-2 border-black border-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
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
