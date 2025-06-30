import { Link } from 'react-router-dom';
import style from './CartItem.module.scss';
import { Icons } from '../../../../shared/ui/Icons/Icons';
import { IconId, IconStyles } from '../../../../types/icons';
import { Button } from '../../../../shared/ui/Button';
import React, { useContext } from 'react';
import { CartIt, DispatchContext } from '../../../../store/CartContext';

type CartItemProps = {
  item: CartIt;
};

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useContext(DispatchContext);

  const handleDelete = () => {
    dispatch({ type: 'remove', payload: item });
  };

  const decreaseItem = () => {
    dispatch({ type: 'decrease', payload: item });
  };

  const increaseItem = () => {
    dispatch({ type: 'increase', payload: item });
  };

  return (
    <div className={style.cartItem}>
      <div className={style.itemInfo}>
        <Link
          to={''}
          className={style.buttonDelete}
          onClick={() => handleDelete()}
        >
          <Icons id={IconId.Close} filled={IconStyles.CloseCart} />
        </Link>

        <div className={style.itemImg}>
          <img src={item.img} alt="item image" className={style.mainImg} />
        </div>

        <p className={style.itemName}>{item.name}</p>
      </div>

      <div className={style.itemProps}>
        <div className={style.counter}>
          <Button iconId={IconId.Minus} onClick={() => decreaseItem()} />
          <p className={style.counterNumber}>{item.qty}</p>
          <Button iconId={IconId.Plus} onClick={() => increaseItem()} />
        </div>

        <h3 className={style.itemPrice}>${item.price}</h3>
      </div>
    </div>
  );
};
