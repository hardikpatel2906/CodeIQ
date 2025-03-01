import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Logging in with:", { email, password });
        setError(null);

        try {
            const response = await loginUser({ email, password });
            // console.log("Login Successful:", response.data);
            localStorage.setItem("token", response.data.token); // Store token
            login(response.data.token, response.data.fullName); // Save user name
            alert("Login Successful!");
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-black">Login</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-3 border rounded-md bg-white text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-3 border rounded-md bg-white text-black"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-black">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
