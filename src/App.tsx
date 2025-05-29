import { Header } from '@/components/Header';
import { Sidebar } from './components/Sidebar';

function App() {
    return (
        <div>
            <Header />

            <Sidebar />

            <div className="pt-16 pb-16 sm:pb-0 sm:pl-64"></div>
        </div>
    );
}

export default App;
