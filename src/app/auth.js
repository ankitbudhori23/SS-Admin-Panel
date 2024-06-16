import axios from "axios";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = ["login"];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r),
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    axios.defaults.headers.common["x-auth-token"] = `${TOKEN}`;

    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      },
    );

    return TOKEN;
  }
};

export default checkAuth;
