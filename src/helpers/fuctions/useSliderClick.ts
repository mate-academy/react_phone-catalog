import {
  RefObject, useEffect, useLayoutEffect, useRef, useState,
} from 'react';

export const useSliderClick = () => {
  const staticContainer = useRef() as RefObject<HTMLDivElement>;
  const dynamicContainer = useRef() as RefObject<HTMLUListElement>;
  const [currTransitionX, setCurrTransitionX] = useState(0);
  const [staticContainerWidth, setStaticContainerWidth] = useState(0);
  const [dynamicContainerWidth, setDynamicContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLastImgs, setLastImgs] = useState(false);

  const rightSlide = () => {
    if (currTransitionX + 2 * staticContainerWidth >= dynamicContainerWidth) {
      setCurrTransitionX(
        dynamicContainerWidth - staticContainerWidth,
      );
      setLastImgs(true);
    } else {
      setCurrTransitionX(currTransitionX + staticContainerWidth);
    }
  };

  const leftSlide = () => {
    setLastImgs(false);
    if (currTransitionX - staticContainerWidth <= 0) {
      setCurrTransitionX(0);
    } else {
      setCurrTransitionX(currTransitionX - staticContainerWidth);
    }
  };

  useLayoutEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);
    setDynamicContainerWidth(dynamicContainer.current?.clientWidth || 0);
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);

    if (isLastImgs) {
      setCurrTransitionX(
        (dynamicContainer.current?.clientWidth || 0) - staticContainerWidth,
      );
    }
  }, [windowWidth]);

  return {
    currTransitionX,
    isLastImgs,
    staticContainer,
    dynamicContainer,
    leftSlide,
    rightSlide,
  };
};
