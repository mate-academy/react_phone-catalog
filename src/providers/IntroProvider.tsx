import React, { createContext, useContext, useState, useMemo } from 'react';

interface IntroContextProps {
  textFullyDisplayed: boolean;
  setTextFullyDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  introOverlayVisible: boolean;
  hideIntroOverlay: () => void;
}

const IntroContext = createContext<IntroContextProps | undefined>(undefined);

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [textFullyDisplayed, setTextFullyDisplayed] = useState(false);
  const [introOverlayVisible, setIntroOverlayVisible] = useState(true);

  const hideIntroOverlay = () => {
    setIntroOverlayVisible(false);
  };

  const value = useMemo(() => {
    return {
      textFullyDisplayed,
      setTextFullyDisplayed,
      introOverlayVisible,
      hideIntroOverlay,
    };
  }, [textFullyDisplayed, introOverlayVisible]);

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
};

export const useIntro = () => {
  const context = useContext(IntroContext);

  if (!context) {
    throw new Error('useIntro must be used within IntroProvider');
  }

  return context;
};
