import React, { useState, useEffect } from "react";
import useCurrencyStore, { useCurrencyRates } from "../stores/useMultiConvertStore";
import currencyOptions from "../data/currencyList";
import ReactSelect from "react-select";

const MultiConvert = () => {
  const {
    fromCurrency,
    toCurrencies,
    amount,
    setFromCurrency,
    addToCurrency,
    removeToCurrency,
    setAmount,
  } = useCurrencyStore();

  const [toCurrencyInput, setToCurrencyInput] = useState("");
  const [error, setError] = useState("");
  const [activeSelect, setActiveSelect] = useState(null);
  const [displayAmount, setDisplayAmount] = useState(null);
  const [conversionResults, setConversionResults] = useState(null);
  const [tempFromCurrency, setTempFromCurrency] = useState("");  // Temporary currency state

  const results = useCurrencyRates();

  const currencySelectOptions = currencyOptions.map((currency) => ({
    value: currency.code,
    label: `${currency.flag} ${currency.countryCode} - ${currency.name}`,
  }));

  const handleMultiConvert = () => {
    if (!fromCurrency) {
      setError("Please select a From Currency.");
      return;
    }
    if (toCurrencies.length < 2) {
      setError("Please select at least two To Currencies.");
      return;
    }
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setDisplayAmount(amount);

    setFromCurrency(tempFromCurrency);

    // Extract rates in order corresponding to `toCurrencies`
    const rates = toCurrencies.map((currency, index) => {
      const rate = results[index]?.rate || null;
      return rate;
    });

    // Compute conversion results
    const conversionData = toCurrencies.map((currency, index) => ({
      currency,
      convertedAmount:
        rates[index] !== null ? (amount * rates[index]).toFixed(2) : "N/A",
    }));

    setConversionResults(conversionData);

    // Reset fields after conversion
    setFromCurrency("");
    setAmount("");
  };

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedToCurrencies = sessionStorage.getItem("toCurrencies");

    if (storedToCurrencies) {
      const parsedToCurrencies = JSON.parse(storedToCurrencies);
      parsedToCurrencies.forEach((currency) => {
        addToCurrency(currency);
      });
    }
  }, []);

  // Persist data to sessionStorage when state changes
  useEffect(() => {
    sessionStorage.setItem("toCurrencies", JSON.stringify(toCurrencies));
  }, [toCurrencies]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-sm md:text-xl font-bold mb-6 text-center">
        Ready to convert a single currency to multiple currencies?
      </h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* From Currency */}
      <div className="mb-4">
        <label className="block font-semibold">From Currency:</label>
        <ReactSelect
          className="w-full"
          value={
            currencySelectOptions.find(
              (option) => option.value === fromCurrency
            ) || null
          }
          onChange={(selectedOption) => {
            setFromCurrency(selectedOption.value);
            setActiveSelect("from");
            setTempFromCurrency(selectedOption.value);
          }}
          onFocus={() => setActiveSelect("from")}
          options={currencySelectOptions}
          placeholder={
            activeSelect === "from" ? "Search a Currency" : "Select a currency"
          }
        />
      </div>

      {/* To Currencies */}
      <div className="mb-4">
        <label className="block font-semibold">To Currencies:</label>
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 w-full">
          <ReactSelect
            className="flex-grow w-full sm:w-60"
            value={
              currencySelectOptions.find(
                (option) => option.value === toCurrencyInput
              ) || null
            }
            onFocus={() => setActiveSelect("to")}
            onChange={(selectedOption) => {
              setToCurrencyInput(selectedOption.value);
              setActiveSelect("to");
            }}
            options={currencySelectOptions}
            placeholder={
              activeSelect === "to" ? "Search a Currency" : "Select a currency"
            }
          />
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded w-full sm:w-auto"
            onClick={() => {
              if (toCurrencyInput && !toCurrencies.includes(toCurrencyInput)) {
                addToCurrency(toCurrencyInput);
                setToCurrencyInput("");
              }
            }}
          >
            Add
          </button>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {toCurrencies.map((currency) => (
            <li
              key={currency}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <span>
                {`${
                  currencyOptions.find((opt) => opt.code === currency)?.flag
                } ${
                  currencyOptions.find((opt) => opt.code === currency)
                    ?.countryCode
                } - ${
                  currencyOptions.find((opt) => opt.code === currency)?.name
                }`}
              </span>
              <button
                className="text-red-500"
                onClick={() => removeToCurrency(currency)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Amount */}
      <div className="mb-4 w-full sm:w-100">
        <label className="block font-semibold">Amount:</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      {/* Multi Convert Button */}
      <div className="flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleMultiConvert}
        >
          Multi Convert
        </button>
      </div>

      {/* Results */}
      {conversionResults && (
        <div className="mt-6">
          <h2 className="text-lg md:font-semibold font-bold mb-4 text-center text-red-600">
          {displayAmount} {tempFromCurrency ? tempFromCurrency : ""} is equivalent to
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {conversionResults.map(({ currency, convertedAmount }) => (
              <li
                key={currency}
                className="p-4 shadow-md rounded text-center bg-gray-400"
              >
                <p className="font-bold">{currency}</p>
                <p className="text-sm">{convertedAmount}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiConvert;
