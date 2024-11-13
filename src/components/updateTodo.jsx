import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material';
import {updateTodo} from './../redux/feature/TodosSlice/index';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import  DialogTitle  from '@mui/material/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateSingleTodo({ complete, myId, title, socket, dummy,date }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [done, setDone] = useState(complete);
    const [InitalDate, setInitalDate] = useState(date);
    const [todoTitle, setTodoTitle] = useState(title);
    const dispach = useDispatch();
    const handleChangeCheck = () => {
        setDone(!done);
    };

    const handleTitleChange = (e) => {
        setTodoTitle(e.target.value);
    };
    const handleUpdate = (e) => {
        e.preventDefault()
        if (dummy == "yes") {
            dispach(updateTodo({ id: myId, completed: done, todo: todoTitle }));
            setOpen(false);
        }
        if (dummy == "no") {
            // eslint-disable-next-line react/prop-types
            socket.emit("updateTodo", {
                id: myId,
                completed: done,
                todo: todoTitle,
                dueDate:InitalDate
            });
            setOpen(false);
        }
    };

    return (
        <React.Fragment>

            <IconButton
                onClick={handleClickOpen}
                color="primary"
                aria-label="edit"
            >
                <EditIcon />
            </IconButton>

            <Dialog
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                        <DialogTitle sx={{mx:"auto" , fontWeight:"bold"}}>{"Update Your Todo"}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form onSubmit={handleUpdate} >
                            <TextField fullWidth sx={{ my: 2 }} value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} id="standard-basic" name='todo' label="Title" variant="standard" />
                            <br />
                            <TextField sx={{ my: 2 }} fullWidth  value={InitalDate} onChange={(e) => setInitalDate(e.target.value)}   type="date" id="standard-basic" name='dueDate' variant="standard" />
                            <br />
                            <FormControlLabel sx={{ my: 2 }} checked={done} onChange={handleChangeCheck} type="checkbox" control={<Checkbox />} name="completed" label="Completed" />
                            <br />
                            <Button sx={{ my: 2, mx: "auto", display: "block" }} type="submit" variant="contained">SAVE</Button>

                        </form>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}
