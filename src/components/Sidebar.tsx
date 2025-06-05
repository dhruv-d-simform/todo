import { useLocation, useNavigate } from 'react-router';
import { AddTaskIcon } from '@/assets/AddTaskIcon';
import { TodayIcon } from '@/assets/TodayIcon';
import { InboxIcon } from '@/assets/InboxIcon';
import { UpcomingIcon } from '@/assets/UpcomingIcon';
import { Button } from './ui/button';
import { UserName } from './UserName';
import { TodoForm } from './TodoForm';

const NAVIGATION_ITEMS = [
    {
        id: 1,
        title: 'Today',
        icon: <TodayIcon />,
        path: '/',
    },
    {
        id: 2,
        title: 'Inbox',
        icon: <InboxIcon />,
        path: '/inbox',
    },
    {
        id: 3,
        title: 'Upcoming',
        icon: <UpcomingIcon />,
        path: '/upcoming',
    },
] as const;

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="fixed z-10 bottom-0 sm:top-16 w-full sm:w-64 h-16 sm:h-[100dvh] border-t sm:border-r bg-header-sidebar dark:bg-header-sidebar-dark">
            <UserName />

            <nav className="flex sm:flex-col sm:py-6 sm:px-2 sm:gap-2">
                <TodoForm type="create">
                    <NavButton>
                        <AddTaskIcon />
                        <span>Add Task</span>
                    </NavButton>
                </TodoForm>
                {NAVIGATION_ITEMS.map((navItem) => (
                    <NavButton
                        key={navItem.id}
                        isActive={location.pathname === navItem.path}
                        onClick={() => navigate(navItem.path)}
                    >
                        {navItem.icon}
                        <span>{navItem.title}</span>
                    </NavButton>
                ))}
            </nav>
        </div>
    );
}

type NavButtonProps = React.PropsWithChildren<{
    isActive?: boolean;
    onClick?: () => void;
}>;

function NavButton({
    children,
    isActive = false,
    onClick = () => {},
}: NavButtonProps) {
    return (
        <Button
            variant={isActive ? 'default' : 'ghost'}
            className={`flex-1 sm:flex-none h-full sm:h-12 text-[12px] sm:text-lg cursor-pointer flex flex-col sm:flex-row justify-start items-center gap-0.5 sm:gap-2 ${isActive && 'bg-main dark:bg-white font-bold'}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
