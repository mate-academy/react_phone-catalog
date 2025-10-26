/* eslint-disable max-len */
import styles from '../Button.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addToCart, removeFromCart, selectItemIds } from '../../../../../store/slices/cartSlice';
import { ProductData } from '../../../types/ProductData';

type Props = {
  product: ProductData;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const itemsIdsInCart = useAppSelector(selectItemIds);

  const inCart = itemsIdsInCart.includes(product.itemId);

  if (!inCart) {
    return (
      <button
        className={styles.action__button}
        onClick={() => {
          dispatch(
            addToCart({
              item: product,
              qty: 1,
            }),
          );
        }}
      >
        {'Add to cart'}
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.action__button} ${styles.remove}`}
        onClick={() => {
          dispatch(removeFromCart({ itemId: product.itemId }));
        }}
      >
        {'Added to cart'}
      </button>
    );
  }
};
