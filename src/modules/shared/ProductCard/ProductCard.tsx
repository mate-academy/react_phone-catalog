/* eslint-disable import/no-extraneous-dependencies */
import * as Tooltip from '@radix-ui/react-tooltip';

import { FC, useMemo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Button from '../../../UI/Buttons/Button';
import { Link } from 'react-router-dom';
import Product from '../../../types/Product';
import { ROUTES } from '../../../constants/ROUTES';
import styles from './ProductCard.module.css';
import { useCartStore } from '../../../store/cartStore';
import { useFavoritesStore } from '../../../store/favoritesStore';
import { useToastStore } from '../../../store/toastStore';

interface Props {
  product: Product;
  isBrandNew?: boolean;
}

const ProductCard: FC<Props> = ({ product, isBrandNew = false }) => {
  const {
    images,
    name,
    priceDiscount,
    priceRegular,
    screen,
    capacity,
    ram,
    id,
  } = product;

  const { toggleProductInCart, cartItems } = useCartStore(state => ({
    toggleProductInCart: state.toggleProductInCart,
    cartItems: state.cartItems,
  }));

  const { toggleFavorite, favorites } = useFavoritesStore(state => ({
    toggleFavorite: state.toggleFavorite,
    favorites: state.favorites,
  }));

  const { addToast } = useToastStore();

  const productLink =
    `/${product.category}/` + ROUTES.PRODUCT_DETAIL.replace(':productId', id);

  const isInCart = useMemo(
    () => cartItems.some(item => item.id === product.id),
    [cartItems, product.id],
  );

  const isFavorite = useMemo(
    () => favorites.some(item => item.id === product.id),
    [favorites, product.id],
  );

  const handleToggleCart = (newProduct: Product) => {
    toggleProductInCart({
      id: newProduct.id,
      quantity: 1,
      product: newProduct,
    });
    addToast(isInCart ? 'Removed from Cart' : 'Added to Cart', newProduct.name);
  };

  const handleToggleFavorite = (newProduct: Product) => {
    toggleFavorite(newProduct);
    addToast(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      newProduct.name,
    );
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.header}>
        <Link to={productLink} className={styles.imgWrapper}>
          <img src={images[0]} alt={name} className={styles.image} />
        </Link>
        <Link to={productLink} className={styles.descr}>
          {name}
        </Link>
        <p className={styles.prices}>
          <span className={styles.newPrice}>${priceDiscount}</span>
          {!isBrandNew && (
            <span className={styles.oldPrice}>${priceRegular}</span>
          )}
        </p>
      </div>

      <ul className={styles.paramsList}>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Screen</span>
          <span className={styles.paramValue}>{screen}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Capacity</span>
          <span className={styles.paramValue}>{capacity}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>RAM</span>
          <span className={styles.paramValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.actionsWrapper}>
        <Button
          onClick={() => handleToggleCart(product)}
          variant="primary"
          isSelected={isInCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>

        <Tooltip.Provider skipDelayDuration={300} delayDuration={500}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button
                variant="icon"
                onClick={() => handleToggleFavorite(product)}
                size={[40, 40]}
              >
                {isFavorite ? (
                  <FaHeart color="red" size={16} />
                ) : (
                  <FaRegHeart size={16} />
                )}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={styles.tooltipContent}
                sideOffset={5}
                aria-label={
                  isFavorite ? 'Delete from favorite' : 'Add to favorite'
                }
              >
                {isFavorite ? 'Delete from favorite' : 'Add to favorite'}
                <Tooltip.Arrow className={styles.tooltipArrow} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </article>
  );
};

export default ProductCard;
