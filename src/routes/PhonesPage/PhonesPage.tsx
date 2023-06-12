import { useState, useEffect } from 'react';

import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { FilterSelector } from '../../components/FilterSelector/FilterSelector';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Filter, Page } from '../../types/filters';
import { getSelectedTypeProducts } from '../../helpers/productsFunctions';
import { Product } from '../../types/product';

import './PhonesPage.scss';

const filters: Filter[] = [
  {
    label: 'None',
    value: 'all',
  },
  {
    label: 'Newest',
    value: 'age',
  },
  {
    label: 'Alphabetically',
    value: 'name',
  },
  {
    label: 'Cheapest',
    value: 'price',
  },
];

const pages: Page[] = ['all', '4', '8', '16'];

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSelectedTypeProducts('phone').then(setProducts);
  });

  return (
    <section className="phones-page">
      <div className="phone-page__crumbs">
        <BreadCrumbs />
      </div>

      <h1>Mobile phones</h1>
      <p>95 models</p>

      <div className="phones-page__selectors">
        <FilterSelector
          name="sort"
          label="Sort by"
          width={176}
          options={filters}
        />
        <FilterSelector
          name="page"
          label="Items on page"
          width={128}
          options={pages}
        />
      </div>

      <ProductsList products={products} />
    </section>
  );
};
