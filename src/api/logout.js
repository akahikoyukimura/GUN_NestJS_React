async function logout() {
  await fetch(
    "http://localhost:3001/auth/logout",
    {
      method: "POST",
      credentials: "include",
    }
  );

  sessionStorage.removeItem(
    "access_token"
  );

  sessionStorage.removeItem(
    "user"
  );

  window.location.href = "/login";
}