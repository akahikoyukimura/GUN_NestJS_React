import { handleApiError } from "../utils/apiError";
import api from "./axios";

export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
