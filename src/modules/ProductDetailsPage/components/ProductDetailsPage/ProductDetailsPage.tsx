import { useParams } from 'react-router-dom';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Phone } from '../../../shared/utils/types/apiTypes';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { STATUS, Status } from '../../../shared/utils/types/Status';
import { LoadError, LOAD_ERROR } from '../../../shared/utils/types/LoadError';
import { Loader } from '../../../PhonesPage/components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';

type Params = {
  category: string;
};

// type Products = Phone | Accessories | Tablet | Product;

export const ProductDetailsPage = ({ category }: Params) => {
  const [products, setProducts] = useState<Phone[] | undefined>();
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [, setLoadError] = useState<LoadError>(LOAD_ERROR.noError);
  const { productId } = useParams();

  const loadProducts = useCallback(() => {
    return getProduct(`/${category}.json`)
      .then(data => {
        setProducts(data);
        setLoadError(LOAD_ERROR.noError);
        setStatus(STATUS.resolved);
      })
      .catch(() => {
        setLoadError(LOAD_ERROR.couldntload);
        setStatus(STATUS.rejected);
      });
  }, []);

  useEffect(() => {
    setStatus(STATUS.pending);
    loadProducts();
  }, [loadProducts]);

  if (status === STATUS.resolved && products?.length === 0) {
    setLoadError(LOAD_ERROR.noProducts);
  }

  // eslint-disable-next-line no-console
  console.log(productId);

  const findProduct = products?.find(product => productId === product.name);

  return (
    <div className={styles.details}>
      {status === STATUS.pending ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumbs
            firstPath={`${findProduct?.category}`}
            secondPath={findProduct?.name ?? ''}
          />
          <h1 className={styles.details__title}>{findProduct?.name}</h1>
          <div className={styles.details__images}>
            {findProduct?.images?.map((image, i) => {
              return <img key={i} src={image} alt="" />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
