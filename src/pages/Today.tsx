import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';

export function Today() {
    const todos = useAppSelector((state) => state.todos.list);

    return <TodoList todos={todos} />;
}
