export const sortGoods = (goods: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'name':
      goods.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'price':
      goods.sort((a, b) => a.price - b.price);
      break;

    case 'age':
      goods.sort((a, b) => a.age - b.age);
      break;
    default:
      goods.sort((a, b) => a.age - b.age);
  }
};
