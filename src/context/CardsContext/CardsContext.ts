import { createContext } from 'react';

import { CardsContextType } from './types/CardsContextType';

export const CardsContext = createContext<CardsContextType>({
  mCardIndex: 0,
  hpCardIndex: 0,
  ymalCardIndex: 0,
  setYmalCardIndex: () => {},
  setMCardIndex: () => {},
  setHpCardIndex: () => {},
});
