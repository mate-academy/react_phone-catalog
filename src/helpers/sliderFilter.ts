import { SLIDER_FILTER_TYPE } from './config';

export const sliderFilter = (cards: Good[], filterType: string, id: string) => {
  switch (filterType) {
    case SLIDER_FILTER_TYPE.hotPrice:
      return [...cards]
        .filter(card => card.price && card.discount)
        .sort((a: Good, b: Good): number => {
          const aDiscountPrice = (a.discount / 100) * a.price;
          const bDiscountPrice = (b.discount / 100) * b.price;

          return bDiscountPrice - aDiscountPrice;
        })
        .slice(0, 8);

    case SLIDER_FILTER_TYPE.alsoLike:
      return [...cards]
        .sort((): number => {
          return Math.random() - 0.5;
        })
        .filter(card => card.id !== id)
        .slice(0, 8);

    case SLIDER_FILTER_TYPE.newModels:
      return [...cards]
        .sort((a: Good, b: Good): number => {
          const aDiscountPrice = a.age;
          const bDiscountPrice = b.age;

          return aDiscountPrice - bDiscountPrice;
        })
        .slice(0, 8);

    default:
      return cards;
  }
};
