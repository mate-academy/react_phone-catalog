import React, { useState, useEffect } from 'react';

export const WidthContext = React.createContext(0);

type Props = {
  children: React.ReactNode;
};

export const WidthContextProvider: React.FC<Props> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setWidth(newWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [width]);

  return (
    <WidthContext.Provider value={width}>
      {children}
    </WidthContext.Provider>
  );
};
