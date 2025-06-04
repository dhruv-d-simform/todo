import { Todo } from '@/types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Array<Todo>;
}

export function TodoList({ todos }: TodoListProps) {
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
        <div>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
