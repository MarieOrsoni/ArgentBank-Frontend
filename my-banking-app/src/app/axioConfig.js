import axios from "axios";

import config from "./config.js";

const api = axios.create({
    baseURL: config.apiBaseUrl,
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
  



