import axios from "axios";
import { baseUrl } from "./globals";

// Include credentials axios
const axiosConfig = {
  withCredentials: true,
};

export const getChatRooms = async () => {
  // Include cookies and token with request
  const res = await axios.get(baseUrl + "/api/chat/getChatRooms", axiosConfig);
  return res;
};

export const getMessages = async (chat_id: string) => {
  const res = await axios.post(
    baseUrl + "/api/chat/getMessages/",
    {
      chatId: chat_id,
    },
    axiosConfig
  );
  return res;
};

export const sendMessage = async (chat_id: string, message: string) => {
  const res = await axios.post(
    baseUrl + "/api/chat/postMessage",
    {
      chatId: chat_id,
      message: message,
    },
    axiosConfig
  );
  return res;
};

export const register = (nick: string, email: string, password: string) => {
  return axios.post(baseUrl + "/api/auth/signup", { nick, email, password });
};
