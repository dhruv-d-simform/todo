import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';
import { PageLayout } from '@/components/PageLayout';

export function Today() {
    const todos = useAppSelector((state) => state.todos.list);

    return (
        <PageLayout title="Today">
            <TodoList todos={todos} />
        </PageLayout>
    );
}
