import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import { SwiperData } from './types';

type SwiperContextType = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  trackRef: React.RefObject<HTMLUListElement>;
  VPRef: React.RefObject<HTMLDivElement>;
  dataset: SwiperData[];
  offsetRef: React.MutableRefObject<number>;
  indexRef: React.MutableRefObject<number>;
  rerender: () => void;
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
};

export const SwiperProvider: React.FC<SwiperProviderProps> = ({
  children,
  dataset,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const VPRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const offsetRef = useRef(0);
  const indexRef = useRef<number>(0);
  const [, forceRerender] = useState({});

  const rerender = () => {
    forceRerender({});
  };

  indexRef.current = Math.round(offsetRef.current / width);

  useLayoutEffect(() => {
    if (VPRef.current) {
      setWidth(VPRef.current.offsetWidth);
    }
  }, []);

  const value = {
    dataset,
    width,
    setWidth,
    trackRef,
    VPRef,
    offsetRef,
    indexRef,
    rerender,
  };

  return (
    <SwiperContext.Provider value={value}>{children}</SwiperContext.Provider>
  );
};
