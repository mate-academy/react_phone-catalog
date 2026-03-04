import { useContext } from 'react';
import { AddToCartContext } from '../../../../contexts/AddToCartContext';
import { CartProduct } from '../../../../types/CartProduct';
import style from './CartItems.module.scss';
import cn from 'classnames';

export const CartItems = () => {
  const { cart, setCart } = useContext(AddToCartContext);

  const handleMinus = (item: CartProduct) => {
    setCart(currCart =>
      currCart.map(currItem =>
        currItem.itemId === item.itemId
          ? { ...currItem, quantity: currItem.quantity - 1 }
          : currItem,
      ),
    );
  };

  const handlePlus = (item: CartProduct) => {
    setCart(currCart =>
      currCart.map(currItem =>
        currItem.itemId === item.itemId
          ? { ...currItem, quantity: currItem.quantity + 1 }
          : currItem,
      ),
    );
  };

  const handleDelete = (item: CartProduct) => {
    setCart(currCart => currCart.filter(i => i.itemId !== item.itemId));
  };

  return (
    <div className={style.items}>
      {cart.map(item => (
        <div className={cn(style.items__item, style.item)} key={item.itemId}>
          <div className={style.item__content}>
            <div className={style.item__left}>
              <button
                className={style.item__remove}
                onClick={() => handleDelete(item)}
              ></button>
              <img
                src={item.image}
                alt={item.name}
                className={style.item__img}
              />
              <p className={style.item__name}>{item.name}</p>
            </div>
            <div className={style.item__right}>
              <div className={style.item__count}>
                <button
                  className={cn(
                    style.item__button,
                    style['item__button--minus'],
                    {
                      [style['item__button--disabled']]: item.quantity === 1,
                    },
                  )}
                  onClick={() => handleMinus(item)}
                ></button>
                <p className={style.item__amount}>{item.quantity}</p>
                <button
                  className={cn(
                    style.item__button,
                    style['item__button--plus'],
                  )}
                  onClick={() => handlePlus(item)}
                ></button>
              </div>
              <h3 className={style.item__total}>
                ${item.price * item.quantity}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
