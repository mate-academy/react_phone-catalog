import React, {
  createContext,
  useMemo, useState,
  useCallback,
  useEffect,
} from 'react';
import { Image } from '../../../types/others/types';

const TRANSITION_DURATION = 300;

const images: Image[] = [
  { id: 0, url: 'img/utils/banner-phones.png' },
  { id: 1, url: 'img/utils/banner-tablets.png' },
  { id: 2, url: 'img/utils/banner-accessories.png' },
];

type BannerSliderContextData = {
  images: Image[];
  currentSlide: Image;
  transitionDuration: number;
  position: number;
  isLeftDisabled: boolean;
  setIsLeftDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isRightDisabled: boolean;
  setIsRightDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  setTransitionDuration: React.Dispatch<React.SetStateAction<number>>;
  restartInterval: () => void;
  setCurrentSlide: React.Dispatch<React.SetStateAction<Image>>;
};

const defaultContextData: BannerSliderContextData = {
  images,
  currentSlide: images[0],
  transitionDuration: TRANSITION_DURATION,
  position: 1,
  isLeftDisabled: false,
  isRightDisabled: false,
  setIsLeftDisabled: () => { },
  setIsRightDisabled: () => { },
  setPosition: () => { },
  setTransitionDuration: () => { },
  restartInterval: () => { },
  setCurrentSlide: () => { },
};

export const BannerSLiderContext
  = createContext<BannerSliderContextData>(defaultContextData);

export const BannerSliderProvider: React.FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(images[0]);
  const [transitionDuration, setTransitionDuration]
    = useState(TRANSITION_DURATION);
  const [position, setPosition] = useState(1);
  const [isLeftDisabled, setIsLeftDisabled] = useState(false);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const setUpSliderInterval = useCallback((ms: number) => {
    let intervalId: NodeJS.Timeout;

    return (clear?: boolean) => {
      clearInterval(intervalId);

      if (clear) {
        return;
      }

      intervalId = setInterval(() => {
        setPosition((prev) => {
          if (prev === images.length) {
            setCurrentSlide(images[0]);

            setTimeout(() => {
              setTransitionDuration(0);
              setPosition(1);
            }, TRANSITION_DURATION);

            return images.length + 1;
          }

          setCurrentSlide(images[prev]);

          return prev + 1;
        });
      }, ms);
    };
  }, []);

  const restartInterval = useCallback(setUpSliderInterval(5000), []);

  const value = useMemo(() => ({
    images,
    currentSlide,
    transitionDuration,
    position,
    isLeftDisabled,
    isRightDisabled,
    setIsLeftDisabled,
    setIsRightDisabled,
    setPosition,
    setTransitionDuration,
    restartInterval,
    setCurrentSlide,
  }), [currentSlide, transitionDuration, position]);

  useEffect(() => {
    restartInterval();

    return () => restartInterval(true);
  }, [restartInterval]);

  useEffect(() => {
    setTimeout(() => {
      setTransitionDuration(TRANSITION_DURATION);
    }, TRANSITION_DURATION);
  }, [transitionDuration]);

  return (
    <BannerSLiderContext.Provider value={value}>
      {children}
    </BannerSLiderContext.Provider>
  );
};
