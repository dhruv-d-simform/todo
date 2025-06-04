import React, { useState } from 'react';
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
                    <InputContainer
                        inputId="title"
                        label="Title"
                        error={errors.title && errors.title.message}
                    >
                        <Input
                            {...register('title')}
                            id="title"
                            type="text"
                            placeholder="Task name"
                        />
                    </InputContainer>

                    <InputContainer
                        inputId="description"
                        label="Description"
                        error={errors.description && errors.description.message}
                    >
                        <Textarea
                            {...register('description')}
                            id="description"
                            placeholder="Enter Description"
                            className="max-h-52"
                        ></Textarea>
                    </InputContainer>

                    <InputContainer
                        inputId="date"
                        label="Date"
                        error={errors.date && errors.date.message}
                    >
                        <DatePicker
                            selectedDate={selectedDate}
                            onSelect={(date) => {
                                setValue('date', date, {
                                    shouldTouch: true,
                                    shouldValidate: true,
                                });
                            }}
                        />
                    </InputContainer>

                    <InputContainer
                        inputId="priority"
                        label="Priority"
                        error={errors.priority && errors.priority.message}
                    >
                        <PrioritySelector
                            selectedPriority={selectedPriority}
                            onValueChange={(value) => {
                                setValue('priority', value, {
                                    shouldTouch: true,
                                    shouldValidate: true,
                                });
                            }}
                        />
                    </InputContainer>

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

interface InputContainerProps {
    inputId: string;
    children: React.ReactNode;
    label: string;
    error?: string;
}

function InputContainer({
    inputId,
    label,
    children,
    error,
}: InputContainerProps) {
    return (
        <div className="w-full flex flex-col gap-1">
            <Label htmlFor={inputId} className="text-sm">
                {label}
            </Label>
            {children}
            <span className="text-sm text-red-500">{error}</span>
        </div>
    );
}
