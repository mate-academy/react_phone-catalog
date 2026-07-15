import { useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../../../shared/components/FavoriteButton';
import { SquareButton } from '../../../shared/components/SquareButton';
import {
  useCartDispatch,
  useCartState,
} from '../../../shared/store/CartContext';
import { useFavorites } from '../../../shared/store/FavoritesContext';
import { ProductDetails } from '../../../shared/types/ProductDetails';
// eslint-disable-next-line max-len
import { parseProductDetailsToProduct } from '../../../shared/utils/normalizeProductToCart';
import styles from './PurchaseBlock.module.scss';

interface Props {
  priceDiscount: number;
  priceRegular: number;
  product: ProductDetails;
}

export const PurchaseBlock: React.FC<Props> = ({
  priceRegular,
  priceDiscount,
  product,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const dispatch = useCartDispatch();
  const state = useCartState();
  const navigate = useNavigate();

  const parsedProduct = parseProductDetailsToProduct(product);

  const isProductInCart = state.cartItems.some(
    item => item.product.itemId === parsedProduct.itemId,
  );

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
          onClick={() =>
            !isProductInCart
              ? dispatch({ type: 'addProduct', product: parsedProduct })
              : navigate(`/cart/`)
          }
          selected={isProductInCart}
        >
          {!isProductInCart ? 'Add to cart' : 'Added'}
        </SquareButton>
        <FavoriteButton
          className={styles['purchase-block__fav']}
          onClick={() => toggleFavorite(parsedProduct)}
          selected={isFavorite(parsedProduct.itemId)}
        />
      </div>
    </div>
  );
};
