import { z } from 'zod';
import { PRIORITY_OPTIONS } from '@/types/todo.types';

export const todoFormSchema = z.object({
    title: z
        .string()
        .trim()
        .nonempty('Title cannot be empty.')
        .refine(
            (title) => !isFinite(Number(title)),
            'Title cannot be only number.'
        ),
    description: z.string().optional(),
    date: z.date().optional(),
    priority: z.enum(PRIORITY_OPTIONS),
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;
