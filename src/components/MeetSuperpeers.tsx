import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const handleDragStart = (e: React.DragEvent) => e.preventDefault();

const items = [
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

const MeetSuperpeers: React.FC = () => {
  const renderItems = items.map((item, index) => (
    <div
      key={index}
      className="flex flex-col w-[90%] border-[#3d3d3d] border-2 m-auto  z-10 relative hover:bg-[#2B2B2B] items-center pb-20 mt-20 text-center h-[23rem] mx-4 p-4 rounded-xl"
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

  return (
    <div className="bg-[#1D1D1D] z-0 m-auto max-w-[92%] relative overflow-hidden mx-auto my-20 pb-40 rounded-2xl p-20">
      <img
        src="/roomie-hub-favicon-color.png"
        alt=""
        className="absolute text-white -z-10 h-[180%] -left-20 -top-80 mx-auto  "
      />
      <img
        src="/alt-fixed-size.png"
        className="absolute z-10 h-24 right-[2%] -top-5"
        alt=""
      />
      <img
        src="/fixed-size.png"
        className="absolute  z-10 h-[8rem] right-[8%] top-14"
        alt=""
      />
      <img
        src="/alt-fixed-size.png"
        className="absolute  z-10 h-20 right-[15%] -top-5"
        alt=""
      />
      <h2 className="text-5xl   z-10 font-bold text-white text-left mb-4">
        Meet Roomies
      </h2>
      <p className="text-white   z-10 font-medium text-2xl max-w-[75%] text-left mb-8">
        See how others use Superpeer to connect with the fans, build their
        community, and sell their work.
      </p>
      <AliceCarousel
        mouseTracking
        items={renderItems}
        responsive={{
          0: { items: 1 },
          568: { items: 2 },
          1024: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableDotsControls
        renderPrevButton={() => (
          <button className="absolute  z-10 border-white border-2 -left-12 top-1/2  text-white p-2 pl-[10px] pr-2 rounded-full">
            <ArrowBackIosIcon />
          </button>
        )}
        renderNextButton={() => (
          <button className="absolute border-2  z-10 border-white -right-8 top-1/2 bg- text-white p-2  pr-2 rounded-full">
            <ArrowForwardIosIcon />
          </button>
        )}
      />
    </div>
  );
};

export default MeetSuperpeers;
