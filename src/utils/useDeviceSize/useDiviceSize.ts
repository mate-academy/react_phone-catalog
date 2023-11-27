import { useState, useEffect } from 'react';
import {
  buttonWidth,
  main,
  Slider,
  itemsOnPage,
  paginationLimit,
} from './deviceParams';

type Device = 'sm' | 'min' | 'md' | 'lg' | 'xl';

export function useDiviceSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let device: Device = 'xl';

  if (size < 1280) {
    device = 'lg';
  }

  if (size < 1024) {
    device = 'md';
  }

  if (size < 768) {
    device = 'sm';
  }

  if (size < 510) {
    device = 'min';
  }

  return {
    device,
    buttonWidth,
    main: main[device],
    SliderData: Slider[device],
    itemsOnPage: itemsOnPage[device],
    paginationLimit: paginationLimit[device],
  };
}
