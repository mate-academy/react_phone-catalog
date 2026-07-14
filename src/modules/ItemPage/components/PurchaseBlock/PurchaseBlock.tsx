import { FavoriteButton } from '../../../shared/components/FavoriteButton';
import { SquareButton } from '../../../shared/components/SquareButton';
import { useCartDispatch } from '../../../shared/store/CartContext';
import { useFavorites } from '../../../shared/store/FavoritesContext';
import { Product } from '../../../shared/types/Product';
import styles from './PurchaseBlock.module.scss';

interface Props {
  priceDiscount: number;
  priceRegular: number;
  product: Product;
}

export const PurchaseBlock: React.FC<Props> = ({
  priceRegular,
  priceDiscount,
  product,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const dispatch = useCartDispatch();

  return (
    <div className={styles['purchase-block']}>
      <div className={styles['purchase-block__price-row']}>
        <span className={styles['purchase-block__discount-price']}>
          {`$${priceDiscount}`}
        </span>
        <span className={styles['purchase-block__regular-price']}>
          {`$${priceRegular}`}
        </span>
      </div>

      <div className={styles['purchase-block__manager']}>
        <SquareButton
          className={styles['purchase-block__cart']}
          onClick={() => dispatch({ type: 'addProduct', product })}
        >
          Add to cart
        </SquareButton>
        <FavoriteButton
          className={styles['purchase-block__fav']}
          onClick={() => toggleFavorite(product)}
          selected={isFavorite(product.itemId)}
        />
      </div>
    </div>
  );
};
