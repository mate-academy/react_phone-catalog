import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../../types/Filter';
import { CustomSelector } from '../CustomSelector';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './ProductsList.scss';
import { Pagination } from '../Pagination';

type Props = {
  products: Product[];
  productType: string;
};

export const ProductsList: React.FC<Props> = ({
  productType,
  products,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = searchParams.get('page') || '';
  const query = searchParams.get('query') || '';
  const perPageNum = +perPage;
  const currentPageNum = +currentPage;
  let gadgets = products.filter(product => {
    if (productType !== 'all') {
      return product.type === productType;
    }

    return true;
  });

  if (query) {
    gadgets = gadgets.filter(gadget => (
      gadget.name.toLowerCase().includes(query.toLocaleLowerCase())
      || gadget.id.toLowerCase().includes(query.toLocaleLowerCase())));
  }

  switch (sort) {
    case '':
      break;
    case 'age':
      gadgets.sort((item1, item2) => item1.age - item2.age);
      break;
    case 'name':
      gadgets.sort((item1, item2) => (
        item1.name.localeCompare(item2.name)
      ));
      break;
    case 'price':
      gadgets.sort((item1, item2) => item1.price - item2.price);
      break;

    default:
      break;
  }

  let leftProductsLimit;
  let rightProductsLimit;

  if (currentPage && perPage) {
    leftProductsLimit = perPageNum * (currentPageNum - 1);
    rightProductsLimit = perPageNum * currentPageNum > gadgets.length
      ? gadgets.length
      : perPageNum * currentPageNum;
  } else {
    leftProductsLimit = 0;
    rightProductsLimit = gadgets.length;
  }

  const resultProducts = gadgets.slice(
    leftProductsLimit, rightProductsLimit,
  );

  return (
    <>
      <div
        className={classNames('products-list__products-count', {
          'products-list__products-count--is-query': query,
        })}
      >
        {`${resultProducts.length} models`}
      </div>
      {resultProducts.length > 0 ? (
        <>
          <div
            className={classNames('products-list__filters filters', {
              'filters--is-hidden': query,
            })}
          >
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
                  selectedValue={perPage.toString()}
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
            {resultProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="products-list__no-items">
          There are no products here yet or the search returned no results.
        </div>
      )}

      <div className="category-page__pagination">
        <Pagination
          allProducts={gadgets}
        />
      </div>
    </>
  );
};
