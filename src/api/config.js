import Cookies from "js-cookie";

const api_url = process.env.REACT_APP_API_URL;

const tokenID = Cookies.get("token");
const userID = Cookies.get("userId");
let decodedToken = "";
let decodedUserID = "";

if (tokenID) {
  try {
    decodedToken = atob(tokenID);
  } catch (e) {
    console.error("Invalid token:", e);
  }
}

if (userID) {
  try {
    decodedUserID = atob(userID);
  } catch (e) {
    console.error("Invalid user ID:", e);
  }
}

export { api_url, decodedToken, decodedUserID };
