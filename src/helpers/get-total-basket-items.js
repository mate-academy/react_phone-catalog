const getTotalBasketItems = basketItems => basketItems
  .map(item => item.quantity)
  .reduce((sum, current) => sum + current, 0);

export default getTotalBasketItems;
