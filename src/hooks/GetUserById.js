// Desc: User Fetch Component
import { useState, useEffect } from "react";
import { api_url, decodedToken } from "../api/config";
import axios from "axios";

export const useUserDetail = (userID) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`${api_url}/user/get/${userID}`, {
          headers: {
            "auth-token": decodedToken,
          },
        });
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserDetail();
  }, [userID]);

  return { user, isLoading };
};
