/* eslint-disable max-len */
import { useContext, useMemo } from 'react';
import cn from 'classnames';
import { MainContext } from '../../../context/MainContext';
import { CartItem as Item } from '../../../types/CartItem';

interface Props {
  item: Item;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { setCartItems } = useContext(MainContext);
  const { product } = item;

  const removeItem = (currentItem: Item) => {
    return setCartItems((prevState) => {
      return prevState.filter((prevItem) => prevItem.id !== currentItem.id);
    });
  };

  const updateItem = (currentItem: Item, type: string) => {
    setCartItems((prevState) => {
      return prevState.map((prevItem) => {
        if (prevItem.id !== currentItem.id) {
          return prevItem;
        }

        return {
          ...prevItem,
          quantity:
            type === 'minus' ? prevItem.quantity - 1 : prevItem.quantity + 1,
        };
      });
    });
  };

  const totalItemPrice = useMemo(() => {
    return item.quantity * product.price;
  }, [item]);

  return (
    <div className="cart__item">
      <div className="cart__left">
        <button
          type="button"
          className="cart__close"
          data-cy="cartDeleteButton"
          onClick={() => removeItem(item)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
          </svg>
        </button>

        <div className="cart__imgs">
          <picture>
            <img
              className="cart__img"
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </picture>
        </div>

        <div className="text cart__name">{product.name}</div>
      </div>

      <div className="cart__right">
        <div className="cart__navigation">
          <button
            type="button"
            className={cn('cart__btn cart__btn--minus', {
              'cart__btn--disabled': item.quantity === 1,
            })}
            onClick={() => updateItem(item, 'minus')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" />
            </svg>
          </button>
          <span className="text cart__quantity" data-cy="productQauntity">
            {item.quantity}
          </span>
          <button
            type="button"
            className="cart__btn cart__btn--plus"
            onClick={() => updateItem(item, 'plus')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" />
            </svg>
          </button>
        </div>

        <h2 className="h2 cart__price">{`$${totalItemPrice}`}</h2>
      </div>
    </div>
  );
};
