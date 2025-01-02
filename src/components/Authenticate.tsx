export const isAuthenticated = () => {
  const user = localStorage.getItem("user");

  try {
    if (user) {
      const parseUser = JSON.parse(user);

      if (parseUser.state && parseUser.state.token) {
        return parseUser.state.token;
      }
    }
  } catch {
    return null;
  }
};
