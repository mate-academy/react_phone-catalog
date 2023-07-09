import { useState, useEffect } from 'react';
import {
  buttonWidth,
  main,
  productSlider,
  itemsOnPage,
  paginationLimit,
} from './deviceParams';

type Device = 'desktop' | 'tab' | 'phone';

export function useDiviceSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let device: Device = 'desktop';

  if (size < 1024) {
    device = size < 568 ? 'phone' : 'tab';
  }

  return {
    device,
    buttonWidth,
    main: main[device],
    productSliderData: productSlider[device],
    itemsOnPage: itemsOnPage[device],
    paginationLimit: paginationLimit[device],
  };
}
