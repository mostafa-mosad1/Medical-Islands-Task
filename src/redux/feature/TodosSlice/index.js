import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const initialState = {
  loading: false,
  dummyTodos: [],
};
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (_, thunkapi) => {
    const { rejectWithValue } = thunkapi;
    try {
      const { status, data } = await axios.get("https://dummyjson.com/todos");
      console.log(data);
      if (status === 200) {
        return data.todos;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;
    try {
      const { status, data } = await axios.delete(
        `https://dummyjson.com/todos/${id}`
      );
      console.log(data);
      if (status === 200) {
        toast.success("Todo Delete Successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
      return data.id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, completed, todo }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { status, data } = await axios.put(
        `https://dummyjson.com/todos/${id}`,
        { completed, todo }
      );
      if (status === 200) {
        toast.success("Todo Update Successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        console.log(data);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (dataTodo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { status, data } = await axios.post(
        `https://dummyjson.com/todos/add`,
        dataTodo
      );
      if (status === 201) {
        toast.success("Todo Add Successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        console.log(data);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const TodosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.dummyTodos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.dummyTodos = state.dummyTodos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload;
        const index = state.dummyTodos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        state.dummyTodos[index] = updatedTodo;
      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.dummyTodos = [...state.dummyTodos, action.payload];
      })
      .addCase(addTodo.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default TodosSlice.reducer;
