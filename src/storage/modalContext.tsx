import React, {
  Dispatch, SetStateAction, createContext, useState,
} from 'react';

type Props = {
  children: React.ReactNode,
};

type ModalContextType = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false, setIsOpen: () => {},
});

export const ModalProvider:React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
