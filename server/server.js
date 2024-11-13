const express = require("express");
const { createServer } = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let todos = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addTodo", (newTodo) => {
    todos.push(newTodo);
    io.emit("todosUpdated", todos);
  });

  socket.on("updateTodo", (updatedTodo) => {
    todos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    io.emit("todosUpdated", todos);
  });

  socket.on("deleteTodo", (todoId) => {
    todos = todos.filter((todo) => todo.id !== todoId);
    io.emit("todosUpdated", todos);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
