import { z } from 'zod';

export const todoFormSchema = z.object({
    title: z.string().trim().nonempty('Title cannot be empty.'),
    description: z.string().optional(),
    date: z
        .date()
        .min(
            new Date(Date.now() - 24 * 60 * 60 * 1000),
            'The date cannot be in the past.'
        )
        .optional(),
    priority: z.enum(['low', 'medium', 'high']),
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;
