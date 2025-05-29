import { AddTaskIcon } from '@/assets/AddTaskIcon';
import { Button } from './ui/button';
import { TodayIcon } from '@/assets/TodayIcon';
import { InboxIcon } from '@/assets/InboxIcon';
import { UpcomingIcon } from '@/assets/UpcomingIcon';

export function Sidebar() {
    return (
        <div className="fixed top-16 w-64 h-[100dvh] border-r bg-header-sidebar dark:bg-header-sidebar-dark">
            <p className="text-center text-2xl font-bold p-2">User Name</p>

            <nav className="flex flex-col py-6 px-2 gap-2">
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
            className={`h-12 text-lg cursor-pointer flex justify-start items-center ${isActive && 'bg-main text-white dark:hover:text-black font-bold'}`}
        >
            {children}
        </Button>
    );
}
