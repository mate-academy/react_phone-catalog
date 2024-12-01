import React, { useState } from 'react';
import cn from 'classnames';
import styles from './GadgetDetails.module.scss';
import { BASE_URL } from '../../utils/httpClient';
import { Link, useLocation } from 'react-router-dom';
import { GADGET_COLORS } from '../../utils/GadgetColors';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductError } from '../Errors/ProductError';
import { Product } from '../../types/Product';
import { Buttons } from '../Buttons';

type Props = {
  gadget: ProductDetails;
  product: Product;
};

export const GadgetDetails: React.FC<Props> = ({ gadget, product }) => {
  const [selectImage, setSelectImage] = useState(gadget.images[0]);
  const { pathname } = useLocation();

  return (
    <div className={styles.gadget}>
      {gadget ? (
        <>
          <h2 className={styles.gadget__title}>{gadget.name}</h2>

          <div className={styles.gadget__content}>
            <div className={styles['gadget__small-images--tablet']}>
              {gadget.images.map(image => (
                <button
                  key={image}
                  onClick={() => setSelectImage(image)}
                  className={cn(styles.gadget__button, {
                    [styles['gadget__button--active']]: image === selectImage,
                  })}
                >
                  <img
                    src={BASE_URL + image}
                    alt="gadget"
                    className={styles.gadget__image}
                  />
                </button>
              ))}
            </div>

            <div className={styles['gadget__main-img']}>
              <div className={styles['gadget__img-container']}>
                <img
                  src={BASE_URL + selectImage}
                  alt="main-img"
                  className={styles['gadget__big-image']}
                />
              </div>
            </div>

            <div className={styles['gadget__small-images--mobile']}>
              {gadget.images.map(image => (
                <button
                  key={image}
                  onClick={() => setSelectImage(image)}
                  className={cn(styles.gadget__button, {
                    [styles['gadget__button--active']]: image === selectImage,
                  })}
                >
                  <img
                    src={BASE_URL + image}
                    alt="gadget"
                    className={styles.gadget__image}
                  />
                </button>
              ))}
            </div>

            <div className={styles.gadget__details}>
              <div className={styles.gadget__colors}>
                <div className={styles.gadget__shell}>
                  <p className={styles['gadget__details-title']}>
                    Available colors
                  </p>
                  <div className={styles['gadget__id--tablet']}>
                    <p>{`ID: ${product.id}`}</p>
                  </div>
                </div>
                <div className={styles.gadget__list}>
                  {gadget.colorsAvailable.map(colorVal => {
                    const path = pathname.split('-');

                    path.splice(path.length - 1, 1, colorVal);
                    const newPath = path.join('-');

                    return (
                      <Link
                        key={colorVal}
                        to={newPath}
                        style={{ backgroundColor: GADGET_COLORS[colorVal] }}
                        className={cn(styles.gadget__link, {
                          [styles['gadget__link--active']]:
                            gadget.color === colorVal,
                        })}
                      />
                    );
                  })}
                </div>
              </div>

              <div className={styles.gadget__line}></div>

              <div className={styles.gadget__capacity}>
                <p className={styles['gadget__details-title']}>
                  Select capacity
                </p>
                <div className={styles.gadget__list}>
                  {gadget.capacityAvailable.map(capacity => {
                    const path = pathname.split('-');
                    const index = path.findIndex(elem => elem.match(/[1-9]gb/));

                    path.splice(index, 1, capacity.toLowerCase());
                    const newPath = path.join('-');

                    return (
                      <Link
                        key={newPath}
                        to={newPath}
                        className={cn(styles['gadget__button-capacity'], {
                          [styles['gadget__button-capacity--active']]:
                            gadget.capacity === capacity,
                        })}
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className={styles.gadget__line}></div>

              <div className={styles.gadget__prices}>
                <div className={styles['gadget__price-discount']}>
                  {`$${gadget.priceDiscount}`}
                </div>
                <div className={styles['gadget__price-full']}>
                  {`$${gadget.priceRegular}`}
                </div>
              </div>

              <div className={styles.gadget__actions}>
                <Buttons product={product} />
              </div>

              <div className={styles['gadget__info-details']}>
                <div className={styles.gadget__info}>
                  <p className={cn(styles['gadget__info--name'])}>Screen</p>
                  <p className={cn(styles['gadget__info--value'])}>
                    {gadget.screen}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p className={cn(styles['gadget__info--name'])}>Resolution</p>
                  <p className={cn(styles['gadget__info--value'])}>
                    {gadget.resolution}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p className={cn(styles['gadget__info--name'])}>Processor</p>
                  <p className={cn(styles['gadget__info--value'])}>
                    {gadget.processor}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p className={cn(styles['gadget__info--name'])}>RAM</p>
                  <p className={cn(styles['gadget__info--value'])}>
                    {gadget.ram}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.gadget__id}>
              <p>{`ID: ${product.id}`}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductError />
        </>
      )}
    </div>
  );
};
