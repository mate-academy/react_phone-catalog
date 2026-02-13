import { Link, useLocation } from 'react-router-dom';
import s from './CartProductCard.module.scss';
import { Product } from '../../../../utils/types/Product';
import { useCart } from '../../../../context/cart/useCart';
import { BASE_URL } from '../../../../utils/variables/base';

type Props = {
  cartItem: { product: Product; quantity: number };
};

export const CartProductCard: React.FC<Props> = ({ cartItem }) => {
  const location = useLocation();
  const { updateQuantity, removeFromCart } = useCart();

  const { name, price, image, itemId, category } = cartItem.product;

  return (
    <article className={s.productCard}>
      <div className={s.product}>
        <button
          className={s.deleteButton}
          type="button"
          aria-label="Remove product"
          onClick={() => removeFromCart(itemId)}
        ></button>

        <img
          src={`${BASE_URL}${image}`}
          alt="iPhone"
          className={s.productImg}
        />

        <Link
          to={`/${category}/${itemId}`}
          className={s.productName}
          state={{ from: location.pathname }}
        >
          {name}
        </Link>
      </div>
      <div className={s.bottomSection}>
        <div className={s.quantityControl}>
          <button
            className={s.quantityButton}
            type="button"
            onClick={() =>
              updateQuantity(
                itemId,
                cartItem.quantity === 1
                  ? cartItem.quantity
                  : cartItem.quantity - 1,
              )
            }
            disabled={cartItem.quantity === 1}
          >
            -
          </button>
          <span className={s.amount}>{cartItem.quantity}</span>
          <button
            className={s.quantityButton}
            type="button"
            onClick={() => updateQuantity(itemId, cartItem.quantity + 1)}
          >
            +
          </button>
        </div>

        <p className={s.productPrice}>${price * cartItem.quantity}</p>
      </div>
    </article>
  );
};
