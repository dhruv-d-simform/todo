import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/theme/ThemeContext';

function App() {
    const { isDarkMode, toggleTheme } = useThemeContext();
    return (
        <div>
            <Button onClick={toggleTheme}>Toggle Theme</Button>

            <p>{isDarkMode ? 'DARK' : 'LIGHT'}</p>
        </div>
    );
}

export default App;
