import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PRIORITY_OPTIONS, type Priority } from '@/types/todo.types';

interface PrioritySelectorProps {
    selectedPriority: Priority;
    onValueChange: (value: Priority) => void;
}

export function PrioritySelector({
    selectedPriority,
    onValueChange,
}: PrioritySelectorProps) {
    return (
        <Select
            value={selectedPriority}
            onValueChange={(value) => {
                onValueChange(value as Priority);
            }}
        >
            <SelectTrigger className="w-full capitalize">
                <SelectValue
                    placeholder="Select Priority"
                    className="cursor-pointer"
                />
            </SelectTrigger>
            <SelectContent>
                {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem
                        key={option}
                        value={option}
                        className="capitalize"
                    >
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
