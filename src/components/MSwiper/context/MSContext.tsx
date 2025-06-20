import { createContext, useContext, ReactNode, useRef } from 'react';
import { SwiperData } from '../../MySwiperProto/types/MSPtypes';

type MSContextType = {
  trackRef: React.RefObject<HTMLUListElement>;
  VPRef: React.RefObject<HTMLDivElement>;
  renderList: (SwiperData & { id: number })[];
  offsetRef: React.MutableRefObject<number>;
  listLength: number;
  dragRef: React.MutableRefObject<number | null>;
  widthRef: React.MutableRefObject<number>;
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
};

export const MSProvider: React.FC<MSProviderProps> = ({
  children,
  dataset,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const VPRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const dragRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const renderList = dataset.map((item, idx) => ({ id: idx, ...item }));
  const listLength = renderList.length;
  // #endregion

  const value = {
    renderList,
    trackRef,
    VPRef,
    offsetRef,
    listLength,
    dragRef,
    widthRef,
  };

  return <MSContext.Provider value={value}>{children}</MSContext.Provider>;
};
