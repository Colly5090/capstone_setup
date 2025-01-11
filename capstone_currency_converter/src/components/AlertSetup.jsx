import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import useAlertStore from "../stores/useAlertStore";
import currencyOptions from "../data/currencyList";

function AlertSetup() {
  const navigate = useNavigate();
  const { setAlertSettings } = useAlertStore();

  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [fromMenuOpen, setFromMenuOpen] = useState(false);
  const [toMenuOpen, setToMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromCurrency && toCurrency) {
      setAlertSettings(fromCurrency.value, toCurrency.value, isAgreed);
      alert("Alert Set Successfully!");
      navigate("/");
    }
  };

  // Map currencyOptions for react-select
  const options = currencyOptions.map((currency) => ({
    value: currency.code,
    label: `${currency.flag} ${currency.name} (${currency.code})`,
  }));

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-sm sm:font-bold md:text-2xl font-bold text-center mb-6 text-orange-300">
          Set Your Alert
        </h2>

        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-500 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <form onSubmit={handleSubmit}>
          {/* From Currency */}
          <div className="mb-4">
            <label className="block font-medium mb-2">From Currency</label>
            <Select
              options={options}
              value={fromCurrency}
              onChange={setFromCurrency}
              onMenuOpen={() => setFromMenuOpen(true)}
              onMenuClose={() => setFromMenuOpen(false)}
              isSearchable
              placeholder={
                fromMenuOpen ? "Search From Currency" : "Select From Currency"
              }
            />
          </div>

          {/* To Currency */}
          <div className="mb-4">
            <label className="block font-medium mb-2">To Currency</label>
            <Select
              options={options}
              value={toCurrency}
              onChange={setToCurrency}
              onMenuOpen={() => setToMenuOpen(true)}
              onMenuClose={() => setToMenuOpen(false)}
              isSearchable
              placeholder={
                toMenuOpen ? "Search To Currency" : "Select To Currency"
              }
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mr-2"
              />
              I agree to the terms
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition ${
              !isAgreed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isAgreed}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AlertSetup;
