import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
});

// Interceptor để gắn access token vào request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            console.log("token", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
