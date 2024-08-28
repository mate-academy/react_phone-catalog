import React, { useState, useEffect, useCallback } from 'react';
import { getProductsByCategory } from '../../servises/Products';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { FilterType, ItemsPerPage } from '../../types/Filter';
import { sortProducts } from '../../utils/sortProducts';
import { Dropdown } from '../Dropdown/Dropdown';

type ProductsListProps = {
  category: string;
  title: string;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  category,
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || ItemsPerPage.Four;
  const sortType = searchParams.get('sort') || 'age';
  const searchQuery = searchParams.get('query') || '';

  const actualPerPage = perPage === 'All' ? products.length : parseInt(perPage);
  const total = products.length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductsByCategory(category);

        const sortedProducts = sortProducts(fetchedProducts, sortType);

        setProducts(sortedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortProducts();
  }, [category, sortType]);

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ sort: event.target.value, page: '1', perPage });
    },
    [setSearchParams, perPage],
  );

  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        perPage: event.target.value,
        page: '1',
        sort: sortType,
      });
    },
    [setSearchParams, sortType],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: String(newPage), perPage, sort: sortType });
      setTimeout(scrollToTop, 0);
    },
    [setSearchParams, perPage, sortType],
  );

  const startIndex = (page - 1) * actualPerPage;
  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.screen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery),
  );

  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + actualPerPage,
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.ProductsPage}>
      <div className={styles.topContainer}>
        <Breadcrumbs />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {`${filteredProducts.length} item${products.length > 1 ? 's' : ''}`}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <p className={styles.noResults}>
          There are no {category} matching your query.
        </p>
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.sortBy}>
              <Dropdown
                label="Sort by"
                onChange={handleSortChange}
                value={sortType}
                options={Object.entries(FilterType).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
              />
            </div>

            <div className={styles.perPage}>
              <Dropdown
                label="Items per page"
                onChange={handlePerPageChange}
                value={perPage}
                options={Object.values(ItemsPerPage).map(value => ({
                  value,
                  label: value,
                }))}
              />
            </div>
          </div>

          <div className={styles.container}>
            {selectedProducts.map(product => (
              <div key={product.id} className={styles.product}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {perPage !== 'All' && (
            <Pagination
              total={total}
              perPage={actualPerPage}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
