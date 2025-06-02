import { useLocation, useNavigate } from 'react-router';
import { AddTaskIcon } from '@/assets/AddTaskIcon';
import { TodayIcon } from '@/assets/TodayIcon';
import { InboxIcon } from '@/assets/InboxIcon';
import { UpcomingIcon } from '@/assets/UpcomingIcon';
import { Button } from './ui/button';

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 sm:top-16 w-full sm:w-64 h-16 sm:h-[100dvh] border-t sm:border-r bg-header-sidebar dark:bg-header-sidebar-dark">
            <p
                className="hidden sm:block text-center text-2xl font-bold p-2"
                role="heading"
            >
                User Name
            </p>

            <nav className="flex sm:flex-col sm:py-6 sm:px-2 sm:gap-2">
                <NavButton>
                    <AddTaskIcon />
                    <span>Add Task</span>
                </NavButton>
                <NavButton
                    isActive={location.pathname === '/'}
                    onClick={() => navigate('/')}
                >
                    <TodayIcon />
                    <span>Today</span>
                </NavButton>
                <NavButton
                    isActive={location.pathname === '/inbox'}
                    onClick={() => navigate('/inbox')}
                >
                    <InboxIcon />
                    <span>Inbox</span>
                </NavButton>
                <NavButton
                    isActive={location.pathname === '/upcoming'}
                    onClick={() => navigate('/upcoming')}
                >
                    <UpcomingIcon />
                    <span>Upcoming</span>
                </NavButton>
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
