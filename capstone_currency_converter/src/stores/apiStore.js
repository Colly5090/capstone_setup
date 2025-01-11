import { create } from "zustand";
import { useQuery } from "react-query";

// Zustand store to manage amount, fromCurrency, and toCurrency
const useApiStore = create((set) => ({
  amount: "",
  fromCurrency: sessionStorage.getItem("fromCurrency") || "",
  toCurrency: sessionStorage.getItem("toCurrency") || "",
  exchangeRate: "",

  // Setter for amount
  setAmount: (newAmount) => {
    set({ amount: newAmount });
  },

  // Setter for fromCurrency
  setFromCurrency: (newFromCurrency) => {
    set({ fromCurrency: newFromCurrency });
    sessionStorage.setItem("fromCurrency", newFromCurrency);
  },

  // Setter for toCurrency
  setToCurrency: (newToCurrency) => {
    set({ toCurrency: newToCurrency });
    sessionStorage.setItem("toCurrency", newToCurrency);
  },

  // Setter for exchangeRate (to be used by React Query)
  setExchangeRate: (rate) => {
    set({ exchangeRate: rate });
  },
}));

// React Query hook to fetch and updating the exchange rate
export const useFetchExchangeRate = () => {
  const { fromCurrency, toCurrency, setExchangeRate } = useApiStore();

  const queryKey = ["exchangeRate", fromCurrency, toCurrency]; // Cached key will be exchangeRate

  return useQuery(
    queryKey,
    async () => {
      if (!fromCurrency || !toCurrency) {
        throw new Error(
          "Both currencies must be selected to fetch the exchange rate."
        );
      }

      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing.");
      }
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API Fetch Error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rate;
        return rate;
      } else {
        throw new Error(data.error_type || "Failed to fetch exchange rate.");
      }
    },
    {
      enabled: !!fromCurrency && !!toCurrency,
      staleTime: 30 * 60 * 1000,
      cacheTime: 2 * 60 * 60 * 1000,
      onSuccess: (rate) => {
        setExchangeRate(rate);
      },
    }
  );
};

export default useApiStore;
