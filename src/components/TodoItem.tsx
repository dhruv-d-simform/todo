import type { Todo } from '@/types/todo.types';
import { TodoForm } from './TodoForm';
import { useAppDispatch } from '@/redux/hooks';
import { removeTodo, toggleComplete } from '@/redux/todoSlice';
import { getCalendarLabelAndColor, getPriorityStyles } from '@/utils/todoUtils';
import { TickIcon } from '@/assets/TickIcon';
import { EditIcon } from '@/assets/EditIcon';
import { DeleteIcon } from '@/assets/DeleteIcon';
import { CalendarIcon } from '@/assets/CalendarIcon';
import { Flag } from 'lucide-react';
import { format } from 'date-fns';

interface TodoItemProps {
    todo: Todo;
    showDetails: boolean;
    toggleShowDetails: () => void;
}

export function TodoItem({
    todo,
    showDetails,
    toggleShowDetails,
}: TodoItemProps) {
    const dispatch = useAppDispatch();

    const { bgColor: priorityBgColor, color: priorityColor } =
        getPriorityStyles(todo.priority);

    const { label: calendarLabel, color: calendarColor } =
        getCalendarLabelAndColor(todo.date);

    return (
        <div
            className={`hover:bg-header-sidebar hover:dark:bg-header-sidebar-dark cursor-pointer flex gap-4 p-4 rounded-xl border ${showDetails ? 'border-black dark:border-white' : 'border-[#00000050] dark:border-[#ffffff50]'}`}
            onClick={toggleShowDetails}
        >
            <button
                className="w-6 h-6 mt-0.5 flex justify-center items-center rounded-full cursor-pointer"
                title={
                    todo.completed ? 'Mark as not complete' : 'Mark as complete'
                }
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleComplete(todo.id));
                }}
                style={{
                    backgroundColor: priorityBgColor,
                    color: priorityColor,
                    border: `2px solid ${priorityColor}`,
                }}
            >
                {todo.completed && <TickIcon />}
            </button>
            <div className="flex-1 flex flex-col gap-2">
                <h3
                    className={`text-xl font-bold ${!showDetails && 'line-clamp-1'} ${todo.completed && 'opacity-50 line-through'}`}
                >
                    {todo.title}
                </h3>

                <p
                    className={`text-sm opacity-90 ${!showDetails && 'line-clamp-3'}`}
                >
                    {todo.description}
                </p>

                <div className="flex justify-between items-center max-w-64">
                    <p
                        className="flex items-center gap-1 flex-1"
                        style={{ color: priorityColor }}
                    >
                        <Flag className="w-5" />
                        <span className="capitalize font-medium text-[15px] tracking-wider">
                            {todo.priority}
                        </span>
                    </p>

                    {todo.date && (
                        <p
                            className="flex items-center gap-1 flex-1"
                            style={{ color: calendarColor }}
                        >
                            <CalendarIcon />
                            <span>
                                {showDetails
                                    ? format(todo.date, 'dd/MM/yyyy')
                                    : calendarLabel}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between items-center">
                <TodoForm type="edit" todo={todo}>
                    <button
                        className="opacity-80 hover:opacity-100 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EditIcon />
                    </button>
                </TodoForm>

                <button
                    className="opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeTodo(todo.id));
                    }}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}
