import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [capstoneOpen, setCapstoneOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10 px-5">
      {/* Header and Paragraph */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">CONVERT ON THE GO</h2>
        <p className="mt-2 text-gray-300">
          Download the Capstone Currency Converter app{" "}
        </p>
      </div>

      {/* App Store and Play Store Links */}
      <div className="flex justify-center gap-4 mt-6">
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src="/assets/appstore.svg" alt="App Store" className="h-12" />
        </a>
        <a
          href="https://play.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src="/assets/playstore.png" alt="Play Store" className="h-12" />
        </a>
      </div>

      {/* Collapsible Sections */}
      <div className="mt-10 space-y-4">
        {/* Resources */}
        <div>
          <div
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="cursor-pointer text-lg flex items-center justify-between border-b border-gray-700 py-2"
          >
            <span>RESOURCES</span>
            <span>{resourcesOpen ? "x" : "+"}</span>
          </div>
          {resourcesOpen && (
            <ul className="mt-2 pl-4 space-y-2">
              <li>
                <a
                  href="https://www.exchangerate-api.com/docs/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  API Resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.exchangerate-api.com/docs/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Capstone Project */}
        <div>
          <div
            onClick={() => setCapstoneOpen(!capstoneOpen)}
            className="cursor-pointer text-lg flex items-center justify-between border-b border-gray-700 py-2"
          >
            <span>CAPSTONE PROJECT</span>
            <span>{capstoneOpen ? "x" : "+"}</span>
          </div>
          {capstoneOpen && (
            <ul className="mt-2 pl-4 space-y-2">
              <li>
                <a
                  href="https://www.alxafrica.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.alxafrica.com/learn/career/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Careers
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Currency Converter */}
        <div>
          <div
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="cursor-pointer text-lg flex items-center justify-between border-b border-gray-700 py-2"
          >
            <span>CURRENCY CONVERTER</span>
            <span>{currencyOpen ? "x" : "+"}</span>
          </div>
          {currencyOpen && (
            <ul className="mt-2 pl-4 space-y-2">
              <li>
                <a
                  href="https://www.exchangerate-api.com/docs/historical-data-requests"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Historical Currency Converter
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-10">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-2xl"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-2xl"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-2xl"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-2xl"
        >
          <FaInstagram />
        </a>
        {/* GitHub Icon */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500"
        >
          <FaGithub size={24} />
        </a>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-gray-500 text-sm text-center">
        &copy; 2024-{currentYear} Capstone Currency Converter. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;