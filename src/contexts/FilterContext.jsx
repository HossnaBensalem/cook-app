import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

// يجب أن يكون التصدير بهذا الشكل ↓
export const FilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  return (
    <FilterContext.Provider value={{ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);