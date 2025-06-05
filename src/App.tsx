import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useDeferredValue, useState } from 'react';
import { FilterContext } from './contexts/FilterContext';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const filter = useDeferredValue(searchInput);

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
