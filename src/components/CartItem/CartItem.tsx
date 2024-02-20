/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { CartContext } from '../../store/CartContext';
import { Product } from '../../types/Product';

import './CartItem.scss';
import { BASE_URL } from '../../utils/constants';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(() => {
    const count = productsInCart.find(elem => elem.id === product.id)?.quantity || 1;

    return count;
  });

  const {
    name, itemId, image, id,
  } = product;

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);

    const newList = productsInCart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity + 1 };
      }

      return item;
    });

    setProductsInCart(newList);
  };

  const handleDecreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(prev => prev - 1);
    }

    const newList = productsInCart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity - 1 };
      }

      return item;
    });

    setProductsInCart(newList);
  };

  const handleDeleteProduct = () => {
    const newList = productsInCart.filter(item => item.id !== id);

    setProductsInCart(newList);
  };

  if (!productsInCart.length) {
    return (
      <h2>Your cart is empty</h2>
    );
  }

  return (
    <article className="cart-item">
      <div className="cart-item__container">
        <div className="cart-item__product">
          <button
            data-cy="cartDeleteButton"
            type="button"
            className="button-icon button-icon--item-close"
            onClick={handleDeleteProduct}
          />

          <Link to={`/phones/${itemId}`} className="cart-item__image-link">
            <img
              src={`${BASE_URL}/${image}`}
              alt={name}
              className="cart-item__image"
            />
          </Link>

          <Link to={`/phones/${itemId}`} className="cart-item__name">
            {name}
          </Link>
        </div>

        <div className="cart-item__amount">
          <div className="cart-item__buttons">
            <button
              type="button"
              className={classNames('cart-item__button', {
                'cart-item__button--disabled cart-item__button--disabled-minus': quantity === 1,
                'cart-item__button--minus': quantity > 1,
              })}
              onClick={handleDecreaseQuantity}
              disabled={quantity === 1}
            />

            <p data-cy="productQauntity">{quantity}</p>

            <button
              type="button"
              className="cart-item__button cart-item__button--plus"
              onClick={handleIncreaseQuantity}
            />
          </div>

          <p className="cart-item__price">
            {`$${product.price * quantity}`}
          </p>
        </div>
      </div>
    </article>
  );
};
