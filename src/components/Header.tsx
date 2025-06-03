import { Link } from 'react-router';
import { useThemeContext } from '@/theme/ThemeContext';

import { Button } from './ui/button';
import { Input } from './ui/input';

import lightModeIcon from '/icons/light_mode.svg';
import darkModeIcon from '/icons/dark_mode.svg';
import searchIcon from '/icons/search.svg';

export function Header() {
    const { isDarkMode, toggleTheme } = useThemeContext();

    return (
        <header className="fixed bg-header-sidebar dark:bg-header-sidebar-dark w-full mx-auto h-16 border-b flex justify-between items-center gap-6 px-6">
            <Link to="/" className="text-2xl font-bold text-nowrap">
                <span className="text-main">To</span>-Do
            </Link>

            <div className="hidden sm:block w-full max-w-[30rem] relative">
                <Input
                    type="text"
                    placeholder="Search your task here..."
                    className="w-full h-10 pr-12"
                    aria-label="Search task"
                />

                <Button className="absolute top-0 right-0 aspect-square h-full p-1.5 cursor-pointer bg-main hover:bg-main hover:opacity-90 active:opacity-80">
                    <img
                        src={searchIcon}
                        className="w-full h-full"
                        alt="Search Icon"
                    />
                </Button>
            </div>

            <div className="flex justify-center items-center gap-4">
                <p className="flex flex-col justify-center items-center gap-1">
                    <span className="text-[14px]/[14px]">
                        {new Date().toLocaleString('en-in', {
                            weekday: 'long',
                        })}
                    </span>
                    <span className="text-[#3ABEFF] text-[14px]/[14px]">
                        {new Date().toLocaleString('en-in', {
                            dateStyle: 'short',
                        })}
                    </span>
                </p>

                <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="cursor-pointer p-2.5 w-11 h-11"
                >
                    <img
                        src={isDarkMode ? lightModeIcon : darkModeIcon}
                        className="w-full h-full"
                        alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    />
                </Button>
            </div>
        </header>
    );
}
