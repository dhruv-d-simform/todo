import { Todo } from '@/types/todo.types';
import { TodoForm } from './TodoForm';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { removeTodo, toggleComplete } from '@/redux/todoSlice';

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="p-6 border">
            <p>
                <span className="font-bold">ID : </span> {todo.id}
            </p>
            <p>
                <span className="font-bold">Title : </span>
                {todo.title}
            </p>
            <p>
                <span className="font-bold">Description : </span>
                {todo.description}
            </p>
            <p>
                <span className="font-bold">Priority : </span>
                {todo.priority}
            </p>
            <p>
                <span className="font-bold">Date : </span>
                {todo.date}
            </p>
            <TodoForm type="edit" todo={todo}>
                <Button variant="outline">Edit</Button>
            </TodoForm>
            <Button
                variant="destructive"
                className="mx-2"
                onClick={() => dispatch(removeTodo(todo.id))}
            >
                Delete
            </Button>
            <Button onClick={() => dispatch(toggleComplete(todo.id))}>
                {!todo.completed && 'NOT'} completed.
            </Button>
        </div>
    );
}
