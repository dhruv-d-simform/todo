import { useTodoStore } from '@/zustand';
import { TodoList } from '@/components/TodoList';
import { PageLayout } from '@/components/PageLayout';
import { useFilterContext } from '@/contexts/FilterContext';
import { filterTodos } from '@/utils/filterTodos';

export function Upcoming() {
    const filter = useFilterContext();

    const todos = useTodoStore((state) => state.list);

    const filteredTodos = filterTodos(todos, filter, 'upcoming');

    return (
        <PageLayout title="Upcoming">
            <TodoList todos={filteredTodos} />
        </PageLayout>
    );
}
