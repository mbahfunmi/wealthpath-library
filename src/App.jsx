// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar based on Wireframe */}
        <nav className="bg-green-700 text-white p-4 md:p-6 flex justify-between items-center shadow-md">
          <Link to="/" className="text-2xl font-bold">
            WealthPath
          </Link>
          <div className="space-x-4 hidden md:flex">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/featured" className="hover:underline">Featured</Link>
            <Link to="/community" className="hover:underline">Community</Link>
          </div>
          {/* Mobile menu icon (placeholder) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookPage />} />
          {/* Placeholders for new routes */}
          <Route path="/featured" element={<div className="p-8 text-center">Featured Page (To be implemented)</div>} />
          <Route path="/community" element={<div className="p-8 text-center">Community Page (To be implemented)</div>} />
        </Routes>
      </div>
    </Router>
  );
}