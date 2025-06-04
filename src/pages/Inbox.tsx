import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';

export function Inbox() {
    const todos = useAppSelector((state) => state.todos.list);

    return <TodoList todos={todos} />;
}
