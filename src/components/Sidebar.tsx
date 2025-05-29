import { AddTaskIcon } from '@/assets/AddTaskIcon';
import { Button } from './ui/button';
import { TodayIcon } from '@/assets/TodayIcon';
import { InboxIcon } from '@/assets/InboxIcon';
import { UpcomingIcon } from '@/assets/UpcomingIcon';

export function Sidebar() {
    return (
        <div className="fixed bottom-0 sm:top-16 w-full sm:w-64 h-16 sm:h-[100dvh] border-t sm:border-r bg-header-sidebar dark:bg-header-sidebar-dark">
            <p
                className="hidden sm:block text-center text-2xl font-bold p-2"
                role="heading"
            >
                User Name
            </p>

            <nav className="flex sm:flex-col sm:py-6 sm:px-2 sm:gap-2">
                <NavButton isActive={false}>
                    <AddTaskIcon />
                    <span>Add Task</span>
                </NavButton>
                <NavButton isActive={true}>
                    <TodayIcon />
                    <span>Today</span>
                </NavButton>
                <NavButton isActive={false}>
                    <InboxIcon />
                    <span>Inbox</span>
                </NavButton>
                <NavButton isActive={false}>
                    <UpcomingIcon />
                    <span>Upcoming</span>
                </NavButton>
            </nav>
        </div>
    );
}

type NavButtonProps = React.PropsWithChildren<{
    isActive: boolean;
}>;

function NavButton({ children, isActive }: NavButtonProps) {
    return (
        <Button
            variant={isActive ? 'default' : 'ghost'}
            className={`flex-1 sm:flex-none h-full sm:h-12 text-[12px] sm:text-lg cursor-pointer flex flex-col sm:flex-row justify-start items-center gap-0.5 sm:gap-2 ${isActive && 'bg-main text-white dark:hover:text-black font-bold'}`}
        >
            {children}
        </Button>
    );
}
