import { ReactNode } from "react";
import { SocketProvider } from "./SocketContext";

export default function AppProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SocketProvider>{children}</SocketProvider>;
}
