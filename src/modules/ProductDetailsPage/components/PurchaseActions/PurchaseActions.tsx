import classNames from 'classnames';
import { Button } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';
import { useCart, useFavorites } from '../../../../context';
import { Product, ProductDetails } from '../../../../types';
import styles from './PurchaseActions.module.scss';

interface Props {
  details: ProductDetails;
  product?: Product;
}

export const PurchaseActions = ({ details, product }: Props) => {
  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isAdded = product ? isInCart(product.id) : false;
  const isLiked = product ? isFavorite(product.id) : false;

  return (
    <div className={styles['purchase-actions']}>
      <p className={styles['purchase-actions__prices']}>
        <span className={styles['purchase-actions__price']}>
          ${details.priceDiscount}
        </span>
        <span className={styles['purchase-actions__full-price']}>
          ${details.priceRegular}
        </span>
      </p>

      {product && (
        <div className={styles['purchase-actions__buttons']}>
          <Button
            className={styles['purchase-actions__cart-button']}
            isSelected={isAdded}
            onClick={() => !isAdded && addToCart(product)}
          >
            {isAdded ? 'Added to cart' : 'Add to cart'}
          </Button>

          <button
            type="button"
            className={classNames(styles['purchase-actions__favorite'], {
              [styles['purchase-actions__favorite--active']]: isLiked,
            })}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(product.id)}
          >
            <Icon name="heart" isFilled={isLiked} />
          </button>
        </div>
      )}
    </div>
  );
};
