import { TodoForm } from '@/components/TodoForm';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeTodo, toggleComplete } from '@/redux/todoSlice';

export function Today() {
    const todos = useAppSelector((state) => state.todos.list);
    const dispatch = useAppDispatch();

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
            ))}
        </div>
    );
}
