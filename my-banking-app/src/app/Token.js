import axios from "axios";
import store from "./Store.js";
import {loginUser, setToken } from "./slices.js";

import config from "./config.js";

const api = axios.create({
    baseURL: config.apiBaseUrl,
});
api.interceptors.request.use(
    (config) => {
        const token = store.getState().authToken.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
//Refresh token if 401 occurs
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = store.getState().authToken.refreshToken;
                const response = await api.post("/authToken/refresh", {token: refreshToken});
                const newAccessToken = response.data.accessToken;
                store.dispatch(setToken(newAccessToken));
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(loginUser());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default api;
  



