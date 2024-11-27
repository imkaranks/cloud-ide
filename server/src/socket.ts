import { exec } from "child_process";
import http from "http";
import path from "path";
import chokidar from "chokidar";
import { Server } from "socket.io";

const directoryToWatch = path.resolve(__dirname, "../tmp");

const watcher = chokidar.watch(directoryToWatch, {
  ignored: /node_modules/,
  persistent: true,
});

const io = new Server({
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

function initializeSocket(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  io.attach(server);

  watcher.on("all", (event, path) => {
    io.emit("files:changed");
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("terminal:in", (command) => {
      // console.log(command);

      exec(command, { cwd: directoryToWatch }, (error, stdout, stderr) => {
        if (error) {
          socket.emit("terminal:out", { error: `error: ${error}` });
          return;
        }
        if (stderr) {
          socket.emit("terminal:out", { error: `stderr: ${stderr}` });
          return;
        }
        socket.emit("terminal:out", { output: stdout });
      });
    });
  });
}

export { io, initializeSocket };
