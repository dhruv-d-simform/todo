import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '@/types/todo.types';

interface TodoState {
    list: Array<Todo>;
}

const TODO_LIST_KEY = 'TODO_LIST';

const savedTodos = JSON.parse(localStorage.getItem(TODO_LIST_KEY) || '[]');

const initialState: TodoState = {
    list: Array.isArray(savedTodos) ? savedTodos : [],
};

const saveToLocalStorage = (todos: Array<Todo>) => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.list.push(action.payload);
            saveToLocalStorage(state.list);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(
                (todo) => todo.id !== action.payload
            );
            saveToLocalStorage(state.list);
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const todo = state.list.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
            saveToLocalStorage(state.list);
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.list.findIndex(
                (t) => t.id === action.payload.id
            );
            if (index !== -1) {
                state.list[index] = action.payload;
            }
            saveToLocalStorage(state.list);
        },
    },
});

export const { addTodo, removeTodo, toggleComplete, editTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
