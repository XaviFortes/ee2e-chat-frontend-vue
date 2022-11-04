import axios from "axios";

const entryPoint = "http://localhost:8080";
// Include credentials axios
const axiosConfig = {
  withCredentials: true,
};

export const getChatRooms = async () => {
  // Include cookies and token with request
  const res = await axios.get(
    entryPoint + "/api/chat/getChatRooms",
    axiosConfig
  );
  return res;
};

export const getUser = async (uid: string) => {
  const res = await axios.post(
    entryPoint + "/api/user/getUser/",
    {
      uuid: uid,
    },
    axiosConfig
  );
  return res;
};

export const register = (nick: string, email: string, password: string) => {
  return axios.post(entryPoint + "/api/auth/signup", { nick, email, password });
};
