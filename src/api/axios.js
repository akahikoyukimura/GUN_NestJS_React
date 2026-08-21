import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  // validateStatus: (status) => status >= 200 && status < 500, // to retur error and not stop request (but the error is treated as valid res so the error not catch in try/catch)
});

api.interceptors.request.use(
  (config) => {
    console.log("FULL URL:", `${config.baseURL}${config.url}`);
    console.log("REQUEST PAYLOAD:", config.data);

    return config;
  },
  (error) => {
    console.log("REQUEST INTERCEPTOR ERROR:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log("RESPONSE:", response.data);

    return response;
  },
  (error) => {
    console.log("RESPONSE INTERCEPTOR ERROR:", error);

    return Promise.reject(error);
  },
);

export default api;
