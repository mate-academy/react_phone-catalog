import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import { BaseProduct } from '@shared/types/APITypes';
import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';
import { Mode } from '../defaultConfig';
import { listCreate } from '../../lib/helpers/listProcess';
import { SliderType } from '@widgets/Slider/lib/types';

type SliderContextType = {
  VP: React.RefObject<HTMLDivElement>;
  track: React.RefObject<HTMLUListElement>;
  trackElement: React.RefObject<HTMLLIElement>;
  offset: React.MutableRefObject<number>;
  drag: React.MutableRefObject<number | null>;
  list: ((BannerData | BaseProduct) & { idx: number })[];
  length: number;
  type: SliderType;
  vpWidth: React.MutableRefObject<number>;
  elWidth: React.MutableRefObject<number>;
  CLONES: number;
  mode: Mode;
};

const SlContext = createContext<SliderContextType | null>(null);

export const useSlContext = () => {
  const context = useContext(SlContext);

  if (!context) {
    throw new Error('Must be used within SLProvider');
  }

  return context;
};

type Props = {
  children: ReactNode;
  config: {
    dataset: BannerData[] | BaseProduct[];
    mode: Mode;
  };
  type: SliderType;
};

export const SliderProvider = ({ children, config, type }: Props) => {
  const CLONES = 1;
  const VP = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const trackElement = useRef<HTMLLIElement>(null);
  const offset = useRef(0);
  const drag = useRef<number | null>(null);
  const list = useMemo(
    () => listCreate(config.dataset, config.mode, CLONES),
    [config.dataset, config.mode],
  );
  const length = list.length;
  const vpWidth = useRef<number>(0);
  const elWidth = useRef<number>(0);
  // #endregion
  const value = useMemo(
    () => ({
      VP,
      track,
      trackElement,
      offset,
      drag,
      list,
      length,
      type,
      vpWidth,
      elWidth,
      CLONES,
      mode: config.mode,
    }),
    [list, length, type],
  );

  return <SlContext.Provider value={value}>{children}</SlContext.Provider>;
};
