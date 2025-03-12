import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import QuizPage from "./pages/QuizPage";
import StreakDashboard from "./components/StreakDashboard";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz/:language" element={<QuizPage />} />
                    <Route path="/daily-streak" element={<StreakDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
