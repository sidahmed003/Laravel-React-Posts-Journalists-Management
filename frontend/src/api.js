import axios from 'axios';
import React from 'react';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Assure-toi que le port est correct
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
