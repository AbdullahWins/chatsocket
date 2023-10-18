const messageModel = require("../models/chatModel");

const handleConnection = (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    console.log(message);
    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleString(),
    };
    messageModel.addMessage(newMessage);

    io.emit("message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

module.exports = {
  handleConnection,
};
