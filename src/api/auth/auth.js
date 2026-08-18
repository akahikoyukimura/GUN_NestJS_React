export async function refreshAccessToken() {
  const response = await fetch(
    "http://localhost:3001/auth/refresh",
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Refresh failed");
  }

  const data = await response.json();

  sessionStorage.setItem(
    "access_token",
    data.access_token
  );

  return data.access_token;
}