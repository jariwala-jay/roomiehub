import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const itemsData = [
  {
    name: "Joe Cornelius",
    description: "Artist and independent art teacher.",
    youtubeFollowers: "316K",
    image: "/client-1.jpg",
    platformIcon: "/path/to/youtube-icon.png",
  },
  {
    name: "Tolupe Solutions",
    description: "A faith-based space for mentorship.",
    instagramFollowers: "126K",
    otherFollowers: "109K",
    image: "/client-2.jpg",
    platformIcon: "/path/to/instagram-icon.png",
  },
  {
    name: "This is Englishing",
    description: "Let the English adventure begin!",
    instagramFollowers: "112K",
    otherFollowers: "9.7K",
    image: "/client-3.jpg",
    platformIcon: "/path/to/instagram-icon.png",
  },
];

const handleDragStart = (e: React.DragEvent) => e.preventDefault();

const MeetSuperpeers: React.FC = () => {
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const renderItems = itemsData.map((item, index) => (
      <div
        key={index}
        className="flex flex-col  sm:w-[90%] bg-[#2B2B2B] sm:bg-transparent border-[#3d3d3d] border-2 m-auto  z-10 relative hover:bg-[#2B2B2B] items-center pb-20 mt-20 text-center h-[23rem] sm:mx-4 p-4 rounded-xl"
        onDragStart={handleDragStart}
        role="presentation"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-[11rem] h-[11rem] rounded-full mb-4 object-cover"
        />
        <h3 className="text-white font-bold text-xl">{item.name}</h3>
        <p className="text-gray-400">{item.description}</p>
        <div className="flex items-center justify-center space-x-2 mt-2">
          {/* <img src={item.platformIcon} alt="platform icon" className="w-5 h-5" /> */}
          <span className="text-gray-400">{item.youtubeFollowers}</span>
          <span className="text-gray-400">{item.instagramFollowers}</span>
        </div>
        <button className="mt-4 absolute bottom-6 px-4 py-2 border-white border-2 text-white font-lg rounded-lg">
          View Profile
        </button>
      </div>
    ));
    setItems(renderItems);
  }, []);

  return (
    <div className="bg-[#1D1D1D] z-0 m-auto max-w-[90%]    relative overflow-hidden mx-auto my-20 pb-40 rounded-2xl p-10 pt-20 sm:p-20">
      <img
        src="/roomie-hub-favicon-color.png"
        alt=""
        className="absolute text-white -z-10 h-[180%] -left-20 -top-80 mx-auto  "
      />
      <img
        src="/alt-fixed-size.png"
        className="absolute z-10 h-12 sm:h-24 right-[2%] -top-3 sm:top-[-20px]"
        alt=""
      />
      <img
        src="/fixed-size.png"
        className="absolute  z-10 h-[50px] sm:h-[8rem] right-[11%] sm:right-[8%] top-4 sm:top-14"
        alt=""
      />
      <img
        src="/alt-fixed-size.png"
        className="absolute  z-10 h-10 sm:h-20 right-[18%] sm:right-[15%] -top-5"
        alt=""
      />
      <h2 className="text-4xl sm:text-5xl   z-10 font-bold text-white text-center sm:text-left mb-4">
        Meet Roomies
      </h2>
      <p className="text-white   z-10 font-medium text-xl sm:text-2xl sm:max-w-[75%] text-center sm:text-left mb-0 sm:mb-8">
        See how others use Superpeer to connect with the fans, build their
        community, and sell their work.
      </p>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          400: { items: 1 },
          568: { items: 2 },
          1024: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableDotsControls
        renderPrevButton={() => (
          <button className="absolute  z-10 border-white border-2 left-[33%] sm:left-[-3rem] sm:top-1/2  text-white p-2 pl-[10px] pr-2 rounded-full">
            <ArrowBackIosIcon />
          </button>
        )}
        renderNextButton={() => (
          <button className="absolute border-2  z-10 border-white right-[33%] sm:right-[-3rem] sm:top-1/2 bg- text-white p-2  pr-2 rounded-full">
            <ArrowForwardIosIcon />
          </button>
        )}
      />
    </div>
  );
};

export default MeetSuperpeers;
