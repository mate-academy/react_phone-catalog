/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductsList.scss';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Sort } from '../../types/Sort';
import { DropDown } from '../DropDown/DropDown';
import { Notification } from '../Notification/Notification';

type Props = {
  products: Product[];
};

export const sortObj = [
  {
    label: 'Newest',
    value: 'age',
  },
  {
    label: 'Cheapest',
    value: 'price',
  },
  {
    label: 'Alphabetically',
    value: 'name',
  },
];

const itemsPerPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const getSort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const indexOfLastItem = Math.min(currentPage * +perPage, products.length);
  const indexOfFirstItem = (currentPage - 1) * +perPage;
  const currentProducts
    = perPage !== 'all'
      ? products.slice(indexOfFirstItem, indexOfLastItem)
      : [...products];

  const preparedProducts: Product[] = useMemo(() => {
    let sortedProducts;
    const normalizedQuery = query.toLocaleLowerCase();
    let filteredProducts = [...currentProducts];

    if (query) {
      filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(normalizedQuery));
    }

    switch (getSort) {
      case Sort.alphabet:
        sortedProducts = [...filteredProducts].sort((p1, p2) => p1[getSort].localeCompare(p2[getSort]));
        break;
      case Sort.newest:
        sortedProducts = [...filteredProducts].sort(
          (p1, p2) => p2[getSort] - p1[getSort],
        );
        break;
      case Sort.cheapest:
        sortedProducts = [...filteredProducts].sort(
          (p1, p2) => p1.price * ((100 - p1.discount) / 100)
            - p2.price * ((100 - p2.discount) / 100),
        );
        break;

      default:
        return filteredProducts;
    }

    return sortedProducts || filteredProducts;
  }, [searchParams, currentProducts, query]);

  return (
    <>
      {preparedProducts.length === 0 ? (
        <Notification message="There is no products by this query" />
      ) : (
        <div className="product-list">
          <div>
            <div>
              <div className="product-list__filters">
                <div className="product-list__dropdown-wrapper">
                  <p className="product-list__dropdown-label">Sort by</p>
                  <DropDown
                    currentOption={getSort}
                    searchName="sort"
                    options={sortObj}
                  />
                </div>

                <div className="product-list__dropdown-wrapper product-list__dropdown-wrapper--per-page">
                  <p className="product-list__dropdown-label">Items on page</p>
                  <DropDown
                    currentOption={perPage}
                    searchName="perPage"
                    options={itemsPerPageOptions}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="product-list__list">
            {preparedProducts.map((item) => (
              <div key={item.id} className="product-list__item">
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          {currentProducts.length !== products.length && (
            <Pagination total={products.length} />
          )}
        </div>
      )}
    </>
  );
};
