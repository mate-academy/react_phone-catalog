import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';

import { Product } from '../../types/Product';
import { PageTitle } from '../../components/PageTitle';
import { Breadcrumbs } from '../../components/SheredNavigation/Breadcrumbs';
import { CustomSelect } from './components/CustomSelect';
import { ProductsGrid } from './components/ProductsGrid/ProductsGrid';
import { ProductsCounter } from '../../components/ProductsCounter';
import { Pagination } from './components/Pagination';

import styles from './ProductsListPage.module.scss';

const allowedCategories = ['phones', 'tablets', 'accessories'];

const sortOptions = [
  { label: 'Newest', value: 'year' },
  { label: 'Alphabetically', value: 'name' },
  { label: 'Cheapest', value: 'price' },
];

const itemsOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

export const ProductsListPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'year';
  const currentPage = Number(searchParams.get('page') || '1');
  const itemsPerPage = searchParams.get('perPage') || '16';

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const filteredProducts = products.filter(p => p.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'year') {
      return b.year - a.year;
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'price') {
      return a.price - b.price;
    }

    return 0;
  });

  const paginatedProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    const perPage = Number(itemsPerPage);
    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, itemsPerPage, currentPage]);

  const totalPages =
    itemsPerPage === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / Number(itemsPerPage));

  const updateParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  if (!category || !allowedCategories.includes(category)) {
    return <Navigate to="/not-found" />;
  }

  if (filteredProducts.length === 0) {
    return <p>There are no {category} yet</p>;
  }

  return (
    <div className="container">
      <Breadcrumbs />
      <PageTitle
        title={`${category.charAt(0).toUpperCase()}${category.slice(1)} page`}
      />
      <ProductsCounter count={sortedProducts.length} />

      <div className={styles.selectsBlock}>
        <CustomSelect
          label="Sort by"
          options={sortOptions}
          selected={sortBy}
          onChange={value => updateParams('sort', value)}
          className="select--wide"
        />

        <CustomSelect
          label="Items on page"
          options={itemsOptions}
          selected={itemsPerPage}
          onChange={value => updateParams('perPage', value)}
          className="select--narrow"
        />
      </div>

      <ProductsGrid products={paginatedProducts} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => updateParams('page', String(page))}
        />
      )}
    </div>
  );
};
