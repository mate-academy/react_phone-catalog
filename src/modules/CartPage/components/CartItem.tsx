import { CircleButton } from '../../../components/CircleButton';
import { Icon } from '../../../components/Icon';
import { Product } from '../../../types/Product';
import styles from './CartItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { cartActions } from '../../../store/cart/cartSlice';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface CartProduct {
  product: Product;
  quantity: number;
}

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { isDark } = useAppSelector(satte => satte.theme);
  const { product, quantity } = item;
  const maxAmount = 99;
  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(styles['cart-item'], {
        [styles['cart-item--dark']]: isDark,
      })}
    >
      <div className={styles['cart-item__left']}>
        <button
          className={styles['cart-item__delete-btn']}
          onClick={() => {
            dispatch(cartActions.deleteItem(product.itemId));
          }}
        >
          <Icon type="close" />
        </button>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['cart-item__link']}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles['cart-item__img']}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['cart-item__link']}
        >
          <p className={styles['cart-item__title']}>{product.name}</p>
        </Link>
      </div>

      <div className={styles['cart-item__right']}>
        <div className={styles['cart-item__btns']}>
          <CircleButton
            type="minus"
            isDisabled={quantity <= 1}
            onClick={() => {
              dispatch(
                cartActions.updateQuantity({
                  id: product.itemId,
                  quantity: quantity - 1 > 1 ? quantity - 1 : 1,
                }),
              );
            }}
          />
          <p>{quantity}</p>
          <CircleButton
            type="plus"
            isDisabled={quantity === maxAmount}
            onClick={() => {
              dispatch(
                cartActions.updateQuantity({
                  id: product.itemId,
                  quantity: quantity + 1 < 100 ? quantity + 1 : 99,
                }),
              );
            }}
          />
        </div>

        <h3 className={styles['cart-item__price']}>
          {product.price * quantity}
        </h3>
      </div>
    </div>
  );
};
