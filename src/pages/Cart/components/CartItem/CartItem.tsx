/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { AddItems } from '../AddItems';
import './CartItem.scss';
import { useCart } from '../../../../context/cartContext';
import { CartProduct } from '../../../../types/CartProduct';

type Props = {
  product: CartProduct,
};

export const CartItem: React.FC<Props> = ({
  product,
}) => {
  const { cart, addToCart } = useCart();

  const handleDeleteItem = () => {
    const newItems = cart.filter(item => item.itemId !== product.itemId);

    addToCart(newItems);
  };

  return (
    <>
      {product && (
        <div className="cart-item">
          <button
            type="button"
            className="cart-item__btn"
            onClick={handleDeleteItem}
            data-cy="cartDeleteButton"
          />

          <img
            alt={product?.name}
            src={product?.image}
            className="cart-item__img"
          />

          <Link
            to={`/phones/${product.phoneId}`}
            className="cart-item__link"
          >
            <h2
              className="cart-item__title"
            >
              {product.name}
            </h2>
          </Link>

          <div className="cart-item__add-items-container">
            <AddItems
              product={product}
            />
          </div>

          <p className="cart-item__price">{`${product.price}$`}</p>
        </div>
      )}
    </>
  );
};
