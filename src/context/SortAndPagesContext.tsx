import React, { useState } from 'react';

type SortAndPagesContextValue = {
  itemsOnPage: number;
  setItemsOnPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  sortingByValue: string;
  setSortingByValue: (value: string) => void;
  searchIsClicked: boolean;
  setSearchIsClicked: (value: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const SortAndPagesContext = React.createContext<
SortAndPagesContextValue | null>(null);

export const SortAndPagesProvider: React.FC<Props> = ({ children }) => {
  const [itemsOnPage, setItemsOnPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortingByValue, setSortingByValue] = useState<string>('newest');
  const [searchIsClicked, setSearchIsClicked] = useState<boolean>(false);

  const contextValue: SortAndPagesContextValue = {
    itemsOnPage,
    setItemsOnPage,
    currentPage,
    setCurrentPage,
    sortingByValue,
    setSortingByValue,
    searchIsClicked,
    setSearchIsClicked,
  };

  return (
    <SortAndPagesContext.Provider value={contextValue}>
      {children}
    </SortAndPagesContext.Provider>
  );
};
