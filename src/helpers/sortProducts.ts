export const sortProducts = (visibleProducts: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'age':
      visibleProducts.sort((a, b) => a.age - b.age);
      break;

    case 'name':
      visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'price':
      visibleProducts.sort((a, b) => a.price - b.price);
      break;

    default:
      visibleProducts.sort((a, b) => a.age - b.age);
  }

  return visibleProducts;
};
