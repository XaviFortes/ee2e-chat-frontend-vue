import axios from "axios";

const entryPoint = "http://localhost:8080";

export const login = async (email: string, password: string) => {
  // Send cookie with x-access-token response header
  axios.defaults.withCredentials = true;
  const res = axios.post(entryPoint + "/api/auth/signin", { email, password });
  return res;
};

export const register = (nick: string, email: string, password: string) => {
  return axios.post(entryPoint + "/api/auth/signup", { nick, email, password });
};
