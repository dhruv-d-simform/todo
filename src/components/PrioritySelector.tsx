import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PRIORITY_OPTIONS, type Priority } from '@/types/todo.types';
import { getPriorityStyles } from '@/utils/todoUtils';

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
            <SelectTrigger className="w-full capitalize cursor-pointer">
                <SelectValue
                    placeholder="Select Priority"
                    className="cursor-pointer"
                />
            </SelectTrigger>
            <SelectContent>
                {PRIORITY_OPTIONS.map((option) => {
                    const { bgColor, color } = getPriorityStyles(option);
                    return (
                        <SelectItem
                            key={option}
                            value={option}
                            className="cursor-pointer"
                        >
                            <span
                                className="w-5 h-5 rounded-full"
                                style={{
                                    backgroundColor: bgColor,
                                    border: `2px solid ${color}`,
                                }}
                            ></span>
                            <span className="capitalize">{option}</span>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
