import React, { useMemo } from 'react';

interface ScrollToSectContextType {
  scrollToSect: (id: string) => void;
}

export const ScrollToSectContext = React.createContext<ScrollToSectContextType>(
  {
    scrollToSect: (id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
  },
);

type Props = {
  children: React.ReactNode;
};

export const ScrollToSectProvider: React.FC<Props> = ({ children }) => {
  const scrollToSect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const value = useMemo(
    () => ({
      scrollToSect,
    }),
    [],
  );

  return (
    <ScrollToSectContext.Provider value={value}>
      {children}
    </ScrollToSectContext.Provider>
  );
};
