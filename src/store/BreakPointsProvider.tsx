import React from 'react';
import { useMediaQuery } from 'react-responsive';
type Props = {
  children: React.ReactNode;
};

type BreakPointsContextType = {
  isLaptop: boolean;
  isMobile: boolean;
  isDesktop: boolean;
};

export const BreakPointsContext = React.createContext<BreakPointsContextType>({
  isMobile: false,
  isLaptop: false,
  isDesktop: false,
});

export const BreakPointsProvider: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });

  const isLaptop = useMediaQuery({
    query: '(max-width: 1199px)',
  });

  const isDesktop = useMediaQuery({
    query: '(max-width: 1199px)',
  });

  const queryTools = {
    isMobile,
    isLaptop,
    isDesktop,
  };

  return (
    <BreakPointsContext.Provider value={queryTools}>
      {children}
    </BreakPointsContext.Provider>
  );
};
