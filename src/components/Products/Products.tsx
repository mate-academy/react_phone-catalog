import './Products.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/product';
import { Dropdown } from '../Dropdown';
import { getSearchWith } from '../../utils/getSearchWith';
import { Pagination } from '../Pagination';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { Navigation } from '../Navigation';
import {
  SortParamKeys,
  SortType,
  PerPageKeys,
  perPageList,
  sortByList,
} from '../../types/sortFilters';

type Props = {
  title: string;
  products: Product[];
};

export const Products: React.FC<Props> = ({ title, products }) => {
  const categories = ['Mobile Phones', 'Tablets', 'Accessories'];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const sortFilter =
    (searchParams.get('sort') as SortParamKeys) || SortType.AGE;
  const perPage = (searchParams.get('perPage') as PerPageKeys) || 'all';

  const numberOfPages = Math.ceil(products.length / +perPage);

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSortFilterChange = (v: string) => {
    setSearchWith({
      sort: v,
    });
  };

  const handlePerPageChange = (v: string) => {
    setSearchWith({
      perPage: v,
    });
  };

  const handlePageChange = (v: string) => {
    setSearchWith({
      page: v,
    });
    window.scroll(0, 0);
  };

  const sortedProducts = getSortedProducts(products, searchParams);

  const startSlice = currentPage === '1' ? 0 : (+currentPage - 1) * +perPage;
  const endSlice = +currentPage * +perPage;

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startSlice, endSlice);

  return (
    <section
      className={classNames('products', {
        'products-fav': title === 'Favourites',
      })}
    >
      <div className="products__navigation">
        <Navigation />

        <div className="products__info">
          <h4 className="products__info-title">{title}</h4>
          <a className="products__info-amount">{`${products.length} models`}</a>
        </div>

        {categories.includes(title) && (
          <div className="products__filter">
            <Dropdown
              label="Sort by"
              values={sortByList}
              selected={sortByList[sortFilter]}
              setParam={handleSortFilterChange}
            />
            <Dropdown
              label="Items on page"
              values={perPageList}
              selected={perPageList[perPage]}
              setParam={handlePerPageChange}
            />
          </div>
        )}
      </div>

      <div className="products__catalog">
        <ul className="products__catalog-list">
          {visibleProducts.map(product => (
            <li className="products__catalog-item" key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      {perPage !== 'all' && (
        <Pagination
          pages={numberOfPages}
          currentPage={currentPage}
          setPage={handlePageChange}
        />
      )}
    </section>
  );
};
