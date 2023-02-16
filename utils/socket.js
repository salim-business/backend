const { Server } = require("socket.io");
let io;
module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("socket.io is not initialized!");
    }
    return io;
  },
};
