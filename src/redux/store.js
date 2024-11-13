import { configureStore } from "@reduxjs/toolkit";
import TodosSlice from "./feature/TodosSlice";
export const store = configureStore({
  reducer: {
    todos: TodosSlice,
  },
});
