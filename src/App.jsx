// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import Footer from "./components/Footer";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-green-700 text-white p-4 md:p-6 flex justify-between items-center shadow-md">
          <Link to="/" className="text-2xl font-bold">
            WealthPath
          </Link>
          <div className="space-x-4 hidden md:flex">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/featured" className="hover:underline">Featured</Link>
            <Link to="/community" className="hover:underline">Community</Link>
          </div>
          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Links */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-green-600 text-white shadow-md">
            <Link to="/" className="block py-2 px-4 hover:bg-green-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/featured" className="block py-2 px-4 hover:bg-green-700" onClick={() => setIsMobileMenuOpen(false)}>Featured</Link>
            <Link to="/community" className="block py-2 px-4 hover:bg-green-700" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/featured" element={<div className="p-8 text-center">Featured Page (To be implemented)</div>} />
            <Route path="/community" element={<div className="p-8 text-center">Community Page (To be implemented)</div>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}