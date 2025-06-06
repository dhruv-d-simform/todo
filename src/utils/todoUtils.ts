import { format } from 'date-fns';
import type { Priority } from '@/types/todo.types';

export function getPriorityStyles(priority: Priority) {
    switch (priority) {
        case 'high':
            return {
                color: '#E23B37',
                bgColor: '#F8DAD8',
            };
        case 'medium':
            return {
                color: '#2089E5',
                bgColor: '#E0EDF7',
            };
        case 'low':
            return {
                color: '#FE6E01',
                bgColor: '#FBEDE3',
            };
        default:
            const _exhaustiveCheck: never = priority; // eslint-disable-line no-case-declarations
            return _exhaustiveCheck;
    }
}

export function getCalendarLabelAndColor(date: string | undefined) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd');

    if (date === today) {
        return {
            label: 'Today',
            color: '#00b330',
        };
    } else if (date === tomorrow) {
        return {
            label: 'Tomorrow',
            color: '#db7c00',
        };
    } else {
        return {
            label: 'Upcoming',
            color: '#975dee',
        };
    }
}
