import { Product } from "../types/Product";

export function sortBySearchParams(
  products: Product[],
  pageNumber: number,
  sortBy: string = 'newest',
  itemsOnPage: number = 16,
) {
  const newProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  if (itemsOnPage === Infinity) {
    return newProducts;
  }

  const firstItemOnPage = (pageNumber - 1) * itemsOnPage;
  const lastItemOnPage = firstItemOnPage + itemsOnPage;

  return newProducts.slice(firstItemOnPage, lastItemOnPage);
}

export function calculateTotalPrice(items: Product[]) {
  return items.reduce(
    (acc, item) =>
      item.quantity ? acc + item.price * item.quantity : acc + item.price,
    0,
  );
}

export function calculateTotalQuantity(items: Product[]) {
  return items.reduce(
    (acc, item) => (item.quantity ? acc + item?.quantity : acc + 1),
    0,
  );
}

export function createSlides(products: Product[], width: number): Product[][] {
  return products.reduce<Product[][]>((accum, product, index) => {
    const step = width < 1199 ? 20 : 4;

    const splitIndex = index % step;
    if (splitIndex === 0) {
      accum.push([product]);
    } else {
      accum[accum.length - 1].push(product);
    }

    return accum;
  }, []);
}

export function createId(...details: string[]): string {
  return details.map(detail => detail.toLowerCase().trim().replace(/\s+/g, '-')).join('-');
}
