import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';
import { PageLayout } from '@/components/PageLayout';

export function Upcoming() {
    const todos = useAppSelector((state) => state.todos.list);

    return (
        <PageLayout title="Upcoming">
            <TodoList todos={todos} />
        </PageLayout>
    );
}
