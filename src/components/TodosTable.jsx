import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../redux/feature/TodosSlice';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodo } from './../redux/feature/TodosSlice/index';
import UpdateSingleTodo from './updateTodo';

export default function TodosTable({ AllTodos, socket }) {
    const { dummyTodos } = useSelector((state) => state.todos);
    const dispatch = useDispatch();


    const deleteHandler = (id) => {
        // eslint-disable-next-line react/prop-types
        socket.emit("deleteTodo", id);
    };
    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);
    console.log(AllTodos)
    console.log(dummyTodos)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Completed</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {AllTodos.map((todo) => (
                        <TableRow
                            key={todo.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {todo.id}
                            </TableCell>
                            <TableCell align="center">{todo.todo}</TableCell>
                            <TableCell align="center">{todo.completed ? "Completed" : "UnCompleted"}</TableCell>
                            <TableCell align="center">{todo.dueDate}</TableCell>
                            <TableCell align="right"> 
                            <UpdateSingleTodo complete={todo.completed} date={todo.dueDate} myId ={todo.id} title={todo.todo} socket={socket} dummy={"no"} />

                                <IconButton
                                    onClick={() => deleteHandler(todo.id)}
                                    sx={{ color: 'red' }}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton></TableCell>
                        </TableRow>
                    ))}

                    {dummyTodos.map((todo) => (
                        <TableRow
                            key={todo.todo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {todo.id}
                            </TableCell>
                            <TableCell align="center">{todo.todo}</TableCell>
                            <TableCell align="center">{todo.completed ? "Completed" : "UnCompleted"}</TableCell>
                            <TableCell align="center">{"11/11/2024"}</TableCell>
                            <TableCell align="right">
                              
                                <UpdateSingleTodo complete={todo.completed} date={"11/11/2024"} myId ={todo.id} title={todo.todo} socket={socket} dummy={"dummy"} />
                                <IconButton
                                    onClick={() => {
                                        dispatch(deleteTodo(todo.id));
                                    }}
                                    sx={{ color: 'red' }}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
