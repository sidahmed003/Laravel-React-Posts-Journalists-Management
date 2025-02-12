import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Charger les posts depuis l'API
    useEffect(() => {
        api.get('/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data); // Initialiser avec tous les posts
            })
            .catch(error => {
                console.error('Erreur API :', error);
                setError('Erreur lors du chargement des posts');
            });
    }, []);

    // Mettre à jour les posts affichés en fonction du mot-clé
    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    // Liste des images pour le diaporama
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

                {/* Barre de recherche */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher un post..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {error && <p className="error">{error}</p>}
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
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
