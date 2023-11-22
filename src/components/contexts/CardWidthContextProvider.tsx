import { createContext, ReactNode, useState } from 'react';

type CardWidthContextProps = {
  cardWidth: number;
  setCardWidth: (width: number) => void;
};

export const CardWidthContext = createContext<CardWidthContextProps>({
  cardWidth: 272,
  setCardWidth: () => { },
});

type Props = {
  children: ReactNode
};

export const CardWidthContextProvider: React.FC<Props> = ({ children }) => {
  const [cardWidth, setCardWidth] = useState(272);

  return (
    <CardWidthContext.Provider
      value={{ cardWidth, setCardWidth }}
    >
      {children}
    </CardWidthContext.Provider>
  );
};
