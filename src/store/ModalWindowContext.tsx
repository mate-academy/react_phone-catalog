import React, { useMemo, useState } from 'react';

type ContextType = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
};

export const ModalWindowContext = React.createContext<ContextType>({
  isOpenModal: false,
  setIsOpenModal: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ModalWindowProvider: React.FC<Props> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const value = useMemo(() => ({ isOpenModal, setIsOpenModal }), [isOpenModal]);

  return (
    <ModalWindowContext.Provider value={value}>
      {children}
    </ModalWindowContext.Provider>
  );
};
