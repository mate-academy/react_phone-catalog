import productsData from '../../api/products.json';
import { Product, RawProductFromApi } from '../../modules/shared/types/Product';
import { Catalog } from '../../components/Catalog';
import { Icon } from '../../components/Icon';
import styles from './ProductPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import classNames from 'classnames';
import { Button } from '../../components/Button';
import { useEffect, useMemo, useState } from 'react';
import { getSortedProducts } from '../../modules/shared/utils/sortProducts';
import { useProductPagination } from '../../modules/shared/hooks/useProductPagination';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useSearchParameters } from '../shared/hooks/useSearchParameters';

interface Props {
  category: string;
}

export const ProductPage = ({ category }: Props) => {
  const { sort, perPage, page, updateSearchWith } = useSearchParameters();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    updateSearchWith({ page: '1' });
  }, [category]);

  const normalizedProducts = (productsData as RawProductFromApi[]).map(product => ({
    ...product,
    id: String(product.id),
  }));

  const categoryProducts = useMemo(() => {
    return normalizedProducts.filter(product => product.category === category);
  }, [category, normalizedProducts]);

  const filteredProducts: Product[] = useMemo(() => {
    return categoryProducts
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .map(product => ({
        ...product,
        id: String(product.id),
      }));
  }, [categoryProducts, query]);

  const sortedProducts = useMemo(() => {
    return getSortedProducts(filteredProducts, sort);
  }, [sort, filteredProducts]);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      // if (category === 'accessories') { setHasError(true);}

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, sort, perPage]);

  const { visibleProducts, totalPages, calculateOffset } = useProductPagination(
    sortedProducts,
    perPage,
    page,
  );

  const handleSortChange = (newSort: string) => {
    const sortValue =
      newSort === 'Newest' ? 'age' : newSort === 'Alphabetically' ? 'title' : 'price';

    updateSearchWith({ sort: sortValue, page: '1' });
  };

  const handlePerPageChange = (newSize: string) => {
    updateSearchWith({ perPage: newSize, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchWith({ page: String(newPage) });
  };

  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">
          <Icon variant="home" />
        </Link>

        <div className={styles.breadcrumbArrow}>
          <Icon variant="arrow-right" />
        </div>

        <span className={classNames(styles.breadcrumbCurrent, 'small-text')}>{pageTitle}</span>
      </nav>

      <h1 className={styles.title}>{pageTitle === 'Phones' ? `Mobile phones` : pageTitle}</h1>

      <p className="body-text">{filteredProducts.length} models</p>

      <div className="grid">
        <div className={styles.field}>
          <span className="small-text">Sort by</span>
          <Dropdown
            items={['Newest', 'Alphabetically', 'Cheapest']}
            defaultValue={
              sort === 'age' ? 'Newest' : sort === 'title' ? 'Alphabetically' : 'Cheapest'
            }
            onSelectedItem={handleSortChange}
          />
        </div>

        <div className={classNames(styles.field, styles.fieldItems)}>
          <span className="small-text">Items on page</span>
          <Dropdown
            items={['4', '8', '16', 'All']}
            defaultValue={perPage}
            onSelectedItem={handlePerPageChange}
          />
        </div>
      </div>

      {hasError ? (
        <ErrorMessage message="Something went wrong" />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className={styles.productSection}>
              <Catalog products={visibleProducts} />

              {totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                  <Button
                    variant="pagination"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    <Icon variant="arrow-left" />
                  </Button>

                  <div className={styles.paginationViewport}>
                    <div
                      className={styles.paginationTrack}
                      style={{
                        transform: `translateX(-${calculateOffset()}px)`,
                      }}
                    >
                      {pages.map(pageItem => (
                        <Button
                          variant="pagination"
                          key={pageItem}
                          className={classNames({
                            [styles.selected]: page === pageItem,
                          })}
                          onClick={() => handlePageChange(pageItem)}
                        >
                          <span className="body-text">{pageItem}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="pagination"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    <Icon variant="arrow-right" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <span className={styles.noProducts}>
              {categoryProducts.length === 0
                ? `There are no ${category} yet`
                : `There are no ${category} matching the query`}
            </span>
          )}
        </>
      )}
    </div>
  );
};
