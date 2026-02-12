import React, { createContext, useState } from 'react';

type ModalContextType = {
  modal: boolean;
  setModal: (v: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  modal: false,
  setModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(true);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
