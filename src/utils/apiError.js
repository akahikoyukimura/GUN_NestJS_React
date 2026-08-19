export const handleApiError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || "Request failed",
      error: error.response.data?.error,
    };
  }
  if (error.request) {
    return {
      status: null,
      message: "Unable to connect to the server",
      error: "SERVER_UNREACHABLE",
    };
  }
  return {
    status: null,
    message:
      error.message || "An unexpected error occurred. Please contact support",
    error: "UNKNOWN_ERROR",
  };
};
