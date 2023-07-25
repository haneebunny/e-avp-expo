import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://10.0.2.2:3001";

const config = {
  reconnection: true,
  reconnectionAttempts: 5, // 재연결 시도 횟수
  transports: ["websocket"],
  rejectUnauthorized: false,
};

export const socket = io(URL, config);
