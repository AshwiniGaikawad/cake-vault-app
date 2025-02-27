import axios from 'axios';
import { Cake } from '../models/Cake';
import { CakeDTO } from '../models/CakeDTO';

let cakes: Cake[] = [
];
let cakesDTO: CakeDTO[] = [
];

const api = 'https://localhost:7211/api/cakes';

export const getCakes = async (): Promise<Cake[]> => {
    const response = await axios.get(api);
    return response.data;
};

export const createCake = async (cake: Cake): Promise<Cake> => {
    const response = await axios.post(api, cake);
    return response.data;
};

export const getCake = async (id: number): Promise<Cake> => {
    const response = await axios.get(`${api}/${id}`);
    return response.data;
};

// Simulate a POST request to add a new cake
export const addCake = async (cake: CakeDTO) => {
    try {
        const response = await axios.post(`${api}`, cake);
        return response.data; // Returns the newly created cake with ID
    } catch (error) {
        console.error('Error adding cake:', error);
        throw error; // Rethrow error for handling in the component
    }
};


// Simulate a PUT request to update an existing cake
export const updateCake = async (id: number, updatedCake: Cake): Promise<void> => {
    try {
        await axios.put(`${api}/${id}`, updatedCake);
    } catch (error) {
        console.error("Error updating cake:", error);
        throw new Error("Failed to update cake.");
    }
};

export const deleteCake = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${api}/${id}`);
    } catch (error) {
        throw new Error('Error deleting the cake.');
    }
};

