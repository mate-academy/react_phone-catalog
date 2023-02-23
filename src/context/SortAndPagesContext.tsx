import React, { useState } from 'react';

export const SortAndPagesContext = React.createContext<any | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SortAndPagesProvider: React.FC<Props> = ({ children }) => {
  const [itemsOnPage, setItemsOnPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingByValue, setSortingByValue] = useState('newest');

  return (
    <SortAndPagesContext.Provider value={{
      itemsOnPage,
      setItemsOnPage,
      currentPage,
      setCurrentPage,
      sortingByValue,
      setSortingByValue,
    }}
    >
      {children}
    </SortAndPagesContext.Provider>
  );
};
