import { useState, useEffect } from "react";
import axiosInstance from "../axios";

function useUserInfo(userId) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/users/${userId}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  }, [userId]);

  return userInfo;
}

export default useUserInfo;
