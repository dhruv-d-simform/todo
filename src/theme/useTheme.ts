import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        Boolean(getUserPreferredTheme()?.matches)
    );

    const changeTheme = useCallback((newTheme: Theme) => {
        switch (newTheme) {
            case 'light':
                setIsDarkMode(false);
                break;
            case 'dark':
                setIsDarkMode(true);
                break;
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
    }, []);

    useEffect(() => {
        const ctrl = new AbortController();

        const darkModeQuery = getUserPreferredTheme();
        if (darkModeQuery) {
            darkModeQuery.addEventListener(
                'change',
                () => {
                    if (getUserPreferredTheme()?.matches) {
                        setIsDarkMode(true);
                    } else {
                        setIsDarkMode(false);
                    }
                },
                { signal: ctrl.signal }
            );
        }

        return () => ctrl.abort();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    return { isDarkMode, changeTheme, toggleTheme };
}

function getUserPreferredTheme() {
    if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)');
    }

    return null;
}
