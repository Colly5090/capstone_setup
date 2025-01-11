import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import { FaStar, FaSearch } from "react-icons/fa";
import AmountInput from "./AmountInput";
import ConversionResult from "./ConversionResult";
import useApiStore, { useFetchExchangeRate } from "../stores/apiStore";
import SetAlert from "./SetAlert";
import useScroll from "../stores/useScroll";
import MultiConvert from "./MultiConvert";
import currencyLists from "../data/currencyList";
import Rating from "./Rating";
import popularCurrencies from "../data/popularCurrencies";

const CurrencySelection = () => {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } =
    useApiStore();
  const { data: exchangeRate, isLoading, error } = useFetchExchangeRate();

  // Local state for managing favorites, recent selections, and conversions
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);
  const [conversions, setConversions] = useState([]);

  // References for scrolling functionality
  const bellRef = useRef(null);
  const multiRef = useRef(null);
  const setRef = useScroll((state) => state.setRef);

  // Auto convert selected currencies with specific amounts
  const specificAmounts = [1, 5, 10, 25, 50, 100, 500, 1000];

  // Initialize scroll references
  useEffect(() => {
    setRef("bell", bellRef);
    setRef("multi", multiRef);
  }, [setRef]);

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Load recent selections from session storage
  useEffect(() => {
    const storedRecents = JSON.parse(sessionStorage.getItem("recents"));
    if (storedRecents) {
      setRecents(storedRecents);
    }
  }, []);

  // Fetch exchange rate if required or error states
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      if (
        !exchangeRate ||
        !exchangeRate[fromCurrency] ||
        !exchangeRate[toCurrency]
      ) {
        if (isLoading) {
          //Loading while fetching the exchangerate
        } else if (error) {
          //If not an error occurs
        }
      }
    }
  }, [fromCurrency, toCurrency, exchangeRate, isLoading, error]);

  // Calculate conversions when the exchange rate changes
  useEffect(() => {
    if (exchangeRate) {
      calculateConversions(exchangeRate);
    }
  }, [exchangeRate]);

  // Map currency data to a format usable by react-select
  const allCurrencies = currencyLists.map((currency) => ({
    value: currency.code,
    label: (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 w-6">{currency.flag}</span>
          {`${currency.countryCode} - ${currency.name}`}
        </div>
        <FaStar
          className={`ml-4 cursor-pointer ${
            favorites.includes(currency.code)
              ? "text-yellow-400"
              : "text-gray-400"
          }`}
          onClick={(e) => toggleFavorite(currency.code, e)}
        />
      </div>
    ),
    countryCode: currency.countryCode,
  }));

  // Group currencies into categories like favorites, recents
  const groupCurrencies = (excludeCurrency) => {
    const groupedOptions = [];

    // Add selected favorites section
    const favoriteOptions = favorites
      .filter((code) => code !== excludeCurrency)
      .map((code) => allCurrencies.find((option) => option.value === code));

    if (favoriteOptions.length > 0) {
      groupedOptions.push({ label: "Favorites", options: favoriteOptions });
    }

    // Add recents section
    const recentOptions = recents
      .filter((code) => code !== excludeCurrency)
      .map((code) => allCurrencies.find((option) => option.value === code));

    if (recentOptions.length > 0) {
      groupedOptions.push({ label: "Recents", options: recentOptions });
    }

    // Add Popular currencies section with star for adding to favorites
    const popularOptions = popularCurrencies
      .filter((currency) => currency.code !== excludeCurrency)
      .map((currency) => ({
        value: currency.code,
        label: (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2 w-6">{currency.flag}</span>
              {`${currency.countryCode} - ${currency.name}`}
            </div>
            <FaStar
              className={`ml-4 cursor-pointer ${
                favorites.includes(currency.code)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={(e) => toggleFavorite(currency.code, e)}
            />
          </div>
        ),
      }));

    if (popularOptions.length > 0) {
      groupedOptions.push({ label: "Popular", options: popularOptions });
    }

    //Add All currencies section
    groupedOptions.push({
      label: "All",
      options: allCurrencies.filter(
        (option) => option.value !== excludeCurrency
      ),
    });

    return groupedOptions;
  };

  // Toggle favorite currencies and update local storage
  const toggleFavorite = (code, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(code)
        ? prev.filter((fav) => fav !== code)
        : [...prev, code];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
      return updatedFavorites;
    });
  };

  // Handle currency selection and update state
  const handleCurrencyChange = (selectedOption, type) => {
    const selectedCurrency = selectedOption ? selectedOption.value : null;

    if (type === "from") {
      setFromCurrency(selectedCurrency);

      // If "x" is clicked, clear fromCurrency from sessionStorage
      if (!selectedCurrency) {
        sessionStorage.removeItem("fromCurrency");
      }
    }
    if (type === "to") {
      setToCurrency(selectedCurrency);

      // If "x" is clicked, clear toCurrency from sessionStorage
      if (!selectedCurrency) {
        sessionStorage.removeItem("toCurrency");
      }
    }

    if (selectedCurrency && !recents.includes(selectedCurrency)) {
      const updatedRecents = [selectedCurrency, ...recents].slice(0, 5);
      setRecents(updatedRecents);
      sessionStorage.setItem("recents", JSON.stringify(updatedRecents));
    }

    // Trigger exchange rate fetching only when a currency is selected
    if (
      (fromCurrency && toCurrency && type === "from" && selectedCurrency) ||
      (type === "to" && selectedCurrency)
    ) {
      if (!exchangeRate?.[fromCurrency]?.[toCurrency]) {
        // Fetch exchange rate logic (this happens in the useEffect)
      }
    }
  };

  // Calculate conversions for predefined amounts
  const calculateConversions = (rate) => {
    const newConversions = [];
    if (rate) {
      specificAmounts.forEach((value) => {
        newConversions.push({
          number: value,
          converted: (value * rate).toFixed(2),
        });
      });
    }
    setConversions(newConversions);
  };

  // Custom placeholder for react-select
  const CustomPlaceholder = (props) => {
    const { selectProps } = props;
    const isFromCurrency = selectProps.name === "fromCurrency";
    return (
      <components.Placeholder {...props}>
        <div className="flex items-center">
          {selectProps.menuIsOpen ? (
            <>
              <FaSearch className="mr-2 text-gray-500" />
              {isFromCurrency ? "Search From Currency" : "Search To Currency"}
            </>
          ) : (
            <span>
              {isFromCurrency ? "Select From Currency" : "Select To Currency"}
            </span>
          )}
        </div>
      </components.Placeholder>
    );
  };

  // Swap selected currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (exchangeRate) {
      return exchangeRate;
    }
  };

  // Render the component and other components
  return (
    <div className="space-y-8">
      {/* Currency, Amount, Swap, and Converted Amount Container */}
      <div className="flex flex-col md:flex-col gap-4 items-stretch p-4 sm:w-full">
        {/* DropDown for From Currency */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Currency
          </label>
          <Select
            name="fromCurrency"
            options={groupCurrencies(toCurrency)}
            onChange={(option) => handleCurrencyChange(option, "from")}
            placeholder="Select From Currency"
            components={{ Placeholder: CustomPlaceholder }}
            value={
              fromCurrency
                ? allCurrencies.find((option) => option.value === fromCurrency)
                : null
            }
            isClearable
          />
        </div>

        {/* Amount Input Field */}
        <div className="flex-1 mt-1">
          <AmountInput />
        </div>

        {/* Swap Button */}
        <div className="flex flex-col items-center md:items-star">
          <button
            aria-label="Swap currencies"
            onClick={handleSwap}
            className="bg-green-300 p-4 rounded-full hover:bg-pink-300 mb-2 mt-5 sm:bg-gray-200"
          >
            <span className="font-semibold md:font-semibold text-sm md:text-xl md:text-green-500 text-black">
              Swap
            </span>{" "}
            ↔️
          </button>

          {/* Display Current Exchange Rate with datetime */}
          {fromCurrency && toCurrency && exchangeRate !== null && (
            <div className="text-center md:text-left text-gray-700 mt-2 p-4">
              <div className="text-gray-700 md:text-gray-900 text-sm md:text-lg font-medium md:font-semibold">
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date())}
              </div>
              <div className="font-medium md:font-normal text-sm md:text-lg text-red-600">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </div>
            </div>
          )}
        </div>

        {/* To Currency Dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Currency
          </label>
          <Select
            name="toCurrency"
            options={groupCurrencies(fromCurrency)}
            onChange={(option) => handleCurrencyChange(option, "to")}
            placeholder="Select To Currency"
            components={{ Placeholder: CustomPlaceholder }}
            value={allCurrencies.find((option) => option.value === toCurrency)}
            isClearable
          />
        </div>

        {/* Converted Amount */}
        <div className="flex-1">
          <ConversionResult />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-t border-black w-full mb-10"></div>

      {/* Display conversion results for specific values */}
      {fromCurrency && toCurrency && exchangeRate > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-2">
          {/* Card 1: Conversion of fromCurrency to toCurrency */}
          <div className="bg-gray-400 shadow-md rounded-lg w-96 min-h-[20rem] p-6 py-6 md:bg-green-200">
            <h3 className="text-sm md:text-lg font-medium md:font-semibold mb-4 text-center">
              Conversion of{" "}
              {currencyLists.find((opt) => opt.code === fromCurrency)?.name} to{" "}
              {currencyLists.find((opt) => opt.code === toCurrency)?.name}
            </h3>
            <ul className="space-y-2">
              {conversions.map(({ number, converted }) => (
                <li
                  key={`from-${number}`}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span className="font-normal md:font-medium">
                    {number} {fromCurrency}
                  </span>
                  <span className="font-normal md:font-medium">
                    {converted} {toCurrency}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Conversion of toCurrency to fromCurrency */}
          <div className="bg-gray-400 shadow-md rounded-lg w-96 min-h-[20rem] p-6 py-6 md:bg-green-200">
            <h3 className="text-sm md:text-lg font-medium md:font-semibold mb-4 text-center">
              Conversion of{" "}
              {currencyLists.find((opt) => opt.code === toCurrency)?.name} to{" "}
              {currencyLists.find((opt) => opt.code === fromCurrency)?.name}
            </h3>
            <ul className="space-y-2">
              {specificAmounts.map((value) => {
                const reverseConverted = (value / exchangeRate).toFixed(2);
                return (
                  <li
                    key={`to-${value}`}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span className="font-normal md:font-medium">
                      {value} {toCurrency}
                    </span>
                    <span className="font-normal md:font-medium">
                      {reverseConverted} {fromCurrency}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/*Alert Settings */}
      <div>
        <div className="border-t border-black w-full mb-10"></div>
        <div ref={bellRef} className="mt-10">
          <SetAlert />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-t border-black w-full mb-10"></div>

      {/*MultiCurrency Rendering */}
      <div className="pt-20 pb-10 px-6">
        <div
          ref={multiRef}
          className="bg-white shadow-lg rounded-lg border border-gray-300 p-6"
        >
          <MultiConvert />
        </div>
      </div>
      <Rating />
    </div>
  );
};

export default CurrencySelection;
