import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== passwordConfirmation) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/user");
        } catch (err) {
            setError("Erreur lors de l'inscription. Vérifiez vos informations.");
        }
    };

    return (
        <div className="register-container">
            {/* Partie gauche - Formulaire */}
            <div className="register-form-container">
                <h1>S'inscrire</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    <button type="submit">S'inscrire</button>
                </form>
                <p className="login-link">
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
            </div>

            {/* Partie droite - Diaporama */}
            <div className="register-slideshow">
                <img src={images[currentImageIndex]} alt="Diaporama" className="slideshow-image" />
            </div>
        </div>
    );
}

export default Register;
