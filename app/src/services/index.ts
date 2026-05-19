/// typescript methods

import axios from "axios";

// Generic fetch function for GET requests
export const fetchDatamethod = async <T>(url: string): Promise<T> => {
    const response = await axios.get<T>(url, {
        headers: {
            'Content-Type': 'application/json', // Replace with your actual token
        }
    });
    return response.data;
};

// Function for POST requests
export const createDatamethod = async <T>(url: string, payload: T): Promise<T> => {
    const response = await axios.post<T>(url, payload);
    return response.data;
};

// Function for PUT requests
export const updateDatamethod = async <T>(url: string, payload: T): Promise<T> => {
    const response = await axios.put<T>(url, payload);
    return response.data;
};

// Function for DELETE requests
export const deleteDatamethod = async (url: string): Promise<void> => {
    await axios.delete(url);
};