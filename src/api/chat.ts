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

export const createChatRoom = async (
  name: string,
  desc: string,
  pic_url: string
) => {
  const res = await axios.post(
    baseUrl + "/api/chat/createChatRoom",
    {
      name: name,
      desc: desc,
      pic_url: pic_url,
    },
    axiosConfig
  );
  return res;
};

export const joinChatRoom = async (chat_id: string) => {
  const res = await axios.post(
    baseUrl + "/api/chat/joinChatRoom",
    {
      chatId: chat_id,
    },
    axiosConfig
  );
  return res;
};
