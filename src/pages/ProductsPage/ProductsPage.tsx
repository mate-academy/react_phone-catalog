import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Products } from '../../types/Products';
import { Category } from '../../types/Category';
import { useParams, useSearchParams } from 'react-router-dom';
import { DropDown } from './components/DropDown';

export const ProductsPage = () => {
  const { products } = useProducts();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const itemCategory = category as Category;

  const filteredByCategory = products.filter(
    product => product.category === itemCategory,
  );

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const defaultParams = {
    sortField: 'year',
    count: `${filteredByCategory.length}`,
    page: '1',
  };

  const sortOptions = {
    [defaultParams.sortField]: 'Newest',
    name: 'Alphabetically',
    price: 'Cheapest',
  };

  const getSortedProducts = (products: Products[], sortField: string) => {
    switch (sortField) {
      case 'year':
        return [...products].sort((a, b) => a.year - b.year);

      case 'price':
        return [...products].sort((a, b) => a.price - b.price);

      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));

      default:
        return [...products];
    }
  };

  const sortField = searchParams.get('sortField') || defaultParams.sortField;

  const sortedProducts = getSortedProducts(filteredByCategory, sortField);

  return (
    <div className={styles.products}>
      <div className={styles.products__breadcrumbs}>lalala</div>
      <h1 className={styles.products__title}>
        {capitalizeFirstLetter(itemCategory)}
      </h1>
      <p className={styles.products__count}>
        {`${filteredByCategory.length} models`}
      </p>

      {!filteredByCategory.length ? (
        <h2 className={styles.products__items}>
          There are no {itemCategory} yet
        </h2>
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.products__filters}>
              <p className={styles.products__name}>Sort by</p>
              <DropDown options={sortOptions} value={sortOptions[sortField]} />
            </div>
          </div>
          <div className={styles.products__product}>
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                path={`/product/${product.id}`}
                checkPrice
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
