import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className={`w-full ${
        isSticky
          ? "sticky top-0 z-20 bg-[#fff7e4]"
          : "bg-[#fff7e4]    max-w-[1540px] rounded-tl-2xl rounded-tr-2xl"
      }`}
    >
      <header className="w-full max-w-[1440px] px-4 lg:px-20 flex items-center justify-between text-right p-4">
        <img src="/new-banner-logo.png" className="h-6 lg:h-9" alt="" />
        <button
          className="lg:hidden fleex text-black"
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
        <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-12">
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
            <button className="px-3  py-2 text-lg font-medium text-white bg-black border-black border-2 rounded-lg hover:bg-transparent hover:text-black transition-colors duration-300">
              Sign up for free
            </button>
          </a>
        </nav>
      </header>
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute bg-[#fff7e4] p-4   top-14 left-0 right-0 z-30">
          <nav className="flex flex-col space-y-4">
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
              <button className="w-full px-3 py-2 text-lg font-medium text-black bg-none border-black border-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                Sign in
              </button>
            </a>
            <a href="/register">
              <button className="w-full px-3 py-2 text-lg font-medium text-white bg-black border-black border-2 rounded-lg hover:bg-transparent hover:text-black transition-colors duration-300">
                Sign up for free
              </button>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
