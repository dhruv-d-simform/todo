import type { Todo } from '@/types/todo.types';
import { TodoItem } from './TodoItem';
import { useState } from 'react';

interface TodoListProps {
    todos: Array<Todo>;
}

export function TodoList({ todos }: TodoListProps) {
    const [showDetailsItem, setShowDetailsItem] = useState<string | null>(null);

    if (!todos.length) {
        return (
            <div className="flex flex-col justify-center items-center gap-1 pt-32">
                <img
                    src="/images/peace.png"
                    alt="Peace"
                    className="w-full max-w-[35rem]"
                />
                <p className="font-bold">Your peace of mind is priceless</p>
                <p className="text-sm">
                    Well Done! Your all task completed successfully.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 px-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    showDetails={showDetailsItem === todo.id}
                    toggleShowDetails={() => {
                        setShowDetailsItem(
                            showDetailsItem === todo.id ? null : todo.id
                        );
                    }}
                />
            ))}
        </div>
    );
}
