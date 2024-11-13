import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddNewTodo from './AddNewTodo';
import { CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';

export default function NavBar({ socket, darkMode, setDarkMode }) {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todos App
          </Typography>
          <Typography sx={{mx:2}}  component="div" >

          
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
           
          </Typography>
          <AddNewTodo color="inherit" socket={socket} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
