import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const ApiInstance = axios.create({
  baseURL: baseUrl,
});

ApiInstance.interceptors.request.use((config) => {
  //add configuration to Axios Request headers
  return config;
});