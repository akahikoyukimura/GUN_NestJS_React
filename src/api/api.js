import { refreshAccessToken } from "./auth/auth";

export async function apiFetch(
  url,
  options = {}
) {
  let token =
    sessionStorage.getItem("access_token");

  let response = await fetch(
    `http://localhost:3001${url}`,
    {
      ...options,

      headers: {
        ...options.headers,

        Authorization: `Bearer ${token}`,
      },

      credentials: "include",
    }
  );

  // Access token expired
  if (response.status === 401) {
    try {
      token = await refreshAccessToken();

      response = await fetch(
        `http://localhost:3001${url}`,
        {
          ...options,

          headers: {
            ...options.headers,

            Authorization:
              `Bearer ${token}`,
          },

          credentials: "include",
        }
      );

    } catch {
      sessionStorage.removeItem(
        "access_token"
      );

      sessionStorage.removeItem(
        "user"
      );

      window.location.href = "/login";
    }
  }

  return response;
}