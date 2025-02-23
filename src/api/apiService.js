import { api_url, decodedToken, decodedUserID } from "./config";
import axios from "axios";
import errorMessage from "../messages/errorMessages";
import Swal from "sweetalert2";

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

export const updateRequest = async (endpoint, method, data) => {
  const url = `${api_url}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "multipart/form-data",
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

export const apiGetService = async (endpoint, method) => {
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

export const QueryRequest = async (endpoint, method, data = null) => {
  const url = `${api_url}${endpoint}`;

  try {
    const config = {
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": decodedToken,
      },
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      config.data = data;
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};

export const DeleteRequest = async (endpoint, method, ownerId) => {
  const url = `${api_url}${endpoint}`;

  const userConfirmed = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!userConfirmed.isConfirmed) {
    return;
  }

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "auth-token": decodedToken,
      },
      data: {
        userId: ownerId,
      },
    });

    return response;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again later.",
    });
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};

export const CreateClassRequest = async (endpoint, method, classDes) => {
  const url = `${api_url}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "auth-token": decodedToken,
      },
      data: {
        className: classDes,
      },
    });

    return response;
  } catch (error) {
    console.log(errorMessage.apiRequestError, error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again later.",
    });
    throw error.response
      ? error.response.data
      : new Error(errorMessage.errorOccurred);
  }
};
