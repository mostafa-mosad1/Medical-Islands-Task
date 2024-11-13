import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNewTodo({ socket }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [todoData, setTodoData] = useState({
    todo: "",
    dueDate: "",
    completed: false,
    userId: 1,
  });

  const OnChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setTodoData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const OnSubmitHandler = (e) => {
    e.preventDefault();

    socket.emit("addTodo", {
      id: Math.random().toString(36).substr(2, 9),
      ...todoData,
    });

    setTodoData({
      todo: "",
      dueDate: "",
      completed: false,
      userId: 1,
    });
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        Add New Todo
      </Button>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{mx:"auto" , fontWeight:"bold"}}>{"Add New Todo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form onSubmit={OnSubmitHandler}>
              <TextField fullWidth sx={{ my: 2 }} onChange={OnChangeHandler} id="standard-basic" name='todo' label="Title" variant="standard" />
              <br />
              <TextField sx={{ my: 2 }} fullWidth onChange={OnChangeHandler} type="date" id="standard-basic" name='dueDate' variant="standard" />
              <br />
              <FormControlLabel sx={{ my: 2 }} onChange={OnChangeHandler} type="checkbox" control={<Checkbox />} name="completed" label="Completed" />
              <br />
              <Button sx={{ my: 2, mx: "auto", display: "block" }} type="submit" variant="contained">SAVE</Button>

            </form>
          </DialogContentText>
        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
}
