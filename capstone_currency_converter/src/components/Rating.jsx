import React from "react";
import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";

const Rating = () => {
  const ratings = [
    {
      id: "app-store",
      logo: (
        <FaApple
          className="text-4xl text-gray-600"
          aria-label="Apple Store Logo"
        />
      ),
      platform: "App Store",
      stars: 5,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
    {
      id: "google-play",
      logo: (
        <FaGooglePlay
          className="text-4xl text-green-600"
          aria-label="Google Play Logo"
        />
      ),
      platform: "Google Play",
      stars: 5,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
    {
      id: "trustpilot",
      logo: (
        <FaStar
          className="text-4xl text-yellow-500"
          aria-label="Trustpilot Logo"
        />
      ),
      platform: "Trustpilot",
      stars: 4,
      rating: "4.8/5",
      reviews: "58.6k ratings",
    },
  ];

  return (
    <section
      className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-md"
      aria-labelledby="ratings-heading"
    >
      {ratings.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between mb-4 border-b pb-4 last:border-none last:pb-0"
          aria-labelledby={`${item.id}-heading`}
        >
          {/* Logo and Platform Name */}
          <div className="flex items-center space-x-4">
            <div>{item.logo}</div>
            <h3 id={`${item.id}-heading`} className="text-lg font-semibold">
              {item.platform}
            </h3>
          </div>

          {/* Stars and Ratings */}
          <div className="text-center">
            <div
              className="flex justify-center"
              aria-label={`Rating: ${item.stars} stars`}
            >
              {[...Array(item.stars)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-yellow-500 text-sm"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              {item.rating}, {item.reviews}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Rating;
