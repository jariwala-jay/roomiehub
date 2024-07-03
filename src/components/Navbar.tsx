import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > navbarRef.current.offsetTop) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={navbarRef}
      className={`flex w-full ${
        isSticky
          ? "sticky"
          : "bg-[#fff7e4] rounded-tl-2xl rounded-tr-2xl w-full"
      }`}
    >
      <header className="w-full  px-20 flex rounded-xl p-4 bg-none">
        <div className="max-w-[1440px] flex items-center justify-between w-full mx-auto">
          <img
            src="/new-banner-logo.png"
            className=" h-9 items-center justify-center"
            alt=""
          />
          <nav className="space-x-12">
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              FIND A ROOMMATE
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              ABOUT
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              GUIDE
            </a>
            <a href="#" className="text-black font-medium hover:text-[#464646]">
              CONTACT
            </a>
            <a href="/login">
              <button className="px-3 py-2 -mr-8 text-lg font-medium text-black bg-none border-black border-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                Sign in
              </button>
            </a>
            <a href="/register">
              <button className="px-3 py-2 border-black border-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-transparent hover:text-black transition-colors duration-300">
                Sign up for free
              </button>
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
