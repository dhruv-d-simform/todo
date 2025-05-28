import { createContext, useContext } from 'react';
import { useTheme } from '@/theme/useTheme';

export const ThemeContext = createContext<ReturnType<typeof useTheme>>({
    isDarkMode: true,
    changeTheme: () => {},
    toggleTheme: () => {},
});

export function useThemeContext() {
    return useContext(ThemeContext);
}
