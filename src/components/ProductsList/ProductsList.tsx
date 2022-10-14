import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../helpers/ProductsContext';
import { Filter } from '../../types/Filter';
import { CustomSelector } from '../CustomSelector';
import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

export const ProductsList: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const tempProducts = [...products];

  // const FilterValues = {
  //   all: 'All',
  //   age: 'Newest',
  //   name: 'Alphabetically',
  //   price: 'Cheapest',
  // };

  switch (sort) {
    case '':
      break;
    case 'age':
      tempProducts.sort((item1, item2) => item1.age - item2.age);
      break;
    case 'name':
      tempProducts.sort((item1, item2) => item1.name.localeCompare(item2.name));
      break;
    case 'price':
      tempProducts.sort((item1, item2) => item1.price - item2.price);
      break;

    default:
      break;
  }

  return (
    <section className="section products-list">
      <div className="section__title">
        Mobile phones
      </div>

      <div className="products-list__products-count">
        {`${products.length} models`}
      </div>

      <div className="products-list__filters filters">
        <div className="filters__sort-filter">
          <div className="filters__subtitle">
            Sort by
          </div>

          <div className="filters__filter">
            <CustomSelector
              optionFields={
                [Filter.all, Filter.age, Filter.name, Filter.price]
              }
              type="sort"
              selectedValue={sort}
            />
          </div>
        </div>

        <div className="filters__on-page-filter">
          <div className="filters__subtitle">
            Items on page
          </div>

          <div className="filters__filter">
            <CustomSelector
              optionFields={
                ['All', '4', '8', '16']
              }
              type="pagination"
              selectedValue={perPage}
            />
          </div>
        </div>
      </div>

      <div
        className="
          products-list__products-container
          products
        "
      >
        {tempProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
