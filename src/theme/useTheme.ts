import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const LOCAL_STORAGE_KEY = 'TODO_THEME';

export function useTheme() {
    let userThemePreference: Theme | null = null;

    try {
        const storedThemePreference = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (
            storedThemePreference === 'light' ||
            storedThemePreference === 'dark'
        ) {
            userThemePreference = storedThemePreference;
        }
    } catch (err) {
        console.log(`No theme preferred. `, err);
    }

    const initialTheme: boolean =
        userThemePreference === null
            ? Boolean(getUserPreferredTheme()?.matches)
            : userThemePreference === 'dark';

    /** Initialize the State. */
    const [isDarkMode, setIsDarkMode] = useState<boolean>(initialTheme);

    const saveTheme = useCallback((isDarkMode: boolean) => {
        if (isDarkMode) {
            localStorage.setItem(LOCAL_STORAGE_KEY, 'dark');
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, 'light');
        }
    }, []);

    const changeTheme = useCallback(
        (newTheme: Theme) => {
            switch (newTheme) {
                case 'light':
                    setIsDarkMode(false);
                    break;
                case 'dark':
                    setIsDarkMode(true);
                    break;
            }
            saveTheme(newTheme === 'dark');
        },
        [saveTheme]
    );

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevIsDarkMode) => {
            saveTheme(!prevIsDarkMode);
            return !prevIsDarkMode;
        });
    }, [saveTheme]);

    useEffect(() => {
        if (userThemePreference !== null) return;

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
    }, [userThemePreference]);

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
