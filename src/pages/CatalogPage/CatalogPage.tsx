import { useEffect, useState } from 'react';
import styles from './CatalogPage.styles.module.scss';
import { Product } from '../../types/Products';
import { ProductsList } from '../../modules/ProductsList';
import { Errors } from '../../utils/errors';
import { Loader } from '../../components/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { sortProducts } from '../../utils/sortProducts/sortProducts';
import { paginateProducts } from '../../utils/paginateProducts';
import ArrowLeft from '../../assets/icons/VectorLeft.svg?react';
import ArrowRight from '../../assets/icons/VectorRight.svg?react';
import { DropDown } from '../../components/DropDown';
import { BreadCrumbs } from '../../components/BreadCrumbs';

type Category = 'phones' | 'tablets' | 'accessories';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors | ''>('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const category = pathname.slice(1) as Category;

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || '16';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);

        if (data.length === 0) {
          setErrorMessage(Errors.NoProductsMessage);
        }
      })
      .catch(() => {
        setErrorMessage(Errors.ProductLoadingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const titles: Record<Category, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const breadcrumbTitles: Record<Category, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const categoryProducts = products.filter(
    product => product.category === category,
  );

  const sortedProducts = sortProducts(categoryProducts, sortBy);

  const visibleProducts = paginateProducts(sortedProducts, page, perPage);

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    if (key === 'sort' || key === 'perPage') {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams('page', String(newPage));
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
  ];

  const perPageOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'all' },
  ];

  const visiblePagesCount = 4;
  let startPage = Math.max(1, page - 1);
  let endPage = startPage + visiblePagesCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePagesCount + 1);
  }

  return (
    <>
      <section className={styles.catalog}>
        <BreadCrumbs items={[{ title: breadcrumbTitles[category] }]} />

        <div className={styles.heading}>
          <h1 className={styles.title}>{titles[category]}</h1>

          {!isLoading && !errorMessage && categoryProducts.length > 0 && (
            <p className={styles.models}>{categoryProducts.length} models</p>
          )}
        </div>

        {!isLoading && !errorMessage && categoryProducts.length > 0 && (
          <>
            <div className={styles.controls}>
              <DropDown
                label="Sort by"
                value={sortBy}
                options={sortOptions}
                onChange={value => updateSearchParams('sort', value)}
                className={styles.sortDropdown}
              />

              <DropDown
                label="Items per page"
                value={perPage}
                options={perPageOptions}
                onChange={value => updateSearchParams('perPage', value)}
                className={styles.perPageDropdown}
              />
            </div>

            <ProductsList products={visibleProducts} />

            {perPage !== 'all' && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.paginationButtons}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <ArrowLeft />
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                  const pageNumber = startPage + index;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      className={`${styles.paginationButtons} ${page === pageNumber ? styles.activePage : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className={styles.paginationButtons}
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <ArrowRight />
                </button>
              </div>
            )}
          </>
        )}
        <div>
          {isLoading && <Loader />}

          {errorMessage === Errors.ProductLoadingError && (
            <p data-cy="productsLoadingError" className={styles.hasTextDanger}>
              {errorMessage}
            </p>
          )}

          {errorMessage === Errors.NoProductsMessage && (
            <p data-cy="noProductMessage" className={styles.hasTextInfo}>
              {errorMessage}
            </p>
          )}
        </div>
      </section>
    </>
  );
};
