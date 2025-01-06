import React from "react";
import useApiStore from "../stores/apiStore";

const AmountInput = () => {
  const { amount, setAmount } = useApiStore();

  const handleChange = (value) => {
    const numericValue = Number(value) || 0; // Ensure valid numeric input
    console.log("Input value changed:", numericValue);
    setAmount(numericValue); // Update the amount in the store
  };

  return (
    <div className="">
      {/* Editable Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter Amount"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default AmountInput;