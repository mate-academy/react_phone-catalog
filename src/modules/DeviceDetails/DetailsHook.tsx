import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  slide: number;
  setSlide: React.Dispatch<React.SetStateAction<number>>;
};

const HooksContext = createContext<ContextProps | null>(null);

export const DetailsContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [slide, setSlide] = useState(0);

  return (
    <HooksContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        slide,
        setSlide,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const DetailsHooks = (): ContextProps => {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
