import React, { useContext, useState } from 'react';
import cn from 'classnames';
import styles from './GadgetDetails.module.scss';
import { BASE_URL } from '../../utils/httpClient';
import { Link, useLocation } from 'react-router-dom';
import { GADGET_COLORS } from '../../utils/GadgetColors';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductError } from '../Errors/ProductError';
import { Product } from '../../types/Product';
import { Buttons } from '../Buttons';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

type Props = {
  gadget: ProductDetails;
  product: Product;
};

export const GadgetDetails: React.FC<Props> = ({ gadget, product }) => {
  const [selectImage, setSelectImage] = useState(gadget.images[0]);
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.gadget}>
      {gadget ? (
        <>
          <h2
            className={cn({
              [styles.gadget__title]: theme === Theme.Light,
              [styles['gadget__title-dark']]: theme === Theme.Dark,
            })}
          >
            {gadget.name}
          </h2>

          <div className={styles.gadget__content}>
            <div className={styles['gadget__small-images--tablet']}>
              {gadget.images.map(image => (
                <button
                  key={image}
                  onClick={() => setSelectImage(image)}
                  className={cn({
                    [styles.gadget__button]: theme === Theme.Light,
                    [styles['gadget__button--active']]:
                      image === selectImage && theme === Theme.Light,
                    [styles['gadget__button-dark']]: theme === Theme.Dark,
                    [styles['gadget__button-dark--active']]:
                      image === selectImage && theme === Theme.Dark,
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
                  className={cn({
                    [styles.gadget__button]: theme === Theme.Light,
                    [styles['gadget__button--active']]:
                      image === selectImage && theme === Theme.Light,
                    [styles['gadget__button-dark']]: theme === Theme.Dark,
                    [styles['gadget__button-dark--active']]:
                      image === selectImage && theme === Theme.Dark,
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
                  <p
                    className={cn({
                      [styles['gadget__details-title']]: theme === Theme.Light,
                      [styles['gadget__details-title-dark']]:
                        theme === Theme.Dark,
                    })}
                  >
                    Available colors
                  </p>
                  <div
                    className={cn({
                      [styles['gadget__id-tablet']]: theme === Theme.Light,
                      [styles['gadget__id-tablet-dark']]: theme === Theme.Dark,
                    })}
                  >
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
                        className={cn({
                          [styles.gadget__link]: theme === Theme.Light,
                          [styles['gadget__link--active']]:
                            gadget.color === colorVal && theme === Theme.Light,
                          [styles['gadget__link-dark']]: theme === Theme.Dark,
                          [styles['gadget__link-dark--active']]:
                            gadget.color === colorVal && theme === Theme.Dark,
                        })}
                      />
                    );
                  })}
                </div>
              </div>
              <div
                className={cn({
                  [styles.gadget__line]: theme === Theme.Light,
                  [styles['gadget__line-dark']]: theme === Theme.Dark,
                })}
              ></div>

              <div className={styles.gadget__capacity}>
                <p
                  className={cn({
                    [styles['gadget__details-title']]: theme === Theme.Light,
                    [styles['gadget__details-title-dark']]:
                      theme === Theme.Dark,
                  })}
                >
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
                        className={cn({
                          [styles['gadget__button-capacity']]:
                            theme === Theme.Light,
                          [styles['gadget__button-capacity--active']]:
                            gadget.capacity === capacity &&
                            theme === Theme.Light,
                          [styles['gadget__button-capacity-dark']]:
                            theme === Theme.Dark,
                          [styles['gadget__button-capacity-dark--active']]:
                            gadget.capacity === capacity &&
                            theme === Theme.Dark,
                        })}
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div
                className={cn({
                  [styles.gadget__line]: theme === Theme.Light,
                  [styles['gadget__line-dark']]: theme === Theme.Dark,
                })}
              ></div>

              <div className={styles.gadget__prices}>
                <div
                  className={cn({
                    [styles['gadget__price-discount']]: theme === Theme.Light,
                    [styles['gadget__price-discount-dark']]:
                      theme === Theme.Dark,
                  })}
                >
                  {`$${gadget.priceDiscount}`}
                </div>
                <div
                  className={cn({
                    [styles['gadget__price-full']]: theme === Theme.Light,
                    [styles['gadget__price-full-dark']]: theme === Theme.Dark,
                  })}
                >
                  {`$${gadget.priceRegular}`}
                </div>
              </div>

              <div className={styles.gadget__actions}>
                <Buttons product={product} />
              </div>

              <div className={styles['gadget__info-details']}>
                <div className={styles.gadget__info}>
                  <p
                    className={cn({
                      [styles['gadget__info-name']]: theme === Theme.Light,
                      [styles['gadget__info-name-dark']]: theme === Theme.Dark,
                    })}
                  >
                    Screen
                  </p>
                  <p
                    className={cn({
                      [styles['gadget__info-value']]: theme === Theme.Light,
                      [styles['gadget__info-value-dark']]: theme === Theme.Dark,
                    })}
                  >
                    {gadget.screen}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p
                    className={cn({
                      [styles['gadget__info-name']]: theme === Theme.Light,
                      [styles['gadget__info-name-dark']]: theme === Theme.Dark,
                    })}
                  >
                    Resolution
                  </p>
                  <p
                    className={cn({
                      [styles['gadget__info-value']]: theme === Theme.Light,
                      [styles['gadget__info-value-dark']]: theme === Theme.Dark,
                    })}
                  >
                    {gadget.resolution}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p
                    className={cn({
                      [styles['gadget__info-name']]: theme === Theme.Light,
                      [styles['gadget__info-name-dark']]: theme === Theme.Dark,
                    })}
                  >
                    Processor
                  </p>
                  <p
                    className={cn({
                      [styles['gadget__info-value']]: theme === Theme.Light,
                      [styles['gadget__info-value-dark']]: theme === Theme.Dark,
                    })}
                  >
                    {gadget.processor}
                  </p>
                </div>

                <div className={styles.gadget__info}>
                  <p
                    className={cn({
                      [styles['gadget__info-name']]: theme === Theme.Light,
                      [styles['gadget__info-name-dark']]: theme === Theme.Dark,
                    })}
                  >
                    RAM
                  </p>
                  <p
                    className={cn({
                      [styles['gadget__info-value']]: theme === Theme.Light,
                      [styles['gadget__info-value-dark']]: theme === Theme.Dark,
                    })}
                  >
                    {gadget.ram}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn({
                [styles.gadget__id]: theme === Theme.Light,
                [styles['gadget__id-dark']]: theme === Theme.Dark,
              })}
            >
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
