import classNames from 'classnames';
import { FC } from 'react';
import { CardItem } from '../../types/CardItem';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  cart: CardItem[];
  deleteCart: (product: Product) => void;
  decreaseCountCart: (product: Product) => void;
  increaseCountCart: (product: Product) => void;
};

export const CartItem: FC<Props> = ({
  product,
  cart,
  deleteCart,
  decreaseCountCart,
  increaseCountCart,
}) => {
  const cartItem = cart.find((p: CardItem) => p.id === product.id);

  return (
    <div className="cart__item">
      <button
        type="button"
        className="cart__item-delete-btn"
        onClick={() => deleteCart(product)}
      >
        x
      </button>

      <img src={`new/${product.image}`} alt="#" className="cart__item-image" />
      <h2 className="cart__item-title">{product.name}</h2>
      <div className="cart__item-counter">
        <button
          type="button"
          className={classNames(
            'cart__item-count-btn',
            {
              'cart__item-count-btn--active':
                cart.find((p: CardItem) => p.id === product.id),
            },
          )}
          onClick={() => decreaseCountCart(product)}
        >
          -
        </button>

        {cartItem?.count}
        <button
          type="button"
          className="
              cart__item-count-btn
              cart__item-count-btn--active
            "
          onClick={() => increaseCountCart(product)}
        >
          +
        </button>
        <p className="cart__item-price">{`$${product.price}`}</p>
      </div>
    </div>
  );
};
