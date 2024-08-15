import { CatalogProduct } from '../types/CatalogProduct';
import { SliderProduct } from '../types/SliderProduct';
import { SortBy } from '../types/SortBy';

const [newest, alphabetically, cheapest] = Object.keys(SortBy);

export function getSortedProducts(
  products: CatalogProduct[],
  allProducts: SliderProduct[],
  sortParam: string,
): CatalogProduct[] {
  const sortedProducts = [...products];

  switch (sortParam) {
    case newest:
      return sortedProducts.sort((product1, product2) => {
        const year1 =
          allProducts.find(product => product.itemId === product1.id)?.year ||
          0;
        const year2 =
          allProducts.find(product => product.itemId === product2.id)?.year ||
          0;

        return year2 - year1;
      });

    case alphabetically:
      return sortedProducts.sort((product1, product2) => {
        const name1 = product1.name;
        const name2 = product2.name;

        return name1.localeCompare(name2);
      });

    case cheapest:
      return sortedProducts.sort((product1, product2) => {
        const price1 = product1.priceDiscount;
        const price2 = product2.priceDiscount;

        return price1 - price2;
      });

    default:
      return sortedProducts;
  }
}
