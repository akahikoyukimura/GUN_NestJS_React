export const getToken = () => {
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
};

// export const setToken = (token, rememberMe) => {
//   if (rememberMe) {
//     localStorage.setItem("access_token", token);
//     sessionStorage.removeItem("access_token");
//   } else {
//     sessionStorage.setItem("access_token", token);
//     localStorage.removeItem("access_token");
//   }
// };

export const removeToken = () => {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
};
