import React from 'react';

interface ScrollToSectContextType {
  scrollToSect: (id: string) => void;
}

export const ScrollToSectContext = React.createContext<ScrollToSectContextType>(
  {
    scrollToSect: (id: string) => {
      const el = document.getElementById(id);

      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
);

type Props = {
  children: React.ReactNode;
};

export const ScrollToSectProvider: React.FC<Props> = ({ children }) => {
  const scrollToSect = (id: string) => {
    const el = document.getElementById(id);

    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ScrollToSectContext.Provider value={{ scrollToSect }}>
      {children}
    </ScrollToSectContext.Provider>
  );
};
