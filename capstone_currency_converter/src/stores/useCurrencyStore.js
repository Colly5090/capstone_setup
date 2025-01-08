import { create } from 'zustand';
import { useQuery, useQueries } from 'react-query';

// Function to fetch exchange rates
const fetchExchangeRate = async ({ fromCurrency, toCurrency }) => {
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch exchange rate');
  }
  console.log(`[LOG] Fetching rate: ${fromCurrency} -> ${toCurrency}, Rate: ${data.conversion_rate}`);
  return data.conversion_rate;
};

// React Query Hook
export const useCurrencyRates = () => {
  const { fromCurrency, toCurrencies } = useCurrencyStore();

  const queries = (toCurrencies || []).map((toCurrency) => ({
    queryKey: ['exchangeRate', fromCurrency, toCurrency],
    queryFn: () => fetchExchangeRate({ fromCurrency, toCurrency }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!fromCurrency && !!toCurrency,
  }));

  const results = useQueries(queries);  // Directly pass the array 'queries'

  // Log details about queries
  console.log('[LOG] Query Keys:', queries.map((q) => q.queryKey));
  results.forEach((result, index) => {
    if (result.isFetched) {
      console.log(`[LOG] Cached Rate for ${fromCurrency} -> ${toCurrencies[index]}:`, result.data);
    }
  });

  return results.map((result) => ({
    ...result,
    rate: result.data,
  }));
};

// Zustand Store for User Interaction
const useCurrencyStore = create((set) => ({
  fromCurrency: null,
  toCurrencies: [],
  amount: null,

  setFromCurrency: (currency) => set(() => ({ fromCurrency: currency })),
  addToCurrency: (currency) =>
    set((state) => ({
      toCurrencies: state.toCurrencies.includes(currency)
        ? state.toCurrencies
        : [...state.toCurrencies, currency],
    })),
  removeToCurrency: (currency) =>
    set((state) => ({
      toCurrencies: state.toCurrencies.filter((curr) => curr !== currency),
    })),
  setAmount: (amount) => set(() => ({ amount })),
}));

export default useCurrencyStore;