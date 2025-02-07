import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectToUser, setRedirectToUser] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Images du diaporama
    const images = [
        require("../photos/image2.jfif"),
        require("../photos/image3.jfif"),
        require("../photos/image4.jfif"),
    ];

    // Changer d'image toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setRedirectToUser(true);
        } catch (err) {
            setError("Email ou mot de passe incorrect.");
        }
    };

    // 🚀 Si connexion réussie, rediriger vers /user
    if (redirectToUser) {
        return <Navigate to="/user" />;
    }

    return (
        <div className="login-container">
            {/* Partie gauche - Formulaire */}
            <div className="login-form-container">
                <h1>Se connecter</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Connexion</button>
                </form>
            </div>

            {/* Partie droite - Diaporama */}
            <div className="login-slideshow">
                <img src={images[currentImageIndex]} alt="Diaporama" className="slideshow-image" />
            </div>
        </div>
    );
}

export default Login;
