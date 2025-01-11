import React from "react";
import { useNavigate } from "react-router-dom";

function SetAlert() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/set-alert");
  };

  return (
    <section className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-300 text-center">
      <img
        src="/assets/watchmarket.png"
        alt="Rate Alerts"
        className="w-25 h-25 mx-auto mb-4"
      />
      <h2 className="text-sm font-semibold md:text-2xl md:font-semibold mb-4">
        Let us watch the market for you
      </h2>
      <p className="text-gray-700 mb-6 text-sm md:text-xl">
        Currency markets are always moving. Get exchange rate alerts so you
        never miss your desired rate.
      </p>
      <button
        className="text-sm md:text-xl w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleClick}
        aria-label="Get Rate Alerts"
      >
        Get Rate Alerts
      </button>
    </section>
  );
}

export default SetAlert;
