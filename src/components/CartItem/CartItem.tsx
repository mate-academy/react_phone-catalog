/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import classNames from 'classnames';
import { CartItem as TypeCartItem } from '../../types/CartItem';
import './cart-item.scss';
import { MainContext } from '../../context';
import { Product } from '../../types/Product';

type Props = {
  item: TypeCartItem,
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const {
    qnty,
    product,
  } = item;

  const {
    setCartItems,
  } = useContext(MainContext);

  const removeCartItem = (selectedItem: Product) => {
    setCartItems((prev) => prev.filter((
      itemCart,
    ) => itemCart.product !== selectedItem));
  };

  const updateItemQnty = (currentItem: TypeCartItem, operation: string) => {
    setCartItems((prevState) => {
      return prevState.map(prevItem => {
        if (prevItem.id !== currentItem.id) {
          return prevItem;
        }

        return {
          ...prevItem,
          qnty: operation === '-' ? prevItem.qnty - 1 : prevItem.qnty + 1,
        };
      });
    });
  };

  return (
    <>
      <button
        className="cross__icon icon"
        type="button"
        onClick={() => removeCartItem(product)}
      />
      <div className="item__image">
        <img
          src={`./${product.image}`}
          alt={product.name}
        />
      </div>
      <p className="item__title">{product.name}</p>
      <div className="item-counter">
        <button
          className={classNames(
            'minus-button button', { disabled: qnty === 1 },
          )}
          type="button"
          disabled={qnty === 1}
          onClick={() => updateItemQnty(item, '-')}
        >
          -
        </button>
        <p className="item__amount">{qnty}</p>
        <button
          className="plus-button button"
          type="button"
          onClick={() => updateItemQnty(item, '+')}
        >
          +
        </button>
      </div>
      <p className="total__price">{`${product.price}$`}</p>
    </>
  );
};
