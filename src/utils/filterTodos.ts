import { format } from 'date-fns';
import type { Todo } from '@/types/todo.types';

type DateOptions = 'today' | 'upcoming';

function filterTodoByDate(todo: Todo, date?: DateOptions) {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (date === 'today') {
        if (todo.date !== today) return true;
    } else if (date === 'upcoming') {
        if (!todo.date || todo.date === today) return true;
    }

    return false;
}

export function filterTodos(
    todos: Array<Todo>,
    filter: string,
    date?: DateOptions
): Array<Todo> {
    filter = filter.toLowerCase();

    return todos.filter((todo) => {
        if (filterTodoByDate(todo, date)) return false;

        if (todo.title.toLowerCase().includes(filter)) return true;
        if (todo.description?.toLowerCase().includes(filter)) return true;
        return false;
    });
}
