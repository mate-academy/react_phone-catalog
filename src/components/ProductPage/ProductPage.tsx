/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import NavMain from '../../components/NavMain/NavMain';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Product';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { PerPage } from '../../types/PerPage';

type Props = {
  product: Product[];
  title: string;
};

const ProductPage: React.FC<Props> = ({ product, title }) => {
  const [sortBy, setSort] = useState('Newest');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || PerPage.Four;
  const total = product.length;

  const currentPerPage = perPage === 'all' ? product.length : parseInt(perPage);

  const handlePerPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        perPage: event.target.value,
        page: '1',
        sort: sortBy,
      });
    },
    [setSearchParams, sortBy],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({
        page: String(newPage),
        perPage,
      });
    },
    [setSearchParams, perPage],
  );

  const startIndex = (page - 1) * currentPerPage;

  const selectedProducts = product.slice(
    startIndex,
    startIndex + currentPerPage,
  );

  const handleChangeSort = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams(prevSearchParams => {
        const newParams = new URLSearchParams(prevSearchParams);

        newParams.set('sort', event.target.value);
        newParams.set('page', '1');

        return newParams;
      });
      setSort(event.target.value);
    },
    [setSearchParams],
  );

  const sortProducts = (products: Product[]) => {
    switch (sortBy) {
      case 'Newest':
        return products.sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(selectedProducts);

  return (
    <div className="container">
      <div className="phones">
        <div className="phones__top">
          <NavMain category={title} />
        </div>

        <h1 className="phones__title">{title}</h1>

        <span className="phones__models">{`${product.length} models`}</span>

        <label htmlFor="sortBy" className="phones__label phones__label-sort">
          Sort by
          <select
            value={sortBy}
            className="phones__select"
            id="sortBy"
            onChange={handleChangeSort}
          >
            <option className="phones__option" value="Newest" id="1">
              Newest
            </option>

            <option className="phones__option" value="Alphabetically" id="2">
              Alphabetically
            </option>

            <option className="phones__option" value="Cheapest" id="3">
              Cheapest
            </option>
          </select>
        </label>

        <label
          htmlFor="countProduct"
          className="phones__label phones__label-items"
        >
          Items on page
          <select
            value={perPage}
            onChange={handlePerPage}
            className="phones__select"
            id="countProduct"
          >
            <option className="phones__option" value="4">
              4
            </option>

            <option className="phones__option" value="8">
              8
            </option>

            <option className="phones__option" value="16">
              16
            </option>

            <option className="phones__option" value="all">
              All
            </option>
          </select>
        </label>

        <div className="phones__block">
          {sortedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <Pagination
          total={total}
          perPage={currentPerPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductPage;
