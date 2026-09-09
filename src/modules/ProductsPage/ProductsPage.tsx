import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, ProductCategory } from '../shared/types/Product';
import { getProductsByCategory } from '../shared/api/getProducts';
import { categories } from '../shared/constants/categories';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './ProductsPage.module.scss';

type Props = {
  category: ProductCategory;
};

// чистая сортировка над компонентом: значения sort из README (?sort=age|title|price)
const sortProducts = (products: Product[], sortBy: string): Product[] => {
  switch (sortBy) {
    case 'age':
      // свежий год выпуска первым
      return [...products].sort((a, b) => b.year - a.year);

    case 'title':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    default:
      // мусор в URL — не падаем, показываем как есть
      return products;
  }
};

export const ProductsPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { title, breadcrumb, emptyText } = categories[category];

  // состояние страницы живёт в URL: переживает F5 и шарится ссылкой
  const sortBy = searchParams.get('sort') ?? 'age';
  const perPage = searchParams.get('perPage') ?? 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  // меняет только переданные параметры, остальные сохраняет;
  // null удаляет ключ — так дефолты не засоряют адресную строку
  const updateSearch = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  // категория — зависимость: переход /phones → /tablets переиспользует компонент
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadProducts, [category]);

  // производные значения — вычисляются из стейта и URL, своего стейта им не нужно
  const sortedProducts = sortProducts(products, sortBy);
  const isPaged = perPage !== 'all';
  const pageSize = Number(perPage);
  const pagesCount = isPaged ? Math.ceil(sortedProducts.length / pageSize) : 1;
  const visibleProducts = isPaged
    ? sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedProducts;

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = (
      <div className={styles.message}>
        <p>Something went wrong</p>
        <button type="button" className={styles.reload} onClick={loadProducts}>
          Reload
        </button>
      </div>
    );
  } else if (products.length === 0) {
    content = <p className={styles.message}>{emptyText}</p>;
  } else {
    content = (
      <>
        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          <label className={styles.control}>
            <span className={styles.controlLabel}>Sort by</span>
            <select
              className={styles.select}
              value={sortBy}
              onChange={event =>
                // смена сортировки сбрасывает страницу: старый номер
                // указывал бы уже на другие товары
                updateSearch({ sort: event.target.value, page: null })
              }
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          <label className={`${styles.control} ${styles.controlSmall}`}>
            <span className={styles.controlLabel}>Items on page</span>
            <select
              className={styles.select}
              value={perPage}
              onChange={event =>
                updateSearch({
                  perPage:
                    event.target.value === 'all' ? null : event.target.value,
                  page: null,
                })
              }
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </label>
        </div>

        <ProductsList products={visibleProducts} showFullPrice />

        {isPaged && pagesCount > 1 && (
          <div className={styles.pagination}>
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              onPageChange={page =>
                updateSearch({ page: page === 1 ? null : String(page) })
              }
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ text: breadcrumb }]} />
      </div>

      <h1 className={styles.title}>{title}</h1>

      {content}
    </div>
  );
};
