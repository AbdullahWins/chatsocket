const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const chatModel = require("./models/chatModel");
const path = require("path"); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve your static files (HTML, JS, CSS, etc.) from a public directory
app.use(express.static("public"));

// Serve your "chat.html" from the "views" folder
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "chat.html"));
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    console.log(message);
    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleString(),
    };
    chatModel.addMessage(newMessage);

    io.emit("message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
