import React from 'react';
import { Gadget } from '../../utils/types/Gadget';
import styles from './ProductOptions.module.scss';
import heart from './../../images/icons/heart.svg';
import fillHeart from './../../images/icons/heart_filled.svg';
import {
  useAppDispatch,
  useAppSelector,
  useWindowDimensions,
} from '../../hooks/hooks';
import { DESKTOP_SIZE } from '../../consts/consts';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { addToCart } from '../../features/cart/cartSlise';
import { Product } from '../../utils/types/Product';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';

type Props = {
  currentGadget: Gadget;
  product: Product;
};

export const ProductOptions: React.FC<Props> = ({ currentGadget, product }) => {
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();

  const favoritesItems: Product[] = useAppSelector(state => state.favorites);

  const cartProducts = useAppSelector(state => state.cart.items);

  const isFavorite = favoritesItems.find(item => item.id === product.id);

  const isAddedCart = cartProducts.find(item => item.id === product.id);

  const {
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    category,
    capacity,
    namespaceId,
    color: currentColor,
  } = currentGadget;

  const getCSSVariableValue = (variableName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variableName,
    );
  };

  return (
    <div className={styles['product-options']}>
      <div className={styles['product-options__info']}>
        <div className={styles['product-options__wrapper']}>
          <div className={styles['product-options__availableColors']}>
            <p className={styles['product-options__title']}>Available colors</p>
            <div className={styles['product-options__colors']}>
              {colorsAvailable.map(color => (
                <Link
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                  to={`../${category}/${namespaceId}-${capacity.toLowerCase()}-${color.replace(/ /g, '-')}`}
                  key={color}
                  className={classNames(styles['product-options__color'], {
                    [styles.product_options__color__active]:
                      color === currentColor,
                  })}
                  style={{
                    backgroundColor: getCSSVariableValue(
                      `--color-${color.split(' ').join('')}`,
                    ),
                  }}
                ></Link>
              ))}
            </div>
          </div>
          {width < DESKTOP_SIZE && (
            <div className={styles['product-options__id']}>
              <p>ID: {product.id}</p>
            </div>
          )}
        </div>
        <div className={styles['product-options__capacity']}>
          <p className={styles['product-options__title']}>Select capacity</p>
          <div className={styles['product-options__capacities']}>
            {capacityAvailable.map(capacityItem => (
              <Link
                to={`../${category}/${namespaceId}-${capacityItem.toLowerCase()}-${currentColor}`}
                key={capacityItem}
                className={classNames(
                  styles['product-options__capacity-item'],
                  {
                    [styles.product_options__capacity_active]:
                      capacityItem === capacity,
                  },
                )}
              >
                {capacityItem}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles['product-options__price']}>
          <div className={styles['product-options__price_wrapper']}>
            <h2 className={styles['product-options__new_price']}>
              ${priceDiscount}
            </h2>
            <h3 className={styles['product-options__sale_price']}>
              ${priceRegular}
            </h3>
          </div>
        </div>
        <div className={styles['product-options__buttons']}>
          <div className={styles['product-options__buttons_wrapper']}>
            {isAddedCart ? (
              <div className={styles['product-options__addToCart_success']}>
                Added to cart
              </div>
            ) : (
              <button
                className={styles['product-options__addToCart']}
                onClick={() => dispatch(addToCart({ quantity: 1, ...product }))}
              >
                Add to cart
              </button>
            )}

            <button
              className={styles['product-options__likes']}
              onClick={() => dispatch(toggleFavorite(product))}
            >
              {isFavorite ? (
                <img src={fillHeart} alt="Red heart" />
              ) : (
                <img src={heart} alt="Heart" />
              )}
            </button>
          </div>
        </div>
        <div className={styles['product-options__params']}>
          <div className={styles['product-options__param']}>
            <p className={styles['product-options__options_name']}>Screen</p>
            <p className={styles['product-options__options_info']}>{screen}</p>
          </div>
          <div className={styles['product-options__param']}>
            <p className={styles['product-options__options_name']}>
              Resolution
            </p>
            <p className={styles['product-options__options_info']}>
              {resolution}
            </p>
          </div>
          <div className={styles['product-options__param']}>
            <p className={styles['product-options__options_name']}>Processor</p>
            <p className={styles['product-options__options_info']}>
              {processor}
            </p>
          </div>
          <div className={styles['product-options__param']}>
            <p className={styles['product-options__options_name']}>RAM</p>
            <p className={styles['product-options__options_info']}>{ram}</p>
          </div>
        </div>
      </div>
      {width > DESKTOP_SIZE && (
        <div className={styles['product-options_id']}>
          <div className={styles['product-options__id']}>
            <p>ID: {product.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};
