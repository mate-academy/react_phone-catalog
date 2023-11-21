import React, {
  Dispatch, SetStateAction, createContext, useState,
} from 'react';

type Props = {
  children: React.ReactNode,
};

type Context = {
  isModalShow: boolean,
  setIsModalShow: Dispatch<SetStateAction<boolean>>,
};

export const ModalContext = createContext<Context>({
  isModalShow: false,
  setIsModalShow: () => {},
});

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const value = {
    isModalShow,
    setIsModalShow,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
