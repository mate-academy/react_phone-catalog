import { useStateContext } from '../../../state/state';

export const useSortedProducts = (sort: string, category: string) => {
  const { state } = useStateContext();

  const productsByCategory = state.products.filter(
    product => product.category === category,
  );

  const sortedProducts = [...productsByCategory].sort((a, b) => {
    if (sort === 'year') {
      return b.year - a.year;
    } else if (sort === 'title') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'price') {
      return a.price - b.price;
    }

    return 0;
  });

  return sortedProducts;
};
