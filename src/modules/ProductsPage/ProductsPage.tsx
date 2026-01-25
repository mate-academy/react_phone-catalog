import React, { useEffect } from 'react';
import { Product } from '../../types/Product';
import style from './ProductsPage.module.scss';
import { Nav } from './components/Nav';
import { Select } from './components/Select';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../shared/ProductCard';
import { Pagination } from './components/Pagination';

const sortBy = {
  title: 'Sort by',
  param: 'sort',
  options: ['Newest', 'Alphabetically', 'Cheapest'],
};
const itemsPerPage = {
  title: 'Items on page',
  param: 'items',
  options: ['12', '24', '48', 'All'],
};

type Props = {
  products: Product[];
  title: string;
};

export const ProductsPage: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const sortOption = searchParams.get('sort') || 'Newest';
  const query = searchParams.get('query') || '';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query),
  );
  const prodsLength = filteredProducts.length;

  const getSortedProducts = (): Product[] => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case 'Alphabetically':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted.sort((a, b) => b.year - a.year);
    }
  };

  const sortedProducts = getSortedProducts();

  const itemsAmount = +(searchParams.get('items') === 'All'
    ? products.length
    : +(searchParams.get('items') || '12'));
  const firstItem = page ? (Number(page) - 1) * itemsAmount : 0;
  const lastItem = page ? firstItem + itemsAmount : itemsAmount;
  const pageCount = Math.ceil(filteredProducts.length / itemsAmount);

  const handleAmount = (amount: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('items', amount);

    const newAmount = amount === 'All' ? products.length : Number(amount);
    const newPageCount = Math.ceil(filteredProducts.length / newAmount);
    const pageOfFirstItem = Math.min(
      Math.floor(firstItem / newAmount) + 1,
      newPageCount,
    );

    if (pageOfFirstItem === 1) {
      params.delete('page');
    } else {
      params.set('page', String(pageOfFirstItem));
    }

    setSearchParams(params);
  };

  const handleSort = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);
    setSearchParams(params);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentPage = Number(params.get('page') || '1');
    const itemsOnPage = 12;

    const firstItemIndex = (currentPage - 1) * itemsOnPage;
    const lastItemIndex = firstItemIndex + itemsOnPage;

    // If last item exceeds total items, move to previous page(s)
    if (lastItemIndex > products.length && currentPage > 1) {
      const newPage = currentPage - 1;

      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(newPage));
      }

      setSearchParams(params);
    }
  }, [products]);

  return (
    <div className={style.products}>
      <div className="container">
        <div className={style.products__content}>
          <Nav />
          <div className={style['products__page-details']}>
            <h1 className={style.products__title}>{title}</h1>
            {title !== 'Favourites' ? (
              <p className={style.products__amount}>{products.length} models</p>
            ) : (
              <p className={style.products__amount}>{products.length} items</p>
            )}
          </div>

          <div className={style.products__top}>
            {title !== 'Favourites' && (
              <div className={style.products__settings}>
                <Select data={sortBy} onSelect={handleSort} />
                <Select data={itemsPerPage} onSelect={handleAmount} />
              </div>
            )}
            <div className={style.products__list}>
              {prodsLength === 0 && query && (
                <p className={style.products__empty}>
                  There are no {title.toLowerCase()} matching the query
                </p>
              )}

              {title !== 'Favourites' &&
                sortedProducts.slice(firstItem, lastItem).map(product => (
                  <div key={product.id} className={style.products__product}>
                    <ProductCard product={product} isFullPrice={false} />
                  </div>
                ))}

              {title === 'Favourites' &&
                products.slice(firstItem, lastItem).map(product => (
                  <div key={product.id} className={style.products__product}>
                    <ProductCard product={product} isFullPrice={false} />
                  </div>
                ))}
            </div>
          </div>
          {pageCount > 1 && <Pagination pageCount={pageCount} />}
        </div>
      </div>
    </div>
  );
};
