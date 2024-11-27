import { createContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import useListenSocket from "../hooks/useListenSocket";

type SocketContextState = {
  socket: Socket | null;
} | null;

const SocketContext = createContext<SocketContextState>(null);

export const SocketProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { socket } = useListenSocket();

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
