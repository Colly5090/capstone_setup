import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import CurrencySelection from './components/CurrencySelector';
import AlertSetup from './components/AlertSetup'; // Import the new AlertSetup component
import useThemeStore from './stores/themeStore';
import useAlertStore from './stores/useAlertStore';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const theme = useThemeStore((state) => state.theme);
  const { startRatePolling } = useAlertStore();

  useEffect(() => {
    startRatePolling(); // Start polling when the app loads
  }, [startRatePolling]);

  return (
    <QueryClientProvider client={queryClient}> 
      <div className={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<CurrencySelection />} />
              <Route path="/set-alert" element={<AlertSetup />} /> {/* New Route */}
            </Routes>
          </Layout>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;