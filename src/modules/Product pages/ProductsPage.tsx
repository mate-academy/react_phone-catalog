import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import { getProducts } from '../../components/api/products';
import { Product } from '../../components/types/Product';
import { ProductList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';



import styles from './ProductsPage.module.scss';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
}

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { productId } = useParams<{ productId: string }>();

  // 1. Сортування
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return (
            (a.priceDiscount || a.price || 0) -
            (b.priceDiscount || b.price || 0)
          );
        case 'age':
        default:
          return b.year - a.year;
      }
    });
  }, [products, sort]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);
        setProducts(filtered);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  // 2. Пагінація
  const itemsCount =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsCount);
  const startIndex = (currentPage - 1) * itemsCount;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsCount,
  );


  const updateParams = (params: { [key: string]: string }) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === 'all' || (key === 'page' && value === '1')) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className={styles.error}>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.breadcrumbs}>
          <Link to="/">
            <img
              src="./img/HomeIcon.svg"
              alt="home"
              className={styles.homeIcon}
            />
          </Link>

          <img src="./img/Back.svg" alt="arrow" className={styles.arrowIcon} />
          <span className="small-text12">
            {title === 'Mobile phones' ? 'Phones' : title}
          </span>
        </nav>

        <h1 className="h1">{title}</h1>
        <p className={`${styles.modelsCount} body-text14Bold`}>
          {products.length} models
        </p>

        <div className={styles.dropdowns}>
          <div className={styles.dropdown}>
            <label className="small-text12">Sort by</label>

            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} button-text`}
                value={sort}
                onChange={e =>
                  updateParams({ sort: e.target.value, page: '1' })
                }
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>

              <svg className={styles.arrow} viewBox="0 0 16 16">
                <path
                  d="M4 6l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className={styles.dropdown}>
            <label className="small-text12">Items on page</label>
            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} button-text`}
                value={perPage}
                onChange={e =>
                  updateParams({ perPage: e.target.value, page: '1' })
                }
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>

              <svg className={styles.arrow} viewBox="0 0 16 16">
                <path
                  d="M4 6l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        <ProductList
          products={visibleProducts}
          className={styles.productList}
        />

        {perPage !== 'all' && totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={sortedProducts.length}
              perPage={itemsCount}
              currentPage={currentPage}
              onPageChange={page => updateParams({ page: page.toString() })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
