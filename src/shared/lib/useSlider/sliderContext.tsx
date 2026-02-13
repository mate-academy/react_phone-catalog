import { createContext, ReactNode, useRef, useState } from 'react';
import { createContextHook } from '@shared/helpers/contextProvider';

type SliderDataType = {
  DOM: {
    viewport: React.RefObject<HTMLDivElement>;
    track: React.RefObject<HTMLDivElement | HTMLUListElement>;
    item: React.RefObject<HTMLAnchorElement | HTMLLIElement | HTMLElement>;
  };
  measure: {
    VPWidth: React.MutableRefObject<number>;
    trackWidth: React.MutableRefObject<number>;
    itemWidth: React.MutableRefObject<number>;
  };
  mechanics: {
    offset: React.MutableRefObject<number>;
    drag: React.MutableRefObject<number | null>;
    dragging: React.MutableRefObject<boolean>;
    index: React.MutableRefObject<number>;
  };
  rerender: () => void;
  startIndex: number;
};

const SliderDataContext = createContext<SliderDataType | null>(null);

type ContextProps = {
  children: ReactNode;
  startIdx: number;
};

const SliderDataProvider = ({ children, startIdx }: ContextProps) => {
  const DOMRefs = {
    viewport: useRef<HTMLDivElement>(null),
    track: useRef<HTMLDivElement | HTMLUListElement>(null),
    item: useRef<HTMLElement | HTMLAnchorElement>(null),
  };

  const measureRefs = {
    VPWidth: useRef<number>(0),
    trackWidth: useRef<number>(0),
    itemWidth: useRef<number>(0),
  };

  const mechRefs = {
    offset: useRef<number>(0),
    drag: useRef<number | null>(null),
    dragging: useRef<boolean>(false),
    index: useRef<number>(startIdx),
  };

  const [tick, setTick] = useState(false);
  const rerender = () => setTick(!tick);

  const data = {
    DOM: DOMRefs,
    measure: measureRefs,
    mechanics: mechRefs,
    rerender,
    startIndex: startIdx,
  };

  return (
    <SliderDataContext.Provider value={data}>
      {children}
    </SliderDataContext.Provider>
  );
};

const useSliderData = createContextHook(SliderDataContext);

export { useSliderData, SliderDataProvider };
