import { Category } from '../types/Category';
import { FilterAndSortResult } from '../types/filterAndSortType';
import { Gadget } from '../types/Gadgets';
import { Product } from '../types/Product';

export const sortProductsByPrice = (products: Product[]) => {
  return products
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);
};

export const sortProductsByYear = (products: Product[]) => {
  return products.sort((a, b) => b.year - a.year).slice(0, 10);
};

export const upperCase = (lowerPath: string) => {
  return (
    lowerPath.charAt(0).toUpperCase() + lowerPath.slice(1, lowerPath.length)
  );
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getBgColorForRadio(color: string) {
  switch (color) {
    case 'spacegray':
      return '#414143';
    case 'space-gray':
      return '#414143';
    case 'midnight':
      return '#191970';
    case 'rosegold':
      return '#efc8c1';
    case 'midnightgreen':
      return '#3d4640';
    case 'spaceblack':
      return '#4a4947';
    case 'sierrablue':
      return '#9ab3cd';
    case 'graphite':
      return '#595753';
    default:
      return color;
  }
}

export const getRandomProducts = (arr: Product[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export const filterAndSortProducts = (
  products: Product[],
  sort: string,
  perPage: number | 'all',
  page: number,
  query?: string,
): FilterAndSortResult => {
  const sortedProducts = [...products];

  const searchedProducts = sortedProducts.filter(product =>
    product.name?.toLowerCase().includes(query?.toLowerCase() ?? ''),
  );

  if (sort === 'alphabetically') {
    searchedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'cheapest') {
    searchedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'expensive') {
    searchedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    searchedProducts.reverse();
  }

  const total = searchedProducts.length;

  if (perPage === 'all') {
    return { total, items: searchedProducts };
  } else {
    const startIndex = (page - 1) * perPage;

    return {
      total,
      items: searchedProducts.slice(startIndex, startIndex + perPage),
    };
  }
};

export function structureProducts(products: Gadget[]): Product[] {
  return products.map((product: Gadget) => {
    return {
      id: Math.random(),
      category: product.category as 'phones' | 'tablets' | 'accessories',
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: product.capacity,
      color: product.color,
      ram: product.ram,
      year: Math.random(),
      image: product.images[0],
    };
  });
}

export const sortingOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Alphabetically', value: 'alphabetically' },
  { label: 'Cheapest', value: 'cheapest' },
  { label: 'Expensive', value: 'expensive' },
];

export const itemsForPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

export const techSpecs = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

export const categoriesData: Category[] = [
  {
    name: 'Mobile Phones',
    path: 'phones',
    image: 'phones-category.png',
    quantity: 'phonesQuantity',
  },
  {
    name: 'Tablets',
    path: 'tablets',
    image: 'tablets-category.png',
    quantity: 'tabletsQuantity',
  },
  {
    name: 'Accessories',
    path: 'accessories',
    image: 'accessories-category.png',
    quantity: 'accessoriesQuantity',
  },
];

export const footerLinks = [
  { text: 'Github', href: 'https://github.com/futdevelop' },
  { text: 'Contacts', href: 'https://t.me/kolya2' },
  { text: 'Rights', href: 'https://t.me/kolya2' },
];
