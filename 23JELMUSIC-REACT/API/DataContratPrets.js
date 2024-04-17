import axios from 'axios';

const API_URL = 'http://192.168.198.149/23JELMUSIC_API/public';

// Fonction pour créer une entité
const createContratsPrets = async (entityData) => {
    try {
        const response = await axios.post(`${API_URL}/contratPret/ajouter`, entityData);
        return response.data;
    } catch (error) {
        console.error('Error creating entity:', error);
        throw error;
    }
};

// Fonction pour récupérer une seule entité par son ID
const getContratsPretsById = async (entityId) => {
    try {
        const response = await axios.get(`${API_URL}/contratPret/consulter/${entityId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching entity by ID:', error);
        throw error;
    }
};

// Fonction pour récupérer toutes les entités
const getContratsPrets = async () => {
    try {
        const response = await axios.get(`${API_URL}/contratPret/lister`);
        return response.data;
    } catch (error) {
        console.error('Error fetching entities:', error);
        throw error;
    }
};

// Fonction pour mettre à jour une entité
const updateContratsPrets = async (entityId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/contratPret/modifier/${entityId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating entity:', error);
        throw error;
    }
};

// Fonction pour supprimer une entité
const deleteContratsPrets = async (entityId) => {
    try {
        const response = await axios.delete(`${API_URL}/contratPret/supprimer/${entityId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting entity:', error);
        throw error;
    }
};

export { createContratsPrets, getContratsPrets, updateContratsPrets, deleteContratsPrets, getContratsPretsById };