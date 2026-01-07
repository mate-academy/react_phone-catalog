import React, { useMemo } from 'react';

interface ScrollToSectionContextType {
  scrollToSection: (id: string) => void;
}

export const ScrollToSectionContext =
  React.createContext<ScrollToSectionContextType>({
    scrollToSection: (id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
  });

type Props = {
  children: React.ReactNode;
};

export const ScrollToSectionProvider: React.FC<Props> = ({ children }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const value = useMemo(
    () => ({
      scrollToSection,
    }),
    [],
  );

  return (
    <ScrollToSectionContext.Provider value={value}>
      {children}
    </ScrollToSectionContext.Provider>
  );
};
