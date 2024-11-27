import "dotenv/config";
import http from "http";
import app from "./app";
import { initializeSocket } from "./socket";

const PORT = process.env.PORT;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log("Server is up and running at port:%d", PORT);
});
