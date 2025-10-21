/* eslint-disable max-len */
import styles from '../Button.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addToCart, selectItemIds } from '../../../../../store/slices/cartSlice';
import { ProductData } from '../../../types/ProductData';

type Props = {
  product: ProductData;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const itemsIdsInCart = useAppSelector(selectItemIds);

  const inCart = itemsIdsInCart.includes(product.itemId);

  return (
    <button
      disabled={inCart}
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
      {!inCart ? 'Add to cart' : 'Added to cart'}
    </button>
  );
};
