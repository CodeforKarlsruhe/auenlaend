// module to handle backend communications via axios. Includes functions to send requests and handle responses.

import axios, { type AxiosResponse } from 'axios';

// Define the base URL for the backend API
const BASE_URL = '/api'; // Adjust the URL as needed

const createEmptyResponse = (status: number,text: string): AxiosResponse<any> => {
    return {
        data: null,
        status: status,
        statusText: text,
        headers: {},
        config: {} as any,
        request: {} as any
    } as AxiosResponse<any>;
};

// Function to send a POST request to the backend
export const postToBackend = async (data: any, repeat: boolean = false): Promise<AxiosResponse<any>> => {
    try {
        const payload = { ...data, repeat };
        const response = await axios.post(`${BASE_URL}`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error('Error posting to backend:', error);
        const r = createEmptyResponse(-1,error as string);
        return r;
    }
};

// Function to send a GET request to the backend
export const getFromBackend = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.get(`${BASE_URL}`, { params });
        return response;
    } catch (error) {
        console.error('Error getting from backend:', error);
        const r = createEmptyResponse(-1,error as string);
        return r;
    }
};

// Function to handle backend responses uniformly (never throws; returns empty AxiosResponse on error)
export const handleBackendResponse = (response: AxiosResponse<any>): AxiosResponse<any> => {
    if (response.status === 200 || response.status === 202) {
        return response;
    } else {
        console.error('Backend responded with an error:', response.status, response.statusText);
        return createEmptyResponse(response.status, response.statusText);
    }
};
