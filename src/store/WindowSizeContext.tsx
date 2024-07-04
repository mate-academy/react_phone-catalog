import React, { useEffect, useMemo, useState } from 'react';

type ContextType = {
  windowSize: number;
  setWindowSize: React.Dispatch<React.SetStateAction<number>>;
  windowHeight: number;
  scrollHeight: number;
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const WindowSizeContext = React.createContext<ContextType>({
  windowSize: window.innerWidth,
  setWindowSize: () => {},
  windowHeight: window.innerHeight,
  scrollHeight: document.documentElement.scrollHeight,
  setScrollHeight: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const WindowSizeProvider: React.FC<Props> = ({ children }) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const windowHeight = window.innerHeight;
  const [scrollHeight, setScrollHeight] = useState<number>(
    document.documentElement.scrollHeight,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
      // setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // listener window size

  const value = useMemo(() => {
    return {
      windowSize,
      setWindowSize,
      windowHeight,
      scrollHeight,
      setScrollHeight,
    };
  }, [scrollHeight, windowHeight, windowSize]);

  return (
    <WindowSizeContext.Provider value={value}>
      {children}
    </WindowSizeContext.Provider>
  );
};
