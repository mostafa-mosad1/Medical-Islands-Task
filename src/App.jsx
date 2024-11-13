import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import NavBar from './components/NavBar';
import TodosTable from './components/TodosTable';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>


const socket = io("http://localhost:3001");

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    socket.on("todosUpdated", (updatedAllTodos) => {
      setTodos(updatedAllTodos);
    });

    return () => {
      socket.off("todosUpdated");
    };
  }, []);

  return (
    <>
    <NavBar socket={socket} />
    <Container sx={{my:2}} fixed>
    <TodosTable AllTodos={todos} socket={socket} />
    </Container>
    </>
   
  );
}

export default App;
