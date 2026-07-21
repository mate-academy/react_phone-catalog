import { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Breadcrumbs } from '../Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';

interface Props {
  category: string;
}

export const CategoryPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getProducts('products')
      .then(result => {
        const filteredProducts = result.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const visibleProducts = [...products];

  if (sort === 'age') {
    visibleProducts.sort((a, b) => b.year - a.year);
  } else if (sort === 'title') {
    visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'price') {
    visibleProducts.sort((a, b) => a.price - b.price);
  }

  let paginatedProducts = visibleProducts;

  if (perPage !== 'all') {
    const start = (page - 1) * Number(perPage);
    const end = start + Number(perPage);

    paginatedProducts = visibleProducts.slice(start, end);
  }

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(visibleProducts.length / Number(perPage));

  const getVisiblePages = (): (number | string)[] => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let last: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push('...');
        }
      }

      rangeWithDots.push(i);
      last = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value === 'age') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', event.target.value);
    }

    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', event.target.value);
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(pageNumber));
    }

    setSearchParams(newParams);
  };

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = <p className={styles.message}>Something went wrong</p>;
  } else if (products.length === 0) {
    content = <p className={styles.message}>There are no {category} yet</p>;
  } else {
    content = <ProductsList products={paginatedProducts} />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs category={category} />
      <h1 className={styles.title}>{category}</h1>
      <span className={styles.count}>{products.length} models</span>

      <div className={styles.filters}>
        <div className={styles.filter}>
          <span className={styles.label}>Sort By</span>
          <select
            className={styles.select}
            value={sort || 'age'}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filter}>
          <span className={styles.label}>Items on Page</span>
          <select
            className={styles.select}
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {content}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {visiblePages.map((pageNumber, index) =>
            typeof pageNumber === 'number' ? (
              <button
                key={pageNumber}
                className={
                  pageNumber === page
                    ? `${styles.pageButton} ${styles.pageButtonActive}`
                    : styles.pageButton
                }
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ) : (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
};
