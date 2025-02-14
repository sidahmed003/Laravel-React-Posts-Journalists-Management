import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./User.css";

function User() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // Charger les derniers posts de tous les utilisateurs
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

    // Filtrer les posts en fonction du mot-clé
    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

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
                    <button className="logout-btn" onClick={handleLogout}>Se Déconnecter</button>
                    <Link to="/ajouter-post" className="user-btn">Ajouter un Post</Link>
                    <Link to="/myposts" className="user-btn">Mes Posts</Link>
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

                <h1>Last Posts</h1>
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

export default User;
