import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./User.css";

function User() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Charger les derniers posts de tous les utilisateurs
    useEffect(() => {
        api.get('/posts') // Mettre à jour la route pour récupérer tous les posts
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur API :', error);
                setError('Erreur lors du chargement des posts');
            });
    }, []);

    // Liste des images dans /src/photos
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
        <div className="container">
            {/* Partie gauche - Posts */}
            <div className="posts-container">
                <div className="user-header">
                    <Link to="/ajouter-post" className="user-btn">Ajouter un Post</Link>
                    <Link to="/mes-posts" className="user-btn">Mes Posts</Link>
                </div>
                <h1>Last Posts</h1>
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
                    <p className="no-posts">Aucun post trouvé.</p>
                )}
            </div>

            {/* Partie droite - Diaporama */}
            <div className="slideshow">
                <img src={images[currentImageIndex]} alt="Diaporama" className="slideshow-image" />
            </div>
        </div>
    );
}

export default User;
