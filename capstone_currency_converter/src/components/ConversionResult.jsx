import React from "react";
import useApiStore, { useFetchExchangeRate } from "../stores/apiStore";

const ConversationResult = () => {
  const { amount } = useApiStore();
  const { data: exchangeRate, isLoading, isError, error } = useFetchExchangeRate();
  console.log('This is exchange rate', exchangeRate)
  console.log("Cache data (exchange rate):", exchangeRate);
  console.log("Query status:", { isLoading, isError });

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : "";

  return (
    <div>
      {isLoading && <p>Loading exchange rate...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Converted Amount
          </label>
          <input
            type="text"
            value={convertedAmount}
            readOnly
            className="mt-1 p-2 border rounded-md w-full bg-gray-100"
            placeholder="Converted amount"
          />
        </div>
      )}
    </div>
  );
};

export default ConversationResult;