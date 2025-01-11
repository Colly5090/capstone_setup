import React from "react";
import useApiStore from "../stores/apiStore";

//Function that takes user's amount and update the store
const AmountInput = () => {
  const { amount, setAmount } = useApiStore();

  //Function to ensure only positive numbers and valid decimals are allowed
  const handleChange = (value) => {
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      return;
    }

    if (value === "") {
      setAmount("");
    } else if (numericValue >= 0) {
      setAmount(numericValue);
    }
  };

  //UI Structure which Input field
  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => handleChange(e.target.value)}
          min="0"
          step="0.01"
          aria-label="Amount"
          placeholder="Enter Amount"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default AmountInput;
