import styles from './ProductOptions.module.scss';

import { Product } from '../../../../shared/types/Product/Product';
import { useContext } from 'react';
import { ProductContext } from '../../../../shared/store/GlobalProvider';
import {
  FavoritesDispatchContext,
  FavoritesStateContext,
} from '../../../../shared/store/FavoritesProvider';
import {
  CartDispatchContext,
  CartStateContext,
} from '../../../../shared/store/CartProvider';

import FvoriteIcon from '../../../../assets/icons/favorites-icons/favorite-icon.svg';
import FvoriteIconAdded from '../../../../assets/icons/favorites-icons/favorite-icon-added.svg';

import { getClassName } from '../../../../shared/utils/classNameActive';
import { generateProductUrl } from '../../utils/generateProductUrl';
import { Link } from 'react-router-dom';
import { type } from 'os';
import { AllProducts } from '../../../../shared/types/AllProduct/AllProduct';

type Props = {
  product: Product;
};

export const ProductOptions: React.FC<Props> = ({ product }) => {
  const { data } = useContext(ProductContext);
  const favoritesProduct = useContext(FavoritesStateContext);
  const favoritesDispatch = useContext(FavoritesDispatchContext);
  const cartProducts = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);

  const findProduct = data.find(item => item.itemId === product.id);

  const handleFavorite = () => {
    const isFavorite = favoritesProduct.some(
      favorite => favorite.id === findProduct?.id,
    );

    if (isFavorite) {
      favoritesDispatch({
        type: 'deleteFavoritesProduct',
        payload: findProduct?.id as number,
      });
    } else {
      favoritesDispatch({ type: 'addFavoritesProduct', payload: findProduct! });
    }
  };

  const handleCart = () => {
    const newCart = {
      id: findProduct?.id as number,
      quantity: 1,
      product: findProduct as AllProducts,
    };

    cartDispatch({ type: 'addCartProduct', payload: newCart });
  };

  const isFavorite = favoritesProduct.some(
    favorite => favorite.id === findProduct?.id,
  );

  const isCart = cartProducts.some(
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
                className={getClassName({
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
              className={getClassName({
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
            onClick={handleFavorite}
          >
            <img
              className={styles.productOverview__addIcon}
              src={isFavorite ? FvoriteIconAdded : FvoriteIcon}
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
