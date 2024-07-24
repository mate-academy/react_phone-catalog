// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAllItems = (elem: any, productsLen: number) => {
  if (elem === 'all') {
    return productsLen;
  } else if (!elem) {
    return 4;
  }

  return +elem;
};

export const createArray = (productsLen: number, itemsOnPage: number) => {
  const itemsPossible = Math.ceil(
    productsLen / isAllItems(itemsOnPage, productsLen),
  );

  return Array.from({ length: itemsPossible }, (_, i) => i + 1);
};
