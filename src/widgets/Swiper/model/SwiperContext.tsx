import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import { SwiperData } from './types';

type SwiperContextType = {
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
  clamp: boolean;
};

const SwiperContext = createContext<SwiperContextType | null>(null);

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);

  if (!context) {
    throw new Error('Must be used within SwiperProvider');
  }

  return context;
};

type SwiperProviderProps = {
  children: ReactNode;
  dataset: SwiperData[];
  infinite: boolean;
  clamp: boolean;
};

export const SwiperProvider: React.FC<SwiperProviderProps> = ({
  children,
  dataset,
  infinite,
  clamp,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const VPRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const offsetRef = useRef(0);
  const activeIndexRef = useRef<number>(0);
  const [, forceRerender] = useState({});

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
      setWidth(VPRef.current.offsetWidth);
      offsetRef.current = infinite ? VPRef.current.offsetWidth : 0;
      rerender();
    }
  }, []);

  useEffect(() => {
    if (VPRef.current) {
      offsetRef.current = infinite ? VPRef.current.offsetWidth : 0;
    }
  }, []);

  if (VPRef.current) {
    activeIndexRef.current = infinite
      ? Math.round(offsetRef.current / VPRef.current.offsetWidth) - 1
      : Math.round(offsetRef.current / VPRef.current.offsetWidth);
  }

  // #region InitialOffsetCalc
  useEffect(() => {
    if (width > 0 && VPRef.current) {
      offsetRef.current = infinite ? VPRef.current.offsetWidth : 0;
    }
  }, []);
  // #endregion

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
    clamp,
  };

  return (
    <SwiperContext.Provider value={value}>{children}</SwiperContext.Provider>
  );
};
