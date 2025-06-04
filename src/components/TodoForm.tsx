import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/redux/hooks';
import { addTodo, editTodo } from '@/redux/todoSlice';
import { todoFormSchema, type TodoFormSchema } from '@/utils/schemas';
import type { Todo } from '@/types/todo.types';
import { DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/DatePicker';
import { PrioritySelector } from '@/components/PrioritySelector';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type TodoFormProps = React.PropsWithChildren<
    | {
          type: 'create';
      }
    | {
          type: 'edit';
          todo: Todo;
      }
>;

export function TodoForm(props: TodoFormProps) {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<TodoFormSchema>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: props.type === 'edit' ? props.todo.title : undefined,
            description:
                props.type === 'edit' ? props.todo.description : undefined,
            date:
                props.type === 'edit' && props.todo.date
                    ? new Date(props.todo.date)
                    : undefined,
            priority: props.type === 'edit' ? props.todo.priority : 'medium',
        },
    });

    const onSubmit = async (data: TodoFormSchema) => {
        const formatDate = data.date
            ? format(data.date, 'yyyy-MM-dd')
            : undefined;
        if (props.type === 'create') {
            dispatch(
                addTodo({
                    title: data.title,
                    description: data.description,
                    date: formatDate,
                    priority: data.priority,
                })
            );

            reset();
        } else if (props.type === 'edit') {
            dispatch(
                editTodo({
                    ...props.todo,
                    title: data.title,
                    description: data.description,
                    date: formatDate,
                    priority: data.priority,
                })
            );

            reset({ ...data });
        }

        setOpen(false);
    };

    const selectedDate = watch('date');
    const selectedPriority = watch('priority');

    const isSubmitDisabled = Boolean(
        isSubmitting ||
            errors.title?.message ||
            errors.description?.message ||
            errors.date?.message ||
            errors.priority?.message
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {props.type === 'create' ? 'Create Todo' : 'Edit Todo'}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Form pop up to change the user's name
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full overflow-x-hidden flex flex-col items-start gap-4"
                >
                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="title" className="text-sm">
                            Title
                        </Label>
                        <Input
                            {...register('title')}
                            id="title"
                            type="text"
                            placeholder="Enter Your Name"
                        />
                        <span className="text-sm text-red-500">
                            {errors.title && errors.title.message}
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="description" className="text-sm">
                            Description
                        </Label>
                        <Textarea
                            {...register('description')}
                            id="description"
                            placeholder="Enter Description"
                        ></Textarea>
                        <span className="text-sm text-red-500">
                            {errors.description && errors.description.message}
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="date" className="text-sm">
                            Date
                        </Label>
                        <DatePicker
                            selectedDate={selectedDate}
                            onSelect={(date) => {
                                setValue('date', date, {
                                    shouldTouch: true,
                                    shouldValidate: true,
                                });
                            }}
                        />
                        <span className="text-sm text-red-500">
                            {errors.date && errors.date.message}
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="priority" className="text-sm">
                            Priority
                        </Label>

                        <PrioritySelector
                            selectedPriority={selectedPriority}
                            onValueChange={(value) => {
                                setValue('priority', value, {
                                    shouldTouch: true,
                                    shouldValidate: true,
                                });
                            }}
                        />

                        <span className="text-sm text-red-500">
                            {errors.priority && errors.priority.message}
                        </span>
                    </div>

                    <Button
                        disabled={isSubmitDisabled}
                        className="bg-main dark:bg-white cursor-pointer"
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
