import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { Autoplay, SwiperData } from '../types/MSPtypes';

type MSPContextType = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  trackRef: React.RefObject<HTMLUListElement>;
  VPRef: React.RefObject<HTMLDivElement>;
  renderList: (SwiperData & { id: number })[];
  offsetRef: React.MutableRefObject<number>;
  rerender: () => void;
  listLength: number;
  activeIndexRef: React.MutableRefObject<number>;
  infinite: boolean;
  isDraggingRef: React.MutableRefObject<boolean>;
  snapTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  dragRef: React.MutableRefObject<number>;
  autoplay: Autoplay | false;
  animationSpeed: number;
  gap: number;
  clamp: boolean;
  swipeCoeff: number;
  widthRef: React.MutableRefObject<number>;
};

const MSPContext = createContext<MSPContextType | null>(null);

export const useMSPContext = () => {
  const context = useContext(MSPContext);

  if (!context) {
    throw new Error('Must be used within SwiperProvider');
  }

  return context;
};

type MSPProviderProps = {
  children: ReactNode;
  dataset: SwiperData[];
  infinite: boolean;
  autoplay: Autoplay | false;
  animationSpeed: number;
  gap: number;
  clamp: boolean;
  swipeCoeff: number;
};

export const MSPProvider: React.FC<MSPProviderProps> = ({
  children,
  dataset,
  infinite,
  autoplay,
  animationSpeed,
  gap,
  clamp,
  swipeCoeff,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const VPRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const offsetRef = useRef(0);
  const activeIndexRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragRef = useRef<number>(0);
  const snapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [, forceRerender] = useState({});
  const widthRef = useRef<number>(0);

  // #region DataHandler
  let renderList;
  let listLength;

  if (!infinite) {
    renderList = dataset.map((item, idx) => ({ id: idx, ...item }));
    listLength = renderList.length;
  } else {
    const extended = [
      { ...dataset[dataset.length - 1] },
      ...dataset.map(item => ({ ...item })),
      { ...dataset[0] },
    ];

    renderList = extended.map((item, idx) => ({ id: idx, ...item }));
    listLength = renderList.length - 2;
  }

  // #endregion

  const rerender = useCallback(() => {
    forceRerender({});
  }, []);

  useLayoutEffect(() => {
    if (VPRef.current) {
      widthRef.current = VPRef.current.offsetWidth;
      setWidth(VPRef.current.offsetWidth);
    }

    offsetRef.current = infinite ? widthRef.current : 0;
  }, [width]);

  const value = {
    renderList,
    width,
    setWidth,
    trackRef,
    VPRef,
    offsetRef,
    rerender,
    listLength,
    activeIndexRef,
    infinite,
    isDraggingRef,
    snapTimerRef,
    dragRef,
    swipeCoeff,
    autoplay,
    animationSpeed,
    gap,
    clamp,
    widthRef,
  };

  return <MSPContext.Provider value={value}>{children}</MSPContext.Provider>;
};
