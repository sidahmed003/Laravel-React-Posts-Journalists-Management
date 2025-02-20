import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./MyPosts.css";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
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
        api.get(`/user/${user.id}/posts`)
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur API :', error);
                setError('Erreur lors du chargement de vos posts.');
            });
    }, [navigate, user]);

    // Filtrer les posts en fonction du mot-clé
    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    // Supprimer un post
    const handleDelete = (postId) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
            api.delete(`/posts/${postId}`)
                .then(() => {
                    // Mettre à jour la liste des posts après suppression
                    const updatedPosts = posts.filter(post => post.id !== postId);
                    setPosts(updatedPosts);
                    setFilteredPosts(updatedPosts);
                })
                .catch(error => {
                    console.error("Erreur de suppression :", error);
                    setError("Impossible de supprimer ce post.");
                });
        }
    };

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
                            <div className="post-header">
                                <h2>{post.title}</h2>
                                <button className="delete-button" onClick={() => handleDelete(post.id)}>Supprimer</button>
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

export default MyPosts;
