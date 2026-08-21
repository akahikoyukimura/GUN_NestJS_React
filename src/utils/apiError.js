export const handleApiError = (error) => {
  if (error.response) {
    console.log("res error login api", error.response);
    return {
      status: error.response.status,
      message: error.response.data?.message || "Request failed",
      error: error.response.data?.error,
    };
  }
  if (error.request) {
    console.log("req error login api", error.request);
    return {
      status: null,
      message: "Unable to connect to the server",
      error: "SERVER_UNREACHABLE",
    };
  }
  console.log("gen error login api", error);
  return {
    status: null,
    message:
      error.message || "An unexpected error occurred. Please contact support",
    error: "UNKNOWN_ERROR",
  };
};
