import React, { useEffect, useState } from 'react';

type CatalogType = {
  elOnPage: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export const CatalogContext = React.createContext<CatalogType>({
  elOnPage: 0,
  currentPage: 1,
  handleNextPage: () => { },
  handlePreviousPage: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [elOnPage, setElOnPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 640px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 640px)')
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const countQuantity = () => {
      if (!matches) {
        setElOnPage(2);
      } else {
        setElOnPage(4);
      }
    };

    countQuantity();
  }, [matches]);

  const handleNextPage = () => {
    const updatedPage = currentPage + 1;

    setCurrentPage(updatedPage);
  };

  const handlePreviousPage = () => {
    const updatedPage = currentPage - 1;

    setCurrentPage(updatedPage);
  };

  const value = {
    elOnPage,
    currentPage,
    handleNextPage,
    handlePreviousPage,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
