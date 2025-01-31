import Cookies from "js-cookie";
import { api_url, decodedToken, decodedUserID } from "../api/config";
import Swal from "sweetalert2";
import { apiAuthRequest } from "../api/apiService";
import apiPoints from "../api/endpoints";
import { adminRoutes, userRoutes, authRoutes } from "../routes/routesPoint";

const login = async (data) => {
  const { username, password, setIsLoading, setErrors } = data;
  let response;
  const loginData = {
    username,
    password,
  };

  try {
    setIsLoading(true);
    response = await apiAuthRequest(
      apiPoints.auth.login,
      apiPoints.methods.POST,
      JSON.stringify(loginData)
    );

    const result = response.data;

    if (response.status !== 200) {
      setIsLoading(false);
      setErrors({
        message: result.message || "An error occurred. Please try again",
      });
    } else {
      setIsLoading(false);
      // encode the token
      const tokens = btoa(result.user.tokens[result.user.tokens.length - 1]);
      const userId = btoa(result.user._id);

      Cookies.set("token", tokens, { expires: 30 });
      Cookies.set("userId", userId, { expires: 30 });
      Cookies.set("role", result.user.role, { expires: 30 });
      Cookies.set("username", result.user.username, { expires: 30 });
      Cookies.set("email", result.user.email, { expires: 30 });
      Cookies.set("profile", result.user.profile, { expires: 30 });

      if (result.user.role === "admin") {
        window.location.href = adminRoutes.dashboard;
      } else if (result.user.role === "user") {
        window.location.href = userRoutes.home;
      }
    }
  } catch (error) {
    setIsLoading(false);
    setErrors({
      message: error.message || "An error occurred. Please try again",
    });
    console.log("Login error:", error);
  }
};

// logout
const logout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to logout",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logging out...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      fetch(`${api_url}${apiPoints.auth.logout}`, {
        method: apiPoints.methods.POST,
        headers: {
          "auth-token": decodedToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Cookies.remove("token");
          Cookies.remove("userId");
          Cookies.remove("role");
          Cookies.remove("username");
          Cookies.remove("email");
          Cookies.remove("profile");
          Swal.close();
          window.location.href = authRoutes.login;
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  });
};

const hasRole = (targetRole) => {
  const role = Cookies.get("role");
  return role === targetRole;
};

const isAdmin = () => hasRole("admin");
const isUser = () => hasRole("user");
const isLogged = () => !!decodedToken;
const isNotLogged = () => !decodedToken;

export { isAdmin, isUser, isLogged, login, isNotLogged, logout };
