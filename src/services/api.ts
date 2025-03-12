import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Change this to your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// **User Registration**
export const registerUser = async (userData: { fullName: string; email: string; password: string }) => {
  return api.post("/register", userData);
};

// **User Login**
export const loginUser = async (userData: { email: string; password: string }) => {
  return api.post("/login", userData);
};

export const getUserStreak = async (userId: string) => {
  return api.get(`/streak/${userId}`)
}


// **Get User Profile (Protected Route)**
export const getUserProfile = async (token: string) => {
  return api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
