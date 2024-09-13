import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FooterContextType {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  return (
    <FooterContext.Provider value={{ isShow, setIsShow }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};
