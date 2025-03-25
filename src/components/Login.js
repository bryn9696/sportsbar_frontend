import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                username,
                password,
            });

            console.log("Login response:", response.data); // Check the full response

            // Assuming the token is in response.data.token
            if (response.status === 200) {
                const token = response.data.token;
                console.log("Received token:", token);

                if (token) {
                    // Save the token to localStorage
                    localStorage.setItem("token", token);
                    alert("Login successful!");
                    navigate("/feed"); // Redirect after successful login
                } else {
                    setError("Token not received. Login failed.");
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(
                err.response?.data || "Invalid credentials. Please try again."
            );
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
