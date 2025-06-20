import { createContext, useContext, ReactNode, useRef } from 'react';
import { SwiperData } from '../../MySwiperProto/types/MSPtypes';
import { renderListCreate } from '../helpers/swiperHelpers';

type MSContextType = {
  trackRef: React.RefObject<HTMLUListElement>;
  VPRef: React.RefObject<HTMLDivElement>;
  renderList: (SwiperData & { id: number })[];
  offsetRef: React.MutableRefObject<number>;
  listLength: number;
  dragRef: React.MutableRefObject<number | null>;
  widthRef: React.MutableRefObject<number>;
  infinite: boolean;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
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
};

export const MSProvider: React.FC<MSProviderProps> = ({
  children,
  dataset,
  infinite,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const VPRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const dragRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const renderList = renderListCreate(dataset, infinite);
  const listLength = renderList.length - (infinite ? 4 : 0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // #endregion

  const value = {
    renderList,
    trackRef,
    VPRef,
    offsetRef,
    listLength,
    dragRef,
    widthRef,
    infinite,
    timeoutRef,
  };

  return <MSContext.Provider value={value}>{children}</MSContext.Provider>;
};
