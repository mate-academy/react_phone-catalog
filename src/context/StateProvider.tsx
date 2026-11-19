import React, { useMemo, useState } from 'react';

type StateContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;

  isOpenWindow: boolean;
  setIsOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateContextType | null>(null);

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const values = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,

      isOpenModal,
      setIsOpenModal,

      isOpenWindow,
      setIsOpenWindow,
    }),
    [isMenuOpen, isOpenModal, isOpenWindow],
  );

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};
