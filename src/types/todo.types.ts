export const PRIORITY_OPTIONS = ['high', 'medium', 'low'] as const;

// export type Priority = 'low' | 'medium' | 'high';
export type Priority = (typeof PRIORITY_OPTIONS)[number];

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    date?: string;
    priority: Priority;
}
