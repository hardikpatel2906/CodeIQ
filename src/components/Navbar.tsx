import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user & logout from AuthContext

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">CodeIQ</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/about" className="text-white hover:underline">About</Link>

          {user ? (
            <>
              <span className="text-white">Welcome, {user.fullName}</span>
              <button onClick={logout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/" className="text-white" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="text-white" onClick={toggleMenu}>About</Link>

          {user ? (
            <>
              <span className="text-white">Welcome, {user.fullName}</span>
              <button onClick={() => { logout(); toggleMenu(); }} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="text-white" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
