import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { request } from '../../../utils/fetchResponse';
import { getColor } from '../../../utils/Colors';

import { useCart } from '../../../hooks/useCartContext';
import { useFavorite } from '../../../hooks/useFavoriteContext';

import { ProductDetailsData } from '../../../types/ProductDetailsData';
import { Product } from '../../../types/Product';

import styles from './ProductDetails.module.scss';

type Props = {
  product: ProductDetailsData;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const { cart, dispatch: cartDispatch } = useCart();
  const { favorite, dispatch: favoriteDispatch } = useFavorite();
  const { state } = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [isBaseProductLoading, setIsBaseProductLoading] = useState(true);
  const navigate = useNavigate();

  const noDiscount = Boolean(state?.noDiscount);
  const id = product.capacityAvailable.map(capaciry => parseInt(capaciry));
  const isInCart = cart.some(isCart => isCart.id === baseProduct?.id);
  const isInFavorite = favorite.some(
    isFavotite => isFavotite.product.itemId === product.id,
  );

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ].filter(spec => spec.value);

  const getVariantId = (capacity: string, color: string) => {
    return `${product.namespaceId}-${capacity.toLowerCase()}-${color.replace(/\s+/g, '-')}`;
  };

  useEffect(() => {
    request<Product[]>('/products.json')
      .then(response =>
        setBaseProduct(
          response.find(data => data.itemId === product.id) ?? null,
        ),
      )
      .catch(() => alert('Error loading product'))
      .finally(() => setIsBaseProductLoading(false));
  }, [product.id]);

  return (
    <div className={styles['product-details']}>
      <h2 className={styles['product-details__title']}>{product.name}</h2>

      <div className={styles['product-details__overview']}>
        <div className={styles.gallery}>
          <div className={styles.gallery__picture} key={activeImageIndex}>
            <img
              src={`${import.meta.env.BASE_URL}/${product.images[activeImageIndex]}`}
              alt={product.name}
              className={styles.gallery__image}
            />
          </div>
          <ul className={styles.gallery__list}>
            {product.images.map((picture, index) => (
              <li key={picture}>
                <button
                  className={classNames(styles.gallery__button, {
                    [styles['gallery__button--active']]:
                      index === activeImageIndex,
                  })}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-current={index === activeImageIndex ? 'true' : undefined}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/${picture}`}
                    alt=""
                    className={styles['gallery__button-image']}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles['product-details__purchase']}>
          <div className={styles['available-colors']}>
            <div>
              <p className={styles['available-colors__title']}>
                Available colors
              </p>
              <ul className={styles['available-colors__list']}>
                {product.colorsAvailable.map(color => (
                  <li key={color}>
                    <label
                      className={classNames(styles['available-colors__label'], {
                        [styles['available-colors__label--active']]:
                          color === product.color,
                      })}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={color === product.color}
                        aria-label={color}
                        onChange={() => {
                          navigate(
                            `/${product.category}/${getVariantId(product.capacity, color)}`,
                            { state },
                          );
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className={styles['available-colors__input']}
                      />
                      <span
                        className={styles['available-colors__circle']}
                        style={{ backgroundColor: getColor(color) }}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <span className={styles['available-colors__id']}>ID: {id}</span>
          </div>

          <div className={styles['available-capacity']}>
            <p className={styles['available-capacity__title']}>
              Select capacity
            </p>
            <ul className={styles['available-capacity__list']}>
              {product.capacityAvailable.map(capacity => (
                <li key={capacity}>
                  <label
                    aria-label={capacity}
                    className={classNames(styles['available-capacity__label'], {
                      [styles['available-capacity__label--active']]:
                        capacity === product.capacity,
                    })}
                  >
                    <input
                      type="radio"
                      name="capacity"
                      value={capacity}
                      checked={capacity === product.capacity}
                      className={styles['available-capacity__input']}
                      onChange={() => {
                        navigate(
                          `/${product.category}/${getVariantId(capacity, product.color)}`,
                          { state },
                        );
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                    />
                    {capacity}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['available-options']}>
            <div className={styles['available-options__price']}>
              <span className={styles['available-options__new-price']}>
                ${product.priceDiscount}
              </span>
              {!noDiscount && (
                <span className={styles['available-options__old-price']}>
                  ${product.priceRegular}
                </span>
              )}
            </div>

            <div className={styles['available-options__buttons']}>
              <button
                className={classNames(
                  styles['available-options__button-accept'],
                  {
                    [styles['available-options__button-accept--selected']]:
                      isInCart,
                  },
                )}
                disabled={!baseProduct || isInCart}
                onClick={() =>
                  baseProduct &&
                  cartDispatch({ type: 'add', payload: baseProduct })
                }
              >
                {isBaseProductLoading ? (
                  'Loading...'
                ) : (
                  <>{isInCart ? 'Added to cart' : 'Add to cart'}</>
                )}
              </button>
              <button
                className={classNames(
                  styles['available-options__button-favorite'],
                  {
                    [styles['available-options__button-favorite--selected']]:
                      isInFavorite,
                  },
                )}
                disabled={!baseProduct}
                aria-pressed={isInFavorite}
                aria-label={
                  isInFavorite ? 'Remove from favourites' : 'Add to favourites'
                }
                onClick={() =>
                  baseProduct &&
                  favoriteDispatch({ type: 'toggle', payload: baseProduct })
                }
              >
                {isInFavorite ? (
                  <FaHeart
                    className={styles['available-options__icon-heart']}
                  />
                ) : (
                  <FaRegHeart
                    className={styles['available-options__icon-heart']}
                  />
                )}
              </button>
            </div>

            <ul className={styles['available-options__rows']}>
              {specs.slice(0, 4).map(option => (
                <li
                  key={option.label}
                  className={styles['available-options__row']}
                >
                  <span className={styles['available-options__option-name']}>
                    {option.label}{' '}
                  </span>
                  <span className={styles['available-options__option-desc']}>
                    {option.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles['product-details__info']}>
        <div className={styles['product-details__about']}>
          <h3 className={styles.about__title}>About</h3>

          {product.description.map(info => (
            <div key={info.title} className={styles.about__description}>
              <h4 className={styles['about__description-title']}>
                {info.title}
              </h4>
              <p className={styles['about__description-text']}>{info.text}</p>
            </div>
          ))}
        </div>

        <div className={styles['product-details__specs']}>
          <h3 className={styles.specs__title}>Tech specs</h3>

          <ul className={styles.specs__list}>
            {specs.map(spec => (
              <li key={spec.label} className={styles.specs__row}>
                <span className={styles['specs__option-name']}>
                  {spec.label}
                </span>
                <span className={styles['specs__option-desc']}>
                  {spec.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
