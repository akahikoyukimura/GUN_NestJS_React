import { handleApiError } from "../utils/apiError";
import api from "./axios";

// login
export const login = async (data) => {
  try {
    //console.log("req login api", data);
    const response = await api.post("/auth/login", data);
    //console.log("res login api", response);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// register
export const registerUser = async (data) => {
  try {
    //console.log("req login api", data);
    const response = await api.post("/auth/register", data);
    //console.log("res login api", response);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
