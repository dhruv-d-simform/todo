import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DatePickerProps {
    selectedDate: Date | undefined;
    onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ selectedDate, onSelect }: DatePickerProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    return (
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        ' justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
                    {selectedDate ? (
                        format(selectedDate, 'PPP')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        onSelect(date);
                        setIsDatePickerOpen(false);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
