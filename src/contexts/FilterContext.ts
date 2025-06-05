import { createContext, useContext } from 'react';

export const FilterContext = createContext('');

export function useFilterContext() {
    return useContext(FilterContext);
}
