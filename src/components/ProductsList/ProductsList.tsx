import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Product } from '../../shared/types/Product';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const ProductsList: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const amountOnPage = Number(searchParams.get('perPage')) || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const title =
    category === 'phones'
      ? 'Mobile Phones'
      : category === 'tablets'
        ? 'Tablets'
        : 'Accessories';
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch('api/products.json');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: Product[] = await response.json();
      const filteredProducts = data.filter(
        product => product.category === category,
      );

      setProducts(filteredProducts);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [category, fetchProducts]);

  const showProducts = () => {
    const sortedProducts = products.slice();
    const startIndex =
      amountOnPage !== 'all' ? (currentPage - 1) * amountOnPage : 0;
    const endIndex =
      amountOnPage !== 'all' ? currentPage * amountOnPage : products.length;

    switch (sortBy) {
      case 'age':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return sortedProducts.slice(startIndex, endIndex);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    setSearchParams({ ...Object.fromEntries(searchParams), sort: newSort });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAmount = e.target.value;

    const updatedParams = { ...Object.fromEntries(searchParams) };

    if (newAmount === 'all') {
      delete updatedParams.page;
      delete updatedParams.perPage;
    } else {
      updatedParams.perPage = newAmount;
      updatedParams.page = '1';
    }

    setSearchParams(updatedParams);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(newPage),
    });
  };

  const visibleProducts = showProducts();

  return (
    <div className={styles.ProductsList}>
      <div className={styles.ProductsList__content}>
        {isLoading && (
          <Loader
            isLoading={isLoading}
            hasError={hasError}
            onReload={() => {}}
          />
        )}

        {!isLoading && !hasError && products.length !== 0 && (
          <>
            <div className={styles.ProductsList__top}>
              <h1 className={styles.ProductsList__title}>{title}</h1>
              <p
                className={styles.ProductsList__counter}
              >{`${products.length} models`}</p>
            </div>

            <div className={styles.ProductsList__filters}>
              <div className={styles.ProductsList__sortBy}>
                <p className={styles.ProductsList__filtersText}>Sort by</p>
                <select
                  className={classNames(
                    styles.ProductsList__select,
                    styles.ProductsList__selectSort,
                    sortBy === 'alphabetically' &&
                      styles.ProductsList__alphabetically,
                  )}
                  name="sortBy"
                  id="sortBy"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>
              <div className={styles.ProductsList__elementsAmount}>
                <p className={styles.ProductsList__filtersText}>
                  Items on page
                </p>
                <select
                  className={classNames(
                    styles.ProductsList__select,
                    styles.ProductsList__selectAmount,
                  )}
                  name="elementsAmount"
                  id="elementsAmount"
                  value={amountOnPage}
                  onChange={handleAmountChange}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            <div className={styles.ProductsList__container}>
              <div className={styles.ProductsList__cardsContainer}>
                {visibleProducts.map(product => (
                  <ProductCard
                    product={product}
                    key={product.name}
                    className={styles.ProductsList__ProductCard}
                  />
                ))}
              </div>

              {amountOnPage !== 'all' && (
                <Pagination
                  totalItems={products.length}
                  itemsPerPage={amountOnPage as number}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  className={styles.ProductsList__Pagination}
                />
              )}
            </div>
          </>
        )}

        {!isLoading && products.length === 0 && (
          <p>There are no {category} yet</p>
        )}
      </div>
    </div>
  );
};
