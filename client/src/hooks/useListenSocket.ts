import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useListenSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return { socket };
}
