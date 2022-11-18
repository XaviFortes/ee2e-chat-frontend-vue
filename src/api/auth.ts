import axios from "axios";

// Import the API URL from the globals.
import { baseUrl } from "./globals";

const axiosConfig = {
  withCredentials: true,
};

export const login = async (email: string, password: string) => {
  // Send cookie with x-access-token response header
  axios.defaults.withCredentials = true;
  const res = axios.post(baseUrl + "/api/auth/signin", { email, password });
  return res;
};

export const register = (nick: string, email: string, password: string) => {
  return axios.post(baseUrl + "/api/auth/signup", { nick, email, password });
};

export const checkAuth = () => {
  axios.defaults.withCredentials = true;
  return axios.get(baseUrl + "/api/user/checkJWT", axiosConfig);
};

export const isLogged = async () => {
  axios.defaults.withCredentials = true;
  return axios.get(baseUrl + "/api/user/isLogged", axiosConfig);
};

export const logout = () => {
  axios.defaults.withCredentials = true;
  return axios.get(baseUrl + "/api/auth/logout", axiosConfig);
};

export const activate = (user_id: string, code: string) => {
  return axios.post(
    baseUrl + "/api/auth/verify",
    {
      user_id: user_id,
      code,
    },
    axiosConfig
  );
};

export const resendActivation = (email: string) => {
  return axios.post(
    baseUrl + "/api/mail/resend",
    {
      email,
    },
    axiosConfig
  );
};
