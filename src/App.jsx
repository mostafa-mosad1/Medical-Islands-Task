import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import NavBar from './components/NavBar';
import TodosTable from './components/TodosTable';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';




const socket = io("http://localhost:3001");

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });


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
    <ThemeProvider theme={theme}>
         <CssBaseline />
    <NavBar darkMode={darkMode} setDarkMode={setDarkMode} socket={socket} />
    <Container sx={{my:2}} fixed>
    <TodosTable AllTodos={todos} socket={socket} />
    </Container>
    </ThemeProvider>
    </>
   
  );
}

export default App;
