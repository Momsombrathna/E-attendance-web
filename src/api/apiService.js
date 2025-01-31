import { api_url, decodedToken } from "./config";
import axios from "axios";
import errorMessage from "../messages/errorMessages";

export const apiRequest = async (endpoint, method, data) => {
  const url = `${api_url}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "auth-token": decodedToken,
      },
      data,
    });

    return response;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};

export const apiAuthRequest = async (endpoint, method, data) => {
  const url = `${api_url}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};

export const apiLogOutRequest = async (endpoint, method) => {
  const url = `${api_url}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "auth-token": decodedToken,
      },
    });

    return response;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};
