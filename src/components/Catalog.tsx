import { ProductsList } from './ProductsList';
import type { FC } from 'react';
import { Product, Sort } from '../types';
import { Dropdown } from './Dropdown';

type Props = {
  products: Product[];
};

export const Catalog: FC<Props> = ({ products }) => {
  return (
    <>
      <p className="mt-2 text-secondary">
        {products.length} {products.length === 1 ? 'model' : 'models'}
      </p>

      <div className="mt-8 sm:mt-10 pageGrid">
        <Dropdown
          description="Sort by"
          options={{
            Newest: Sort.Age,
            Alphabetically: Sort.Title,
            Cheapest: Sort.Price,
          }}
          searchParam="sort"
          defaultValue={Sort.Age}
          className="col-span-2 sm:col-span-4"
        />
        <Dropdown
          description="Items on page"
          options={{ 4: '4', 8: '8', 16: '16', All: 'all' }}
          searchParam="perPage"
          defaultValue="All"
          className="col-span-2 sm:col-span-3"
        />
      </div>

      <ProductsList products={products} className="mt-6" />
    </>
  );
};
