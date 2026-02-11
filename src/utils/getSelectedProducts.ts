import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { SortFilter } from '../types/SortFilter';
import { productsFilter } from './productsFilter';

interface Selector {
  amount: number;
  category?: Category;
  productFilter?: SortFilter;
  random?: boolean;
}

function getRandomUniqueItems<T>(array: T[], count: number): T[] {
  if (count > array.length) {
    throw new Error('Count exceeds the number of unique items in the array');
  }

  const shuffled = array.map(item => item).sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

// use this when you need to select some products for ProductsCarousel, etc.
export function getSelectedProducts(
  products: Product[],
  selector: Selector,
): Product[] {
  let filteredProducts = products.map(p => p);

  if (selector.category) {
    filteredProducts = productsFilter.byCategory(
      filteredProducts,
      selector.category,
    );
  }

  if (selector.productFilter) {
    filteredProducts = productsFilter.bySortFilter(
      filteredProducts,
      selector.productFilter,
    );
  }

  if (selector.random) {
    filteredProducts = getRandomUniqueItems(filteredProducts, selector.amount);
  }

  if (selector.amount) {
    filteredProducts = filteredProducts.slice(0, selector.amount);
  }

  return filteredProducts;
}
