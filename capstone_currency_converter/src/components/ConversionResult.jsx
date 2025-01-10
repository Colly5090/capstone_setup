import React from "react";
import useApiStore, { useFetchExchangeRate } from "../stores/apiStore";

//Function that calculate results and displays them based on amount and exchangeRate
const ConversationResult = () => {
  const { amount } = useApiStore();
  const { data: exchangeRate, isLoading, isError} = useFetchExchangeRate();

  //Ensure both rate and amount are valid before calculating the result
  const convertedAmount = exchangeRate && amount ? (amount * exchangeRate).toFixed(2) : "";

  return (
    <div>
      {/* Loading and Error Messages */}
      {isLoading && (
        <div role="alert">
          <p>Loading exchange rate...</p>
        </div>
      )}
      {isError && (
        <div role="alert">
          <p>Error fetching exchange rate. Please try again.</p>
        </div>
      )}

      {/* UI Structure to Display Converted Amount */}
      {!isLoading && !isError && (
        <div>
          <label htmlFor="convertedAmount" className="block text-sm font-medium text-gray-700">
            Converted Amount
          </label>
          <output
            id="convertedAmount"
            className="mt-1 p-2 border rounded-md w-full bg-gray-100"
            aria-live="polite"
          >
            {convertedAmount || "Converted amount"}
          </output>
        </div>
      )}
    </div>
  );
};

export default ConversationResult;