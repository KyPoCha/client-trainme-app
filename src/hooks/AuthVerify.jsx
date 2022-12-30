import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const AuthVerify = ({ logoutHandler }) => {
  let location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 600_000 < Date.now()) {
        logoutHandler();
      }
    }
  }, [location, logoutHandler]);

  return;
};
