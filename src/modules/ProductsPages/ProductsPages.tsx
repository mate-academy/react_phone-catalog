/* eslint-disable react-hooks/rules-of-hooks */
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './ProductsPages.module.scss';
import Home from '../../assets/Home.svg?react';
import ArrowRight from '../../assets/Chevron (Arrow Right).svg?react';
import ArrowLeft from '../../assets/Chevron (Arrow Left).svg?react';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '../../types/types';
import { ProductCard } from '../shared/ProductCard';

export const ProductsPages = () => {
  type ProductType = 'phones' | 'tablets' | 'accessories';
  type SortBy = 'newest' | 'alphabetically' | 'cheapest';
  type OnPage = '4' | '8' | '16' | 'all';
  const productsListRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [typedProducts, setTypedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [selctionSortBy, setSelctionSortBy] = useState<SortBy>('newest');
  const [selctionOnPage, setSelctionOnPage] = useState<OnPage>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProductType = (value: string): value is ProductType =>
    ['phones', 'tablets', 'accessories'].includes(value);

  const segment = pathname.split('/')[1];

  if (!segment || !isProductType(segment)) {
    return null;
  }

  const type: ProductType = segment;

  const titles = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const updateURLParams = (params: { sort?: SortBy; page?: number; perPage?: OnPage }) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (params.sort) {
      newSearchParams.set('sort', params.sort);
    }

    if (params.page !== undefined) {
      if (params.page === 0) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', (params.page + 1).toString());
      }
    }

    if (params.perPage) {
      if (params.perPage === 'all') {
        newSearchParams.delete('perPage');
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('perPage', params.perPage);
      }
    }

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`/api/products.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setError(null);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('Щось пішло не так');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Инициализация из URL параметров
  useEffect(() => {
    const sortParam = (searchParams.get('sort') as SortBy) || 'newest';
    const pageParam = parseInt(searchParams.get('page') || '1');
    const perPageParam = (searchParams.get('perPage') as OnPage) || 'all';

    setSelctionSortBy(sortParam);
    setCurrentPage(pageParam - 1);
    setSelctionOnPage(perPageParam);
  }, []);

  // Фильтрация по типу товара
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(item => {
        return item.category === type;
      });
      setTypedProducts(filtered);
    }
  }, [products, type]);

  // Расчет общего количества страниц
  useEffect(() => {
    if (selctionOnPage !== 'all') {
      setTotalPage(Math.ceil(typedProducts.length / Number(selctionOnPage)));
    } else {
      setTotalPage(1);
    }
  }, [typedProducts, selctionOnPage]);

  // Сортировка и пагинация
  useEffect(() => {
    const startItem = currentPage * Number(selctionOnPage);
    const endItem =
      selctionOnPage !== 'all'
        ? currentPage * Number(selctionOnPage) + Number(selctionOnPage)
        : typedProducts.length;

    if (typedProducts.length > 0) {
      const sorted = [...typedProducts].sort((a, b) => {
        if (selctionSortBy === 'newest') {
          return b.year - a.year;
        }
        if (selctionSortBy === 'alphabetically') {
          return a.name.localeCompare(b.name);
        }
        if (selctionSortBy === 'cheapest') {
          return a.price - b.price;
        }
        return 0;
      });

      const filtered = sorted.slice(startItem, endItem);
      setFilteredProducts(filtered);
    }
  }, [typedProducts, selctionSortBy, currentPage, selctionOnPage]);

  useEffect(() => {
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }, [currentPage]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Перезавантажити</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.productsPages__breadcrums}>
        <NavLink to="/">
          <Home />
        </NavLink>
        <ArrowRight /> {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <h1 className={styles.productsPages__title}>{titles[type]}</h1>
      <div className={styles.productsPages__count}>{typedProducts.length + ' models'}</div>
      <div className={styles.productsPages__filters}>
        <div className={styles.productsPages__sortBy}>
          Sort by
          <select
            name="Sort by"
            id=""
            onChange={e => {
              const newSort = e.target.value as SortBy;
              setSelctionSortBy(newSort);
              setCurrentPage(0);
              updateURLParams({ sort: newSort, page: 0 });
            }}
            value={selctionSortBy}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>
        <div className={styles.productsPages__sortOn}>
          Items on page
          <select
            name="Items on page"
            id=""
            onChange={e => {
              const newPerPage = e.target.value as OnPage;
              setSelctionOnPage(newPerPage);
              setCurrentPage(0);
              updateURLParams({ perPage: newPerPage, page: 0 });
            }}
            value={selctionOnPage}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 && !isLoading && !error ? (
        <div className={styles.productsPages__noneItems}>
          {type === 'phones' && 'Телефонів ще немає'}
          {type === 'tablets' && 'Планшетів ще немає'}
          {type === 'accessories' && 'Аксесуарів ще немає'}
        </div>
      ) : (
        <>
          <div className={styles.productsPages__items} ref={productsListRef}>
            {filteredProducts.map(product => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          <div
            className={`${styles.productsPages__pagination} ${
              selctionOnPage === 'all' ? styles.productsPages__pagination__none : ''
            }`}
          >
            <button
              className={styles.productsPages__button}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              <ArrowLeft />
            </button>
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`${styles.productsPages__button} ${
                  currentPage === i ? styles.productsPages__button__on : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={styles.productsPages__button}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage - 1))}
              disabled={currentPage === totalPage - 1}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
