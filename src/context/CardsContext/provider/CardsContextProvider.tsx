import React, { useMemo, useState } from 'react';

import { CardsContext } from '../CardsContext';

interface Props {
  children: React.ReactNode;
}

export const CardsContextProvider: React.FC<Props> = ({ children }) => {
  const [mCardIndex, setMCardIndex] = useState(0);
  const [hpCardIndex, setHpCardIndex] = useState(0);
  const [ymalCardIndex, setYmalCardIndex] = useState(0);

  // value

  const cardsContextValue = useMemo(
    () => ({
      mCardIndex,
      hpCardIndex,
      ymalCardIndex,
      setMCardIndex,
      setHpCardIndex,
      setYmalCardIndex,
    }),
    [mCardIndex, hpCardIndex, ymalCardIndex],
  );

  // #endregion

  return (
    <CardsContext.Provider value={cardsContextValue}>
      {children}
    </CardsContext.Provider>
  );
};
