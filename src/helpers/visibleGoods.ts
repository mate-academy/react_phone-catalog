export const visibleGoodsOnPage = (goods: Product[], perPage: string, page: number) => {
  if (perPage !== 'all') {
    const start = (page - 1) * +perPage;

    return goods.slice(start, start + +perPage);
  }

  return goods;
};
