export const sldierFilter = (cards: Good[], filterType: string) => {
  switch (filterType) {
    case 'hotPrice':
      return [...cards]
        .filter(card => card.price && card.discount)
        .sort((a: Good, b: Good): number => {
          const aDiscountPrice = a.discount / 100 * a.price;
          const bDiscountPrice = b.discount / 100 * b.price;

          return bDiscountPrice - aDiscountPrice;
        })
        .slice(0, 8);

    case 'highPrices':
      return [...cards]
        .sort((a: Good, b: Good): number => {
          const aDiscountPrice = a.price;
          const bDiscountPrice = b.price;

          return bDiscountPrice - aDiscountPrice;
        })
        .slice(0, 8);

    default:
      return cards;
  }
}
