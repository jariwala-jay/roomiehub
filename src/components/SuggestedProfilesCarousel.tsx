import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ProfileCard from "@/components/ProfileCard";


const SuggestedProfilesCarousel = ({ profiles, currentUser }) => {
  const topProfiles = profiles
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 6);

  const items = topProfiles.map((profile) => (
    <div key={profile.id} className="item">
      <ProfileCard
        user={profile}
        currentUser={currentUser}
        matchPercentage={profile.matchPercentage}
      />
    </div>
  ));

  return (
    <div className="w-full my-6">
      <h2 className="text-2xl font-bold mb-4">Top Matches</h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 3 },
          568: { items: 5 },
          1024: { items: 6 },
        }}
        controlsStrategy="responsive"
        infinite
        disableDotsControls
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1000}
      />
    </div>
  );
};

export default SuggestedProfilesCarousel;
