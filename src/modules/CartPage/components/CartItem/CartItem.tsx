import { ProductsContext } from '../../../../Context/ProductsContext';
import { CartItemType } from '../../../../types/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContextSelector } from 'use-context-selector';
import { Link } from 'react-router-dom';

import s from './CartItem.module.scss';

type Props = { product: CartItemType };

export const CartItem: React.FC<Props> = ({ product }) => {
  const removeProdFromCart = useContextSelector(
    ProductsContext,
    ctx => ctx.removeProdFromCart,
  );
  const changeQuontityInCart = useContextSelector(
    ProductsContext,
    ctx => ctx.changeQuontityInCart,
  );

  return (
    <div
      className={`is-flex-tablet is-align-items-center is-justify-content-space-between mb-4 ${s.cartItem}`}
      key={product.id}
    >
      <div className={s.cartItem__wrap}>
        <button
          type="button"
          className={s.delete_btn}
          onClick={() => removeProdFromCart(product.id)}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: 'b4bdc3', width: '16px' }}
          />
        </button>
        <Link
          className="is-flex is-align-items-center is-justify-content-space-between"
          to={`/product/${product.itemId}`}
        >
          <img
            className={`${s.product_image} image is-64x64`}
            src={product.image}
            alt={product.name}
          />
          <p className={s.product_name}>{product.name}</p>
        </Link>
      </div>
      <div className={s.cartItem__wrap}>
        <div className={` is-flex is-align-items-center ${s.quantity_wrap}`}>
          <button
            className={`${s.change_q_btn} mr-3 button`}
            onClick={() => changeQuontityInCart(product.id, 'decr')}
            disabled={product.quantity === 1}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{product.quantity}</span>
          <button
            className={`${s.change_q_btn} ml-3 button`}
            onClick={() => changeQuontityInCart(product.id, 'incr')}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <p className={`${s.product_price}`}>
          ${product.price * product.quantity}
        </p>
      </div>
    </div>
  );
};
