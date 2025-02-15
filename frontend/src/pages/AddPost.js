import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./AddPost.css";

function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    // Récupérer l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("user"));

    // Liste des images du diaporama
    const images = [
        require('../photos/image2.jfif'),
        require('../photos/image3.jfif'),
        require('../photos/image4.jfif'),
    ];

    // Changer d'image toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Envoyer le post à Laravel
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // Ajouter automatiquement "[ Auteur: Nom de l'utilisateur ]" à la fin du contenu
        const updatedContent = `${content} [ Auteur: ${user.name} ]`;

        try {
            await api.post('/posts', {
                title,
                content: updatedContent, // Envoyer le contenu modifié
                user_id: user.id, // Associer le post à l'utilisateur connecté
            });

            // Redirection après l'ajout du post
            navigate("/user");
        } catch (error) {
            console.error("Erreur lors de l'ajout du post :", error);
            setError("Impossible d'ajouter le post.");
        }
    };

    return (
        <div className="container">
            {/* Partie gauche - Formulaire */}
            <div className="posts-container">
                <h1>Ajouter un Post</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Titre" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                    <textarea 
                        placeholder="Contenu du post" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit" className="user-btn">Publier</button>
                </form>
            </div>

            {/* Partie droite - Diaporama */}
            <div className="slideshow">
                <img src={images[currentImageIndex]} alt="Diaporama" className="slideshow-image" />
            </div>
        </div>
    );
}

export default AddPost;
