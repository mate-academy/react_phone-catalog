import { getCardsToShow } from './getCardsToShow';
import { useMemo, useState } from 'react';
import { Product } from '../types/Product';

export const usePagedList = (initialList: Product[]) => {
  const [cardsToShow] = useState(getCardsToShow());

  const howButtonsRender = useMemo(() => {
    const quantity = Math.ceil(initialList?.length / cardsToShow);
    const result = [];

    for (let y = 1; y <= quantity; y++) {
      result.push(y);
    }

    return result;
  }, [initialList, cardsToShow]);

  const filterListPhone = (
    actualButton: number, // active-button-id
    list: Product[],
    howSplitCards: number,
    sortFor: string,
  ) => {
    let NewList = list;

    switch (sortFor) {
      case 'Cheapest':
        NewList = [...list].sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;

      case 'Alphabetically':
        NewList = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Newest':
        NewList = [...list].sort((a, b) => b.priceRegular - a.priceRegular);
        break;
    }

    let cards = cardsToShow;

    if (howSplitCards) {
      cards = howSplitCards;
    }

    const start = (actualButton - 1) * cards;
    const end = actualButton * cards;

    return NewList.slice(start, end);
  };

  const ditermineDirection = (direction: string, actualButton: number) => {
    let result: number = actualButton;

    if (direction === 'right') {
      const newButton = actualButton + 1;

      result = newButton > howButtonsRender.length ? actualButton : newButton;
    }

    if (direction === 'left') {
      const newButton = actualButton - 1;

      result = newButton === 0 ? actualButton : newButton;
    }

    return result;
  };

  return { ditermineDirection, filterListPhone, howButtonsRender };
};

export { getCardsToShow };
