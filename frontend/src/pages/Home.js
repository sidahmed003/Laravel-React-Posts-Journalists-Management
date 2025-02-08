import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Charger les posts
    useEffect(() => {
        api.get('/posts')
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
                <div className="header">
                    <h1>Last Posts</h1>
                    <div className="auth-buttons">
                        <Link to="/login" className="login-button">Se connecter</Link>
                        <Link to="/register" className="register-button">S'inscrire</Link>
                    </div>
                </div>
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

export default Home;
