import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  // validateStatus: (status) => status >= 200 && status < 500, // to retur error and not stop request (but the error is treated as valid res so the error not catch in try/catch)
});

export default api;
