import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProduct } from '../../helpers/getProduct';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const { pathname } = useLocation();

  const pathNameElement = pathname.slice(1).split('/');
  const category = `${pathNameElement[0][0]
    .toLocaleUpperCase()}${pathNameElement[0].slice(1)}`;
  const productId = pathNameElement[1] || null;

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      try {
        (async () => {
          const response = await getProduct(productId);

          setProduct(response);
        })();
      } catch {
        // error handling
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="breadcrumbs"
        data-cy="breadCrumbs"
      >
        <Link to="/" className="breadcrumbs__home" />
        <div className="breadcrumbs__arrow" />
        <div className="breadcrumbs__category">
          {productId ? (
            <Link
              to={productId ? '..' : pathname}
              className={classNames(
                'breadcrumbs__link',
                { 'breadcrumbs__link--active': productId },
              )}
            >
              {category}
            </Link>
          ) : (
            <div className="breadcrumbs__link">{category}</div>
          )}

        </div>
        {productId && (
          <>
            <div className="breadcrumbs__arrow" />
            <div className="breadcrumbs__product-name">
              {product?.name}
            </div>
          </>
        )}
      </div>
    </>
  );
};
