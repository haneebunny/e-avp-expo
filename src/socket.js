import { io } from "socket.io-client";

// const URL =
//   process.env.NODE_ENV === "production"
//     ? "http://3.35.50.37:4004"
//     : "http://192.168.123.142:3001";

export const URL = "http://3.35.50.37:4004";
// const URL = "http://192.168.123.142:3001";

const config = {
  reconnectionDelay: 3000,
  autoConnect: false,
  transports: ["websocket"],
};

export const socket = io(URL, config);
