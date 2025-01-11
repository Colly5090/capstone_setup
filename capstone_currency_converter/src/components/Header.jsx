import React, { useState } from "react";
import useThemeStore from "../stores/themeStore";
import {
  FaSun,
  FaMoon,
  FaBell,
  FaExchangeAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAlertStore from "../stores/useAlertStore";
import useScroll from "../stores/useScroll";

function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { alertCount, resetAlertCount, alertMessage } = useAlertStore();
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScroll((state) => state.scrollTo);

  const handleAlertClick = () => {
    if (alertCount > 0 && alertMessage) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      scrollTo("bell"); // Scroll to component A when the bell is clicked
    }
    resetAlertCount();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <header className="p-6 flex justify-between items-center bg-gray-100 dark:bg-gray-800 relative">
      <h1 className="text-lg font-bold text-black dark:text-white">
        Capstone Currency Converter
      </h1>

      <div className="hidden md:flex space-x-8 ml-auto">
        {/* Header icons */}
        <div className="flex flex-row items-center space-x-4">
          <div className="flex flex-col items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-yellow-500 hover:bg-violet-300 transition-colors duration-300" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </button>
            <span className="text-sm text-black dark:text-white">
              Dark Mode
            </span>
          </div>

          <div className="flex flex-col items-center relative">
            <button
              onClick={handleAlertClick}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
              aria-label="Set Alert"
            >
              <FaBell
                className={`text-black dark:text-white hover:bg-violet-300 transition-colors duration-300 ${
                  alertCount > 0 ? "text-red-500" : ""
                }`}
              />
              {alertCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
                  {alertCount}
                </span>
              )}
            </button>
            <span className="text-sm text-black dark:text-white">Alerts</span>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => scrollTo("multi")} // Scroll to component B when multi is clicked
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
              aria-label="Multi Convert"
            >
              <FaExchangeAlt className="text-black dark:text-white hover:bg-violet-300 transition-colors duration-300" />
            </button>
            <span className="text-sm text-black dark:text-white">
              Multi Convert
            </span>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black dark:text-white p-2"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-500 z-10">
          <div className="flex flex-row justify-center space-x-4 p-8">
            <div className="flex flex-col items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <FaMoon className="text-yellow-500" />
                ) : (
                  <FaSun className="text-yellow-500" />
                )}
              </button>
              <span className="text-sm text-white">Dark Mode</span>
            </div>

            <div className="flex flex-col items-center relative">
              <button
                onClick={handleAlertClick}
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
                aria-label="Set Alert"
              >
                <FaBell
                  className={`text-black dark:text-white ${
                    alertCount > 0 ? "text-red-500" : ""
                  }`}
                />
                {alertCount > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
                    {alertCount}
                  </span>
                )}
              </button>
              <span className="text-sm text-white">Alerts</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => scrollTo("multi")}
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
                aria-label="Multi Convert"
              >
                <FaExchangeAlt className="text-black dark:text-white" />
              </button>
              <span className="text-sm text-white">Multi Convert</span>
            </div>
          </div>
        </div>
      )}

      {showPopup && alertMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold">Exchange Rate Alert</h2>
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
