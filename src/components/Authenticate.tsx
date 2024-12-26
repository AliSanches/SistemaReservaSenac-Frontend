export const isAuthenticated = () => {
  const { token } = JSON.parse(localStorage.getItem("user")!).state;
  return token;
};
