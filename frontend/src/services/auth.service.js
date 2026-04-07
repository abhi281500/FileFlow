import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fileflow-5ed5.onrender.com',
    withCredentials: false
});
// Aisa kuch hona chahiye aapke axios setup mein
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // debug

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await api.post('/api/user/register', {
            username,
            email,
            password
        })
        const token = response.data.token || response.data.accessToken;

        if (token) {
            localStorage.setItem("token", token);
            console.log("Token saved successfully!");
        }
        return response
    }

    catch (error) {
        console.error("register error : ", error);
        throw error;

    }

}


export const userlogin = async ({ identifier, password }) => {
    try {
        console.log("Sending to Backend:", { identifier, password });
        const response = await api.post('/api/user/login', {
            identifier,
            password
        });
        return response

    } catch (error) {
        console.error("Backend error : ", error.response?.data?.message);
        throw error;
    }
}


