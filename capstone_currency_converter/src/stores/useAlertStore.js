import { create } from "zustand";

const useAlertStore = create((set, get) => ({
  alertSettings: {
    fromCurrency: "",
    toCurrency: "",
    isAgreed: false,
  },
  alertCount: 0,
  exchangeRate: null,
  previousRate: null,
  currentRate: null,
  alertMessage: "",

  setAlertSettings: (fromCurrency, toCurrency, isAgreed) =>
    set({
      alertSettings: { fromCurrency, toCurrency, isAgreed },
      alertCount: 0,
      currentRate: null,
      previousRate: null,
      alertMessage: "",
    }),

  incrementAlertCount: () =>
    set((state) => ({ alertCount: state.alertCount + 1 })),
  resetAlertCount: () => set({ alertCount: 0 }),

  fetchExchangeRate: async () => {
    const { alertSettings, currentRate, previousRate } = get();
    const { fromCurrency, toCurrency } = alertSettings;

    if (!fromCurrency || !toCurrency) return;

    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.result === "success") {
        const fetchedRate = data.conversion_rate;

        if (currentRate === null) {
          set({ currentRate: fetchedRate, previousRate: null });
        } else {
          set({ previousRate: currentRate });
          if (fetchedRate !== currentRate) {
            const changeMessage = `Exchange rate changed from ${previousRate} to ${fetchedRate}`;
            set({ alertMessage: changeMessage });
            get().incrementAlertCount();
          }
          set({ currentRate: fetchedRate });
        }
      } else {
        //error type occured during exchangerate fetching
      }
    } catch (error) {
      //error message here
    }
  },

  startRatePolling: () => {
    setInterval(() => {
      get().fetchExchangeRate();
    }, 3 * 60 * 60 * 1000); //Refetch and compare exchangeRate after every 3 hours
  },
}));

export default useAlertStore;
