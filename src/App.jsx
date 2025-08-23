import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BookPage from "./pages/BookPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">WealthPath Library</h1>
          <nav className="space-x-4 text-sm">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* Home/Search Page */}
          <Route path="/" element={<Home />} />

          {/* Book Details Page */}
          <Route path="/book/:workId" element={<BookPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-neutral-600">
          © {new Date().getFullYear()} WealthPath • Built for ALX FE Capstone
        </div>
      </footer>
    </div>
  );
}
