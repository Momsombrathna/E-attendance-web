import Cookies from "js-cookie";
import { api_url, decodedToken, decodedUserID } from "../api/config";
import Swal from "sweetalert2";

const login = async (data) => {
  const { username, password, setIsLoading, setErrors } = data;
  let response;
  const loginData = {
    username,
    password,
  };

  try {
    response = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      setIsLoading(false);
      setErrors({
        message: result.error || "An error occurred. Please try again",
      });
    } else {
      setIsLoading(false);
      // encode the token
      const tokens = btoa(result.user.tokens[result.user.tokens.length - 1]);
      const userId = btoa(result.user._id);

      Cookies.set("token", tokens, { expires: 30 });
      Cookies.set("userId", userId, { expires: 30 });
      Cookies.set("role", result.user.role, { expires: 30 });

      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    if (response.status === 500) {
      setErrors({ message: "Server error, try again later" });
    } else if (response.status === 401) {
      setErrors({ message: "Invalid credentials" });
    } else if (response.status === 404) {
      setErrors({ message: "User not found" });
    } else if (response.status === 400) {
      setErrors({ message: "Bad request your email is not verified" });
    } else if (response.status === 403) {
      setErrors({ message: "Forbidden" });
    } else {
      setErrors({ message: "An error occurred, try again later" });
    }
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
      fetch(`${api_url}/auth/logout/${decodedUserID}`, {
        method: "POST",
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
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
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
