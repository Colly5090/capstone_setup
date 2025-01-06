import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';


function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;