import React, { useEffect, useMemo, useState } from 'react';

type ContextType = {
  windowSize: number;
  setWindowSize: React.Dispatch<React.SetStateAction<number>>;
};

export const WindowWidthContext = React.createContext<ContextType>({
  windowSize: window.innerWidth,
  setWindowSize: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const WindowWidthProvider: React.FC<Props> = ({ children }) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // listener window size

  useEffect(() => {
    if (windowSize !== document.documentElement.clientWidth) {
      setWindowSize(document.documentElement.clientWidth);
    }
  }, [windowSize]); // adaptive window size with scroll line

  const value = useMemo(() => ({ windowSize, setWindowSize }), [windowSize]);

  return (
    <WindowWidthContext.Provider value={value}>
      {children}
    </WindowWidthContext.Provider>
  );
};
