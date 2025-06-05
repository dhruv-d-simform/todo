import { format } from 'date-fns';
import type { Todo } from '@/types/todo.types';

export function filterTodos(
    todos: Array<Todo>,
    filter: string,
    date?: 'today' | 'upcoming'
): Array<Todo> {
    const today = format(new Date(), 'yyyy-MM-dd');

    filter = filter.toLocaleLowerCase();

    return todos.filter((todo) => {
        if (date === 'today') {
            if (todo.date !== today) return false;
        } else if (date === 'upcoming') {
            if (!todo.date || todo.date === today) return false;
        }

        if (todo.title.toLocaleLowerCase().includes(filter)) return true;
        if (todo.description?.toLowerCase().includes(filter)) return true;
        return false;
    });
}
