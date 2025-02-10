import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./MyPosts.css";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirige vers la connexion si l'utilisateur n'est pas authentifié
            return;
        }

        // Charger uniquement les posts de l'utilisateur connecté
        api.get(`/user/${user.id}/posts`) // Assurez-vous que cette route existe dans Laravel
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur API :', error);
                setError('Erreur lors du chargement de vos posts.');
            });
    }, [navigate, user]);

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

    return (
        <div className="myposts-container">
            {/* Partie gauche - Posts de l'utilisateur */}
            <div className="posts-container">
                <h1>{user ? user.name : "Utilisateur"} - Mes Posts</h1>
                {error && <p className="error">{error}</p>}
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-title">
                                <h2>{post.title}</h2>
                            </div>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-posts">Vous n'avez pas encore publié de posts.</p>
                )}
            </div>

            {/* Partie droite - Diaporama */}
            <div className="slideshow">
                <img src={images[currentImageIndex]} alt="Diaporama" className="slideshow-image" />
            </div>
        </div>
    );
}

export default MyPosts;
