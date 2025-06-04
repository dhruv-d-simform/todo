import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';
import { PageLayout } from '@/components/PageLayout';

export function Inbox() {
    const todos = useAppSelector((state) => state.todos.list);

    return (
        <PageLayout title="Inbox">
            <TodoList todos={todos} />
        </PageLayout>
    );
}
