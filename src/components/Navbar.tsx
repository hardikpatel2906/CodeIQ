import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth(); // Get user & logout from AuthContext

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">CodeIQ</Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-white hover:underline">Home</Link>
                    <Link to="/about" className="text-white hover:underline">About</Link>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                            >
                                {user.fullName}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                                    <Link to="/progress" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Your Progress</Link>
                                    <Link to="/daily-streak" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Daily Streak</Link>
                                    <Link to="/update-profile" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Update Profile</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Settings</Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                            >
                                {user.fullName}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                                    <Link to="/progress" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Your Progress</Link>
                                    <Link to="/daily-streak" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Daily Streak</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Settings</Link>
                                    <button
                                        onClick={() => { logout(); toggleMenu(); }}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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
