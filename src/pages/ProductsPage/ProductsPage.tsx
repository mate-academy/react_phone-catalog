import React, { useEffect, useState } from 'react';
import { Category, Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsList } from '../../components/ProductsList';
import styles from './ProductsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { categoryTitles } from '../../constants/categoryTitles';
import { StatusMessage } from '../../components/StatusMessage';
import { Select } from '../../components/Select';

interface Props {
  category: Category;
  title: string;
}

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const sortedProducts = [...products];

  switch (sort) {
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

  const perPageNumber =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const start = (page - 1) * perPageNumber;
  const visibleProducts = sortedProducts.slice(start, start + perPageNumber);

  const totalPages = Math.ceil(sortedProducts.length / perPageNumber);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, attempt]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StatusMessage
        text="Something went wrong"
        onReload={() => setAttempt(prev => prev + 1)}
      />
    );
  }

  if (products.length === 0) {
    return <StatusMessage text={`There are no ${category} yet`} />;
  }

  return (
    <section className={styles.page}>
      <Breadcrumbs title={categoryTitles[category]} />
      <h1 className={styles.page__title}>{title}</h1>
      <p className={styles.page__text}>{products.length} models</p>
      <div className={styles.page__filters}>
        <Select
          label="Sort by"
          value={sort}
          options={sortOptions}
          onChange={handleSortChange}
          className={styles.page__labelSort}
        />

        <Select
          label="Items on page"
          value={perPage}
          options={perPageOptions}
          onChange={handlePerPageChange}
          className={styles.page__labelPerPage}
        />
      </div>
      <ProductsList products={visibleProducts} />
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
