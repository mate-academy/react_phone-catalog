import { useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CategoryControls } from '../../components/CategoryControls';
import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { ProductCard } from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types/Product';

import styles from './CategoryPage.module.scss';

const categoryTitles: Record<ProductCategory, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const breadcrumbTitles: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const emptyMessages: Record<ProductCategory, string> = {
  phones: 'There are no phones yet',
  tablets: 'There are no tablets yet',
  accessories: 'There are no accessories yet',
};

const validSortValues = ['newest', 'alphabetically', 'cheapest'];
const validItemsPerPageValues = ['4', '8', '16', 'all'];

const getCategoryFromPathname = (pathname: string): ProductCategory => {
  return pathname.slice(1) as ProductCategory;
};

export const CategoryPage = () => {
  const { pathname } = useLocation();
  const { products, isLoading, error, reloadProducts } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = getCategoryFromPathname(pathname);
  const title = categoryTitles[category];

  const sortParam = searchParams.get('sort') || 'newest';
  const perPageParam = searchParams.get('perPage') || 'all';
  const pageParam = Number(searchParams.get('page')) || 1;

  const sortBy = validSortValues.includes(sortParam) ? sortParam : 'newest';

  const itemsPerPage = validItemsPerPageValues.includes(perPageParam)
    ? perPageParam
    : 'all';

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...categoryProducts];

    switch (sortBy) {
      case 'alphabetically':
        return productsToSort.sort((productA, productB) => {
          return productA.name.localeCompare(productB.name);
        });

      case 'cheapest':
        return productsToSort.sort((productA, productB) => {
          return productA.price - productB.price;
        });

      case 'newest':
      default:
        return productsToSort.sort((productA, productB) => {
          return productB.year - productA.year;
        });
    }
  }, [categoryProducts, sortBy]);

  const totalPages = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }

    return Math.max(1, Math.ceil(sortedProducts.length / Number(itemsPerPage)));
  }, [itemsPerPage, sortedProducts.length]);

  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    const firstProductIndex = (currentPage - 1) * Number(itemsPerPage);
    const lastProductIndex = firstProductIndex + Number(itemsPerPage);

    return sortedProducts.slice(firstProductIndex, lastProductIndex);
  }, [currentPage, itemsPerPage, sortedProducts]);

  const updateParams = (updates: Record<string, string>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const isDefaultValue =
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all') ||
        (key === 'sort' && value === 'newest');

      if (isDefaultValue) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    const hasInvalidSort = sortParam !== sortBy;
    const hasInvalidPerPage = perPageParam !== itemsPerPage;
    const hasInvalidPage = pageParam !== currentPage;

    if (!hasInvalidSort && !hasInvalidPerPage && !hasInvalidPage) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (sortBy === 'newest') {
      nextParams.delete('sort');
    } else {
      nextParams.set('sort', sortBy);
    }

    if (itemsPerPage === 'all') {
      nextParams.delete('perPage');
      nextParams.delete('page');
    } else {
      nextParams.set('perPage', itemsPerPage);

      if (currentPage === 1) {
        nextParams.delete('page');
      } else {
        nextParams.set('page', String(currentPage));
      }
    }

    setSearchParams(nextParams, { replace: true });
  }, [
    currentPage,
    itemsPerPage,
    pageParam,
    perPageParam,
    searchParams,
    setSearchParams,
    sortBy,
    sortParam,
  ]);

  if (isLoading) {
    return (
      <section className={styles.categoryPage}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.categoryPage}>
        <div className={styles.message}>
          <p className={styles.messageText}>{error}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={reloadProducts}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.categoryPage}>
      <Breadcrumbs currentPage={breadcrumbTitles[category]} />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.count}>{categoryProducts.length} models</p>

      {categoryProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{emptyMessages[category]}</p>
        </div>
      ) : (
        <>
          <CategoryControls
            sortBy={sortBy}
            itemsPerPage={itemsPerPage}
            onSortChange={value => {
              updateParams({
                sort: value,
                page: '1',
              });
            }}
            onItemsPerPageChange={value => {
              updateParams({
                perPage: value,
                page: '1',
              });
            }}
          />

          <div className={styles.productsGrid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {itemsPerPage !== 'all' && totalPages > 1 && (
            <PageNavigation
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={page => {
                updateParams({
                  page: String(page),
                });
              }}
            />
          )}
        </>
      )}
    </section>
  );
};
