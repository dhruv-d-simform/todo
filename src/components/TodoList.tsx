import { Todo } from '@/types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Array<Todo>;
}

export function TodoList({ todos }: TodoListProps) {
    if (!todos.length) {
        return (
            <div>
                <p>No todos.</p>
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
