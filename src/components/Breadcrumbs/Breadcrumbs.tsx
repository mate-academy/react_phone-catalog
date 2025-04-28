import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Product } from '../../shared/types/Product';
import { Loader } from '../Loader';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId?: string }>();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const categoryFromPath = pathParts[0] || '';
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const categoryMapping: { [key: string]: string } = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favorites: 'Favorites',
  };
  const productLink =
    products?.find(product => product.itemId === productId)?.name ?? '';

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch(`api/products.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {!isLoading && !hasError && categoryFromPath !== '' && (
        <div className={styles.Breadcrumbs}>
          {categoryFromPath !== 'cart' && (
            <div className={styles.Breadcrumbs__wrapper}>
              <>
                <Link to="/" className={styles.Breadcrumbs__home}>
                  <img src="img/buttons/home-button.svg" alt="home button" />
                </Link>

                <span className={styles.Breadcrumbs__separator}>/</span>

                <Link
                  to={`/${categoryFromPath}`}
                  className={classNames(
                    styles.Breadcrumbs__link,
                    productId && styles.Breadcrumbs__linkActive,
                  )}
                >
                  {categoryMapping[categoryFromPath] || categoryFromPath}
                </Link>

                {productId && (
                  <>
                    <span className={styles.Breadcrumbs__separator}>/</span>
                    <span className={styles.Breadcrumbs__productId}>
                      {productLink}
                    </span>
                  </>
                )}
              </>
            </div>
          )}

          {(categoryFromPath === 'cart' || productId) && (
            <button onClick={handleGoBack} className={styles.Breadcrumbs__back}>
              <img
                src="img/buttons/arrow-left.svg"
                alt="back button arrow"
                className={styles.Breadcrumbs__backImage}
              />{' '}
              <p className={styles.Breadcrumbs__backText}>Back</p>
            </button>
          )}
        </div>
      )}
      {isLoading && (
        <Loader isLoading={isLoading} hasError={hasError} onReload={() => {}} />
      )}
    </div>
  );
};
