import React from "react";
import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";

const Rating = () => {
  const ratings = [
    {
      logo: <FaApple className="text-4xl text-gray-600" />,
      platform: "App Store",
      stars: 5,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
    {
      logo: <FaGooglePlay className="text-4xl text-green-600" />,
      platform: "Google Play",
      stars: 5,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
    {
      logo: <FaStar className="text-4xl text-yellow-500" />,
      platform: "Trustpilot",
      stars: 4,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-md">
      {ratings.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-4 border-b pb-4 last:border-none last:pb-0"
        >
          {/* Logo and Platform Name */}
          <div className="flex items-center space-x-4">
            <div>{item.logo}</div>
            <div className="text-lg font-semibold">{item.platform}</div>
          </div>

          {/* Stars and Ratings */}
          <div className="text-center">
            <div className="flex justify-center">
              {[...Array(item.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-sm" />
              ))}
            </div>
            <div className="text-gray-600 text-sm">
              {item.rating}, {item.reviews}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rating;