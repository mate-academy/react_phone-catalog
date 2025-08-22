import { createContext, ReactNode, useRef, useState } from 'react';
import { createContextHook } from '@shared/helpers/contextProvider';

type SliderDataType = {
  DOM: {
    viewport: React.RefObject<HTMLDivElement>;
    track: React.RefObject<HTMLDivElement>;
    item: React.RefObject<HTMLAnchorElement>;
  };
  measure: {
    VPWidth: React.MutableRefObject<number>;
    trackWidth: React.MutableRefObject<number>;
    itemWidth: React.MutableRefObject<number>;
  };
  mechanics: {
    offset: React.MutableRefObject<number>;
    startX: React.MutableRefObject<number | null>;
    drag: React.MutableRefObject<number | null>;
    dragging: React.MutableRefObject<boolean>;
  };
  ids: {
    rafId: React.MutableRefObject<number | null>;
    pointerId: React.MutableRefObject<number | null>;
  };
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  gap: number;
  startIndex: number;
};

const SliderDataContext = createContext<SliderDataType | null>(null);

type ContextProps = {
  children: ReactNode;
  contextConfig: {
    startIndex: number;
    gap: number;
  };
};

const SliderDataProvider = ({ children, contextConfig }: ContextProps) => {
  const DOMRefs = {
    viewport: useRef<HTMLDivElement>(null),
    track: useRef<HTMLDivElement>(null),
    item: useRef<HTMLAnchorElement>(null),
  };

  const measureRefs = {
    VPWidth: useRef<number>(0),
    trackWidth: useRef<number>(0),
    itemWidth: useRef<number>(0),
  };

  const mechRefs = {
    offset: useRef<number>(0),
    startX: useRef<number | null>(null),
    drag: useRef<number | null>(null),
    dragging: useRef<boolean>(false),
  };

  const idRefs = {
    rafId: useRef<number | null>(null),
    pointerId: useRef<number | null>(null),
  };
  const { startIndex, gap } = contextConfig;
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const data = {
    DOM: DOMRefs,
    measure: measureRefs,
    mechanics: mechRefs,
    ids: idRefs,
    activeIndex,
    setActiveIndex,
    gap,
    startIndex,
  };

  return (
    <SliderDataContext.Provider value={data}>
      {children}
    </SliderDataContext.Provider>
  );
};

const useSliderData = createContextHook(SliderDataContext);

export { useSliderData, SliderDataProvider };
