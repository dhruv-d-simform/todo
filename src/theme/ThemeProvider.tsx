import { useTheme } from '@/theme/useTheme';
import { ThemeContext } from '@/theme/ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useTheme();

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
}
