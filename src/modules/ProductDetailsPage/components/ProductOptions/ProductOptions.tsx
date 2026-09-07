import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductOptions.module.scss';

import { Product } from '../../../../shared/types/Product/Product';

// eslint-disable-next-line
import { AllProducts } from '../../../../shared/types/AllProducts/AllProducts';
import { generateProductUrl } from '../../utils/generateProductUrl';
import { getClassLink } from '../../../../shared/utils/activeClassName';

// eslint-disable-next-line
import FavoritesIcon from '../../../../assets/icons/favorites-icon/favorites-icon.svg';
// eslint-disable-next-line
import FavoritesAddedIcon from '../../../../assets/icons/favorites-icon/favorites-icon-added.svg';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addCartProduct } from '../../../../store/cartSlice/cartSlice';
import {
  addFavoritesProduct,
  deleteFavoritesProduct,
} from '../../../../store/favoritesSlice/favoritesSlice';

type Props = {
  product: Product;
};

export const ProductOptions: React.FC<Props> = ({ product }) => {
  const data = useAppSelector(state => state.products.data);
  const favoritesProduct = useAppSelector(state => state.favorites);
  const cartsProduct = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const findProduct = data.find(el => el.itemId === product.id);

  const handleFavorites = () => {
    const isFavorites = favoritesProduct.some(
      favorite => favorite.id === findProduct?.id,
    );

    if (isFavorites) {
      dispatch(deleteFavoritesProduct(findProduct?.id as number));
    } else {
      dispatch(addFavoritesProduct(findProduct!));
    }
  };

  const isFavorites = favoritesProduct.some(
    favoriteProduct => favoriteProduct.itemId === product.id,
  );

  const handleCart = () => {
    const newCartItem = {
      id: findProduct?.id as number,
      quantity: 1,
      product: findProduct as AllProducts,
    };

    dispatch(addCartProduct(newCartItem));
  };

  const isCart = cartsProduct.some(
    cartsProducts => cartsProducts.product.itemId === product.id,
  );

  return (
    <section className={styles.productOverview__options}>
      <div className={styles.productOverview__optionsWrapper}>
        <div className={styles.productOverview__colors}>
          <p className={styles.productOverview__colorTitle}>Available colors</p>
          <div className={styles.productOverview__colorWrapper}>
            {product.colorsAvailable.map((color, index) => (
              <div
                key={index}
                className={getClassLink({
                  isActive: product.color === color,
                  baseClass: styles.productOverview__colorOption,
                  activeClass: styles.productOverview__colorActive,
                })}
              >
                <Link
                  to={generateProductUrl(
                    product.category,
                    product.namespaceId,
                    product.capacity,
                    color,
                  )}
                  className={`${styles[`productOverview__${color.replace(' ', '')}`]}`}
                ></Link>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.productOverview__productId}>
          ID: {findProduct?.id}
        </p>
      </div>

      <hr className={styles.productOverview__line} />

      <div className={styles.productOverview__capacity}>
        <p className={styles.productOverview__capacityTitle}>Select capacity</p>
        <div className={styles.productOverview__capacityButtons}>
          {product.capacityAvailable.map(capacity => (
            <Link
              to={generateProductUrl(
                product.category,
                product.namespaceId,
                capacity,
                product.color,
              )}
              className={getClassLink({
                isActive: product.capacity === capacity,
                baseClass: styles.productOverview__capacityOption,
                activeClass: styles.productOverview__optionActive,
              })}
              key={capacity}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>

      <hr className={styles.productOverview__line} />

      <div className={styles.productOverview__cta}>
        <div className={styles.productOverview__price}>
          <h2 className={styles.productOverview__currentPrice}>
            ${product.priceDiscount}
          </h2>
          <p className={styles.productOverview__discountPrice}>
            ${product.priceRegular}
          </p>
        </div>

        <div className={styles.productOverview__addToCart}>
          <button
            className={styles.productOverview__addButton}
            onClick={() => handleCart()}
            disabled={isCart}
          >
            {isCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            className={styles.productOverview__iconWrapper}
            onClick={handleFavorites}
          >
            <img
              className={styles.productOverview__addIcon}
              src={isFavorites ? FavoritesAddedIcon : FavoritesIcon}
              alt="Add to cart"
            />
          </button>
        </div>
      </div>

      <div className={styles.details__specifications}>
        <ul className={styles.details__specList}>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Screen</p>
            <p className={styles.details__specCh}>
              {product.screen ? product.screen : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Resolution</p>
            <p className={styles.details__specCh}>
              {product.resolution ? product.resolution : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Processor</p>
            <p className={styles.details__specCh}>
              {product.processor ? product.processor : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>RAM</p>
            <p className={styles.details__specCh}>
              {product.ram ? product.ram : '-'}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
