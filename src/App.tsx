import { useDeferredValue, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { FilterContext } from '@/contexts/FilterContext';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const filter = useDeferredValue(searchInput);

    const location = useLocation();

    useEffect(() => {
        setSearchInput('');
    }, [location.pathname]);

    return (
        <div>
            <Header searchInput={searchInput} setSearchInput={setSearchInput} />
            <Sidebar />
            <div className="pt-16 pb-16 sm:pb-0 sm:pl-64">
                <FilterContext.Provider value={filter}>
                    <Outlet />
                </FilterContext.Provider>
            </div>
        </div>
    );
}

export default App;
