import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Todo } from '@/types/todo.types';

interface TodoStore {
    list: Array<Todo>;
    addTodo: (todo: Omit<Todo, 'id' | 'completed'>) => void;
    removeTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
    editTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoStore>()(
    persist(
        immer((set) => ({
            list: [],
            addTodo: (todo) =>
                set((state) => {
                    state.list.push({
                        id: crypto.randomUUID(),
                        completed: false,
                        ...todo,
                    });
                }),
            removeTodo: (id) =>
                set((state) => {
                    state.list = state.list.filter((todo) => todo.id !== id);
                }),
            toggleComplete: (id) =>
                set((state) => {
                    const todo = state.list.find((t) => t.id === id);
                    if (todo) todo.completed = !todo.completed;
                }),
            editTodo: (updatedTodo) =>
                set((state) => {
                    const index = state.list.findIndex(
                        (t) => t.id === updatedTodo.id
                    );
                    if (index !== -1) {
                        state.list[index] = updatedTodo;
                    }
                }),
        })),
        {
            name: 'todo-list-storage',
        }
    )
);
