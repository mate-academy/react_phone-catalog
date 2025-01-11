/* eslint-disable */
import { useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { ProductCard } from '../../components/ProductCard';
import allProducts from '../../../public/api/products.json';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import classNames from 'classnames';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Pagination } from '../../components/Pagination';

export const Catalog: React.FC = ({}) => {
  const category = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [finalProducts, setFinalProducts] = useState(allProducts);

  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(16);

  const lastVisibleItem =
    itemsPerPage === 'All' ? totalItems : currentPage * itemsPerPage;
  const firstVisibleItem =
    itemsPerPage === 'All' ? 0 : lastVisibleItem - itemsPerPage;

  useEffect(() => {
    if (category.category) {
      const filteredProducts = allProducts.filter(
        product => product.category === category.category,
      );

      setFinalProducts(filteredProducts);
      setTotalItems(filteredProducts.length);
    }
  }, [category]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    setCurrentPage(newPage);
  };

  const handleSort = sortBy => {
    const sortedProducts = [...finalProducts];

    switch (sortBy) {
      case 'Price (low to high)':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price (high to low)':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    setFinalProducts(sortedProducts);
  };

  const handleItemsPerPage = (value: string) => {
    if (value === 'All') {
      setItemsPerPage('All');
    } else {
      setItemsPerPage(Number(value));
    }

    setCurrentPage(1);
  };

  const currentItems = finalProducts.slice(firstVisibleItem, lastVisibleItem);
  const currentCategory = category.category;

  return (
    <>
      <section className={classNames(styles.catalog, styles.container)}>
        <Breadcrumbs currentCategory={currentCategory || ''} />

        <h1 className={styles.catalog__title}>
          {currentCategory === 'phones' && 'Mobile Phones'}
          {currentCategory === 'tablets' && 'Tablets'}
          {currentCategory === 'accessories' && 'Accessories'}
        </h1>

        <p className="catalog__subtitle">{totalItems} models</p>

        <div className={styles.catalog__controls}>
          <Dropdown
            handleSort={handleSort}
            label="Sort by"
            options={['Newest', 'Price (low to high)', 'Price (high to low)']}
          />
          <Dropdown
            handleSort={handleItemsPerPage}
            label="Items on page"
            options={['8', '16', '32', 'All']}
          />
        </div>

        <div className={styles.catalog__products}>
          {currentItems.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              type={currentCategory}
            />
          ))}
        </div>

        {itemsPerPage !== 'All' && (
          <Pagination
            total={totalItems}
            perPage={itemsPerPage as number}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};
