import { Product } from 'src/types/Product';

export function getRenderedCapacity(capacity: string) {
  const capacityValue = +capacity.slice(0, -2);
  let capacityInGB = '';

  if (capacityValue >= 1000) {
    capacityInGB = `${Math.round(capacityValue / 1000)}GB`;
  }

  return capacityValue < 1000
    ? capacity
    : capacityInGB;
}

export function getRenderedRam(ram: string) {
  const ramValue = +ram.slice(0, -2);
  let ramInGB = '';

  if (ramValue >= 1000) {
    ramInGB = `${Math.round(ramValue / 1000)}GB`;
  }

  return ramValue < 1000
    ? ram
    : ramInGB;
}

export function capitalize(arg: string) {
  return arg && arg[0].toUpperCase() + arg.slice(1);
}

export function lower(arg: string) {
  return arg && arg.toLowerCase();
}

export function getProductsWithActualPrice(products: Product[]) {
  return products.map(el => {
    if (el.discount > 0) {
      return {
        ...el,
        priceAfterDiscount: el.price - ((el.price / 100) * el.discount),
      };
    }

    return { ...el };
  });
}

export function sortProducts(
  productsToSort: Product[],
  sortKey: string,
) {
  const callback = (
    product1: Product,
    product2: Product,
  ) => {
    switch (sortKey) {
      case 'name':
        return product1[sortKey].localeCompare(product2[sortKey]);

      case 'price':
        return (product1.priceAfterDiscount || product1[sortKey])
        - (product2.priceAfterDiscount || product2[sortKey]);

      case 'age':
        return product1[sortKey] - product2[sortKey];

      default:
        return 0;
    }
  };

  return productsToSort.sort(callback);
}

export function getRandomId() {
  return String(Math.random()).slice(2, 8);
}

export function getMultupleRandom(arr: Product[], num: number) {
  const shuffledArr = [...arr].sort(() => 0.5 - Math.random());

  return shuffledArr.slice(0, num);
}
