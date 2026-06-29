import { useEffect, useState } from 'react';
import { BREAKPOINTS, CARD_SIZES } from '../constants/cardsSlider';

export const useCardSize = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZES.mobile);

  useEffect(() => {
    const updateCardSize = () => {
      const width = document.documentElement.clientWidth;

      if (width >= BREAKPOINTS.desktop) {
        setCardSize(CARD_SIZES.desktop);

        return;
      }

      if (width >= BREAKPOINTS.tablet) {
        setCardSize(CARD_SIZES.tablet);

        return;
      }

      setCardSize(CARD_SIZES.mobile);
    };

    updateCardSize();

    window.addEventListener('resize', updateCardSize);

    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  return cardSize;
};
