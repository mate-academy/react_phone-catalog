import React, { useState, useEffect } from 'react';
import PP from './ProductsPage.module.scss';
import { BreadCrumbs } from '../Shared/Breadcrumbs';
import { Product } from '../../types/Product';
import { ProductCard } from '../Shared/Product card';
import { Loader } from '../../components/Loader';
import { Select } from './components/Select';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

const sortBy = {
  title: 'Sort by',
  param: 'sort',
  options: ['Newest', 'Alphabetically', 'Cheapest'],
};
const itemsPerPage = {
  title: 'Items on page',
  param: 'items',
  options: ['4', '8', '16', 'All'],
};

type Props = {
  products: Product[];
  title: string;
};

export const ProductsPage: React.FC<Props> = ({ products, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const sortOption = searchParams.get('sort') || 'Newest';
  const itemsOnPage = searchParams.get('items') || '4';

  const getSortedProducts = () => {
    const productsForsort = [...products];

    switch (sortOption) {
      case 'Alphabetically':
        return productsForsort.sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return productsForsort.sort((a, b) => a.price - b.price);
      default:
        return productsForsort.sort((a, b) => b.year - a.year);
    }
  };

  const sortedProducts = getSortedProducts();

  const handleSort = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);
    params.delete('page');
    setSearchParams(params);
  };

  const productsLength = products.length;
  const itemsAmount = itemsOnPage === 'All' ? productsLength : +itemsOnPage;
  const firstItem = (page - 1) * itemsAmount;
  const lastItem = firstItem + itemsAmount;
  const pageCount = Math.ceil(productsLength / itemsAmount);

  useEffect(() => {
    if (page > pageCount) {
      const params = new URLSearchParams(searchParams);

      if (pageCount <= 1) {
        params.delete('page');
      } else {
        params.set('page', String(pageCount));
      }

      setSearchParams(params);
    }
  }, [products, page, pageCount]);

  const handleAmount = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('items', option);
    params.delete('page');
    setSearchParams(params);
  };

  useEffect(() => {
    if (products.length >= 0) {
      const timer = setTimeout(() => setIsLoading(false), 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={PP.products}>
      <div className="container">
        <div className={PP.products__content}>
          <BreadCrumbs />
          <div className={PP.products__details}>
            <h1 className={PP.products__title}>{title}</h1>
            {title !== 'Favourites' ? (
              <p className={PP.products__amount}>{products.length} models</p>
            ) : (
              <p className={PP.products__amount}>{products.length} items</p>
            )}
          </div>
          {title !== 'Favourites' && (
            <div className={PP.products__settings}>
              <Select data={sortBy} func={handleSort} />
              <Select data={itemsPerPage} func={handleAmount} />
            </div>
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={PP.products__list}>
                {sortedProducts.slice(firstItem, lastItem).map(product => (
                  <div key={product.id} className={PP.products__product}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {sortedProducts.length === 0 && title === 'Favourites' && (
                <div className={PP.notFoundPage}>
                  <h1 className={PP.notFoundPage__title}>
                    There are no favourites yet...
                  </h1>

                  <div className={PP.notFoundPage__image}></div>
                </div>
              )}
            </>
          )}
          {pageCount > 1 && <Pagination pageCount={pageCount} />}
        </div>
      </div>
    </div>
  );
};
