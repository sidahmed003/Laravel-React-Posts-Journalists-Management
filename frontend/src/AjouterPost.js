import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './AjouterPost.css';

function AjouterPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/posts', { title, content });
            navigate('/'); // Redirige vers la liste des posts après ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout du post :', error);
            setError('Impossible d\'ajouter le post. Réessayez.');
        }
    };

    return (
        <div className="form-container">
            <h2>Ajouter un nouveau post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Contenu:
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </label>

                <button type="submit" className="submit-btn">Ajouter</button>
            </form>
        </div>
    );
}

export default AjouterPost;
