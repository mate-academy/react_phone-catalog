import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../shared/components/ProductCard';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select/Select';
import { getProducts } from '../shared/utils/api';
import { Product } from '../shared/types/Product';
import { Loader } from '../shared/components/Loader';

const categoryTitles: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'expensive', label: 'Expensive' },
];

const perPageOptions = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 0, label: 'All' },
];

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => {
        const filteredData = category
          ? data.filter(p => p.category === category)
          : data;

        setProducts(filteredData);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, sortBy, itemsPerPage]);

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch (sortBy) {
      case 'alphabetically':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return copy.sort((a, b) => a.price - b.price);
      case 'expensive':
        return copy.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return copy.reverse();
    }
  }, [products, sortBy]);

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 0) {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const pageTitle = category
    ? categoryTitles[category] || 'Catalog'
    : 'Catalog';

  return (
    <div className={styles.catalog_page}>
      <Breadcrumbs category={category} />

      <h1 className={styles.catalog_page__title}>{pageTitle}</h1>
      <p className={styles.catalog_page__models_count}>
        {products.length} models
      </p>

      <div className={styles.catalog_page__filters}>
        <div className={styles.catalog_page__filter_block}>
          <Select
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            customClass={styles.catalog_page__filter_sort}
          />
        </div>

        <div className={styles.catalog_page__filter_block}>
          <Select
            label="Items on page"
            value={itemsPerPage}
            options={perPageOptions}
            onChange={setItemsPerPage}
            customClass={styles.catalog_page__filter_items}
          />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.catalog_page__grid}>
            {visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.itemId}
                category={category || ''}
                img={product.image}
                name={product.name}
                capacity={product.capacity}
                priceRegular={product.fullPrice}
                priceDiscount={product.price}
                ram={product.ram}
                screen={product.screen}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};
