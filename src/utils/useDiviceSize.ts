import { useState, useEffect } from 'react';

const buttonWidth = 32;
const main = {
  tab: {
    size: 700,
    gap: 20,
  },
  desktop: {
    size: 1136,
    gap: 16,
  },
};

const productSlider = {
  tab: {
    step: main.tab.size + main.tab.gap,
    items: 3,
  },
  desktop: {
    step: main.desktop.size + main.desktop.gap,
    items: 4,
  },
};

const paginationLimit = {
  tab: Math.ceil(
    (main.tab.size - ((buttonWidth + main.tab.gap) * 2)) / (buttonWidth + 8),
  ),
  desktop: 0,
};

const itemsOnPage = {
  tab: ['15', '6', '3', 'all'],
  desktop: ['16', '8', '4', 'all'],
};

export function useDiviceSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const device = size < 1024 ? 'tab' : 'desktop';

  return {
    buttonWidth,
    main: main[device],
    productSliderData: productSlider[device],
    itemsOnPage: itemsOnPage[device],
    paginationLimit: paginationLimit[device],
  };
}
