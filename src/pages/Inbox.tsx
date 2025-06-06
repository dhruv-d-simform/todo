import { useAppSelector } from '@/redux/hooks';
import { TodoList } from '@/components/TodoList';
import { PageLayout } from '@/components/PageLayout';
import { useFilterContext } from '@/contexts/FilterContext';
import { filterTodos } from '@/utils/filterTodos';

export function Inbox() {
    const filter = useFilterContext();

    const todos = useAppSelector((state) => state.todos.list);

    const filteredTodos = filterTodos(todos, filter);

    return (
        <PageLayout title="Inbox">
            <TodoList todos={filteredTodos} />
        </PageLayout>
    );
}
