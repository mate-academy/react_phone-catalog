import { createContext, useContext, ReactNode, useRef } from 'react';
import { SwiperData } from '../types/slider-types';
import { renderListCreate } from '../helpers/swiperHelpers';

type MSContextType = {
  track: React.RefObject<HTMLUListElement>;
  VP: React.RefObject<HTMLDivElement>;
  renderList: (SwiperData & { id: number })[];
  offset: React.MutableRefObject<number>;
  listLength: number;
  drag: React.MutableRefObject<number | null>;
  width: React.MutableRefObject<number>;
  infinite: boolean;
  clamp: boolean;
  gap: number;
};

const MSContext = createContext<MSContextType | null>(null);

export const useMSContext = () => {
  const context = useContext(MSContext);

  if (!context) {
    throw new Error('Must be used within SwiperProvider');
  }

  return context;
};

type MSProviderProps = {
  children: ReactNode;
  dataset: SwiperData[];
  infinite: boolean;
  clamp: boolean;
  gap: number;
};

export const MSProvider: React.FC<MSProviderProps> = ({
  children,
  dataset,
  infinite,
  clamp,
  gap,
}) => {
  const track = useRef<HTMLUListElement>(null);
  const VP = useRef<HTMLDivElement>(null);
  const width = useRef<number>(0);
  const drag = useRef<number | null>(null);
  const offset = useRef(0);
  const renderList = renderListCreate(dataset, infinite);
  const listLength = renderList.length - (infinite ? 4 : 0);

  // #endregion

  const value = {
    renderList,
    track,
    VP,
    offset,
    listLength,
    drag,
    width,
    infinite,
    clamp,
    gap,
  };

  return <MSContext.Provider value={value}>{children}</MSContext.Provider>;
};
