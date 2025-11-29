import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Catalog.module.scss';
import { ProductCardData, ProductCatalogAPI } from '../../types';
import { mapCatalogProducts } from '../../utils/mappers';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import Home from '../../../public/img/Home.png';
import Chevron from '../../../public/img/Chevron.png';
import { routes } from '../../router/routes';

type CatalogParams = 'phones' | 'tablets' | 'accessories';

const Catalog = () => {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('def');

  const params = useParams<{ category: CatalogParams }>();

  const getApiInfo = () => {
    switch (params.category) {
      case 'phones':
        return { title: 'Mobile Phones', url: '/api/phones.json' };
      case 'tablets':
        return { title: 'Tablets', url: '/api/tablets.json' };
      case 'accessories':
        return { title: 'Accessories', url: '/api/accessories.json' };
      default:
        return { title: 'Catalog', url: '' };
    }
  };

  const { title, url } = getApiInfo();

  useEffect(() => {
    if (!url) {
      return;
    }

    setIsLoading(true);
    fetch(url)
      .then(res => res.json())
      .then((data: ProductCatalogAPI[]) => {
        const mappedProducts = mapCatalogProducts(data);

        setProducts(mappedProducts);
        setIsLoading(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Error loading products:', err);
        setProducts([]);
        setIsLoading(false);
      });
  }, [url]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const getPaginationPages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = window.innerWidth < 768 ? 5 : 7;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const paginationPages = useMemo(
    () => getPaginationPages(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, totalPages],
  );

  // Скидання на першу сторінку при зміні налаштувань
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortBy]);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!url) {
    return (
      <div className={styles.error}>
        <h1>Category not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__iconParams}>
        <Link to={routes.home} className={styles.catalog__iconParams_icon}>
          <img src={Home} alt="Home" />
        </Link>

        <span className={styles.catalog__iconParams_arrow}>
          <img src={Chevron} alt="Chevron" />
        </span>

        <span className={styles.catalog__iconParams_icon}>
          {params.category &&
            params.category.charAt(0).toUpperCase() + params.category.slice(1)}
        </span>
      </div>

      <h1 className={styles.catalog__title}>{title}</h1>
      <p className={styles.catalog__count}>{sortedProducts.length} models</p>

      <div className={styles.catalog__labels}>
        <div className={styles.catalog__sort}>
          <label className={styles.catalog__labels_label} htmlFor="sort-select">
            Sort by:
          </label>
          <select
            id="sort-select"
            className={styles.catalog__labels_select}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="def">Default</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        <div className={styles.catalog__productsDisplay}>
          <label
            className={styles.catalog__labels_label}
            htmlFor="items-select"
          >
            Items on page:
          </label>
          <select
            id="items-select"
            className={styles.catalog__labels_select}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
      </div>

      {paginatedProducts.length > 0 ? (
        <div className={styles.catalog__grid}>
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} hotPrice={true} />
          ))}
        </div>
      ) : (
        <p className={styles.catalog__empty}>No products found</p>
      )}

      {totalPages > 1 && (
        <div className={styles.catalog__pagination}>
          <button
            className={styles.catalog__pagination_btn}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            {'<'}
          </button>

          <div className={styles.catalog__pagination_pages}>
            {paginationPages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`dots-${index}`}
                    className={styles.catalog__pagination_dots}
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  className={`${styles.catalog__pagination_page} ${
                    currentPage === page
                      ? styles.catalog__pagination_page_active
                      : ''
                  }`}
                  onClick={() => handlePageClick(page as number)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className={styles.catalog__pagination_btn}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
