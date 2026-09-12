import {describe, expect, it} from 'vitest';

import {Products} from '../type/Productes';
import {SortProduct} from '../type/type';
import {filterAndSortProducts, paginateProducts} from './catalogPipeline';

const makeProduct = (
  name: string,
  price: number,
  fullPrice: number,
): Products => ({
  capacity: '128GB',
  category: 'phones',
  color: 'black',
  fullPrice,
  id: name,
  image: '',
  itemId: name,
  name,
  price,
  ram: '4GB',
  screen: '6 inches',
  year: 2024,
});

describe('catalog pipeline', () => {
  it('filters before sorting and compares discounted prices consistently', () => {
    const products = [
      makeProduct('Phone B', 300, 350),
      makeProduct('Tablet', 100, 120),
      makeProduct('Phone A', 200, 1000),
    ];

    const result = filterAndSortProducts(products, 'phone', SortProduct.Price);

    expect(result.map(product => product.name)).toEqual(['Phone A', 'Phone B']);
  });

  it('paginates the filtered result and supports All', () => {
    const products = [
      makeProduct('A', 100, 100),
      makeProduct('B', 200, 200),
      makeProduct('C', 300, 300),
    ];

    expect(paginateProducts(products, 2, '2').map(item => item.name)).toEqual([
      'C',
    ]);
    expect(paginateProducts(products, 3, 'All')).toEqual(products);
  });
});
