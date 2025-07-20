import { useParams } from 'react-router-dom';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Phone } from '../../../shared/utils/types/apiTypes';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { STATUS, Status } from '../../../shared/utils/types/Status';
import { LoadError, LOAD_ERROR } from '../../../shared/utils/types/LoadError';
import { Loader } from '../../../PhonesPage/components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import classNames from 'classnames';
import { Button } from '../../../shared/components/Button';
import { AddToFavourites } from '../../../shared/components/AddToFavourites';

classNames.bind(styles);

type Params = {
  category: string;
};

// type Products = Phone | Accessories | Tablet | Product;

export const ProductDetailsPage = ({ category }: Params) => {
  const [products, setProducts] = useState<Phone[] | undefined>();
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [, setLoadError] = useState<LoadError>(LOAD_ERROR.noError);
  const { productId } = useParams();
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<string>();
  const [activeMemory, setActiveMemory] = useState<string>();

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
  }, [category]);

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
  const changePicture = (i: number) => {
    setActiveImgIndex(i);
  };

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
          <img
            className={styles.details__image}
            src={findProduct?.images[activeImgIndex]}
            alt="main-image"
          />
          <div className={styles.details__images}>
            {findProduct?.images?.map((image, i) => {
              return (
                <div key={i}>
                  <img
                    className={classNames(styles.details__picture, {
                      [styles['details__picture--active']]:
                        activeImgIndex === i,
                    })}
                    onClick={() => changePicture(i)}
                    src={image}
                    alt="images"
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.details__colors}>
            <div className={styles['details__colors-text']}>
              <p className={styles['details__colors-available']}>
                Available colors
              </p>

              <p className={styles['details__colors-id']}>ID: 802390</p>
            </div>

            <div className={styles['details__colors-container']}>
              {findProduct?.colorsAvailable.map(color => {
                return (
                  <div
                    onClick={() => setActiveColor(color)}
                    key={color}
                    className={classNames(styles['details__colors-circle'], {
                      [styles['details__colors-circle--active']]:
                        activeColor === color,
                    })}
                    style={{ backgroundColor: `${color}` }}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className={styles.details__capacity}>
            <p className={styles['details__capacity-header']}>
              Select capacity
            </p>
            <div className={styles['details__capacity-container']}>
              {findProduct?.capacityAvailable.map(capacity => {
                return (
                  <div
                    onClick={() => setActiveMemory(capacity)}
                    key={capacity}
                    className={classNames(styles['details__capacity-memory'], {
                      [styles['details__capacity-memory--active']]:
                        capacity === activeMemory,
                    })}
                  >
                    {capacity}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.details__price}>
            <p className={styles['details__price-discount']}>
              {`$${findProduct?.priceDiscount}`}
            </p>

            <p className={styles['details__price-regular']}>
              {`$${findProduct?.priceRegular}`}
            </p>
          </div>
          <div className={styles.details__buttons}>
            <Button text="Add to cart" />
            <AddToFavourites />
          </div>
          <div className={styles.details__specification}>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Screen</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.screen}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>
                Resolution
              </p>
              <p className={styles['details__specification-details']}>
                {findProduct?.resolution}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Processor</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.processor}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>RAM</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.ram}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
