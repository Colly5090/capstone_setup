import { create } from "zustand";
import { useQuery } from "react-query";

// Zustand store to manage amount, fromCurrency, and toCurrency
const useApiStore = create((set, get) => ({
  amount: 0,
  fromCurrency: sessionStorage.getItem("fromCurrency") || "",
  toCurrency: sessionStorage.getItem("toCurrency") || "",
  exchangeRate: null, // Exchange rate to be updated by React Query

  // Setter for amount
  setAmount: (newAmount) => {
    console.log("Zustand store updated with amount:", newAmount);
    set({ amount: newAmount });
  },

  // Setter for fromCurrency
  setFromCurrency: (newFromCurrency) => {
    console.log("Zustand store updated with fromCurrency:", newFromCurrency);
    sessionStorage.setItem("fromCurrency", newFromCurrency);
    set({ fromCurrency: newFromCurrency });
  },

  // Setter for toCurrency
  setToCurrency: (newToCurrency) => {
    console.log("Zustand store updated with toCurrency:", newToCurrency);
    sessionStorage.setItem("toCurrency", newToCurrency);
    set({ toCurrency: newToCurrency });
  },

  // Setter for exchangeRate (to be used by React Query)
  setExchangeRate: (rate) => {
    console.log("Zustand store updated with exchange rate:", rate);
    set({ exchangeRate: rate });
  },
}));

// React Query hook to fetch and update the exchange rate
export const useFetchExchangeRate = () => {
  const { fromCurrency, toCurrency, setExchangeRate } = useApiStore();

  const queryKey = ["exchangeRate", fromCurrency, toCurrency]

  return useQuery(
    queryKey,
    async () => {
      if (!fromCurrency || !toCurrency) {
        throw new Error("Both currencies must be selected to fetch the exchange rate.");
      }

      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
      console.log("Fetching exchange rate from API...");
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rate;
        console.log("Exchange rate fetched successfully:", rate);
        return rate;
      } else {
        throw new Error(data.error_type || "Failed to fetch exchange rate.");
      }
    },
    {
      enabled: !!fromCurrency && !!toCurrency, // Enable query only when currencies are set
      staleTime: 60000, // Cache data for 1 minute
      onSuccess: (rate) => {
        console.log("Updating exchange rate in Zustand store...");
        setExchangeRate(rate);
        console.log("Data fetched successfully:", rate);
        console.log("Cache key used:", queryKey);
      },
    }
  );
};

export default useApiStore;