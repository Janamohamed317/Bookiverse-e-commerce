import axios, { type AxiosResponse, type Method } from "axios";

const apiClient = axios.create({
    // baseURL: "https://book-store-seven-tan.vercel.app",
    baseURL: "http://localhost:5000/",
    headers: {
        'Content-Type': 'application/json',
    },
})

export const apiRequest = async <T>(url: string, method: Method, data?: any, token?: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
        headers: token ? { token } : {}
    });

    return response.data;
};