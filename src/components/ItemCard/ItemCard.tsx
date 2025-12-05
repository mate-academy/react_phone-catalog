import { DeleteButton } from '../ui/Buttons/DeleteButton';
import { DecreaseButton } from '../ui/Buttons/DecreaseButton';
import { IncreaseButton } from '../ui/Buttons/IncreaseButton';
import s from './ItemCart.module.scss';
import { NavLink } from 'react-router-dom';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  item: CartProduct;
};

export const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className={s.cartItem}>
      <div className={s['cartItem__product-info']}>
        <DeleteButton product={item} />
        <NavLink
          to={`/product/${item.itemId}`}
          className={s['cartItem__link-img']}
        >
          <img
            src={`${item.image}`}
            alt="card-img"
            className={s.cartItem__img}
          />
        </NavLink>
        <NavLink
          to={`/product/${item.itemId}`}
          className={s['cartItem__link-title']}
        >
          <div className={s.cartItem__title}>{item.name}</div>
        </NavLink>
      </div>

      <div className={s['cartItem__purchase-data']}>
        <div className={s.cartItem__counter}>
          <DecreaseButton item={item} />
          <span className={s.cartItem__quantity}>{item.quantity}</span>
          <IncreaseButton item={item} />
        </div>

        <div className={s.cartItem__price}>{item.price}$</div>
      </div>
    </div>
  );
};
