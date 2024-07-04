import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../types/Product';
import classNames from 'classnames';

type Props = {
  parentClassName?: string;
  price: number;
  cartItem: Product & { count: number };
};

export const CartProductCard: React.FC<Props> = ({
  cartItem,
  price,
  parentClassName = '',
}) => {
  const { cart, setCart } = useContext(CartContext);
  const { count, id, name, images } = cartItem;
  const image = images[0];

  const handleDelete = () => {
    setCart(cart.filter(crt => crt.id !== id));
  };

  const handleAdd = () => {
    const clearCart = cart.filter(crt => crt.id !== id);

    setCart([...clearCart, { ...cartItem, count: count + 1 }]);
  };

  const handleRemove = () => {
    const clearCart = cart.filter(crt => crt.id !== id);

    setCart([...clearCart, { ...cartItem, count: count - 1 }]);
  };

  return (
    <div
      className={classNames('cart-product-card', {
        [`${parentClassName}__cart-product-card`]: parentClassName,
      })}
    >
      <div className="cart-product-card__first-block">
        <div onClick={handleDelete} className="cart-product-card__delete"></div>
        <img
          className="cart-product-card__image"
          src={`${process.env.PUBLIC_URL}/${image}`}
          alt="product"
        />
        <p className="cart-product-card__title body-text">{name}</p>
      </div>
      <div className="cart-product-card__second-block">
        <div className="cart-product-card__count-block">
          <button
            onClick={handleRemove}
            className="cart-product-card__decrease"
            disabled={count <= 1}
          >
            -
          </button>
          <p className="cart-product-card__count body-text">{count}</p>
          <button
            disabled={count >= 100}
            onClick={handleAdd}
            className="cart-product-card__increase"
          >
            +
          </button>
        </div>
        <h3 className="cart-product-card__price">{price}$</h3>
      </div>
    </div>
  );
};
