import React from "react";
import useApiStore, { useFetchExchangeRate } from "../stores/apiStore";

function ConversionResult() {
  const { amount } = useApiStore();
  const { data: exchangeRate } = useFetchExchangeRate();

  const convertedAmount = exchangeRate
    ? (amount * exchangeRate).toFixed(2)
    : "";
  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Converted Amount
        </label>
        <input
          type="text"
          value={convertedAmount}
          readOnly
          placeholder="Converted Amount"
          className="mt-1 p-2 border rounded-md w-full bg-gray-100"
        />
      </div>
    </div>
  );
}

export default ConversionResult;
