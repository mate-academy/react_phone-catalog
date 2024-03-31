import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './CartItem.scss';
import { BASE_URL } from '../../helpers/constants';
import { CartContext } from '../../contexts/CartContext';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    id,
    itemId,
    category,
  } = product;

  const {
    cart,
    addToCart,
    deleteProduct,
    deleteProductCopy,
  } = useContext(CartContext);

  const amount = cart.filter(item => item.id === id).length;

  const handleDelete = () => {
    deleteProduct(id);
  };

  const handleDeleteCopy = () => {
    deleteProductCopy(id);
  };

  const handleAddCopy = () => {
    addToCart(product);
  };

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <div className="cart-item__top">
          <button
            type="button"
            className="cart-item__delete-button"
            onClick={handleDelete}
          >
            <div className="cart-item__delete-icon" />
          </button>
          <Link
            to={`/${category}/${itemId}`}
            className="cart-item__link"
          >
            <div className="cart-item__image-container">
              <img src={`${BASE_URL}${image}`} alt={name} className="cart-item__image" />
            </div>
            <p className="cart-item__title">{name}</p>
          </Link>
        </div>
        <div className="cart-item__bottom">
          <div className="cart-item__count">
            <button
              type="button"
              className={cn('cart-item__count-button', {
                'cart-item__count-button--disabled': amount <= 1,
              })}
              onClick={handleDeleteCopy}
              disabled={amount <= 1}
            >
              <div
                className={cn('icon', {
                  'icon--minus': amount > 1,
                  'icon--minus-disabled': amount <= 1,
                })}
              />
            </button>
            <p className="cart-item__count-text">
              {amount}
            </p>
            <button
              type="button"
              className="cart-item__count-button"
              onClick={handleAddCopy}
            >
              <div className="icon icon--plus" />
            </button>
          </div>
          <h3 className="cart-item__price">
            {`$${price}`}
          </h3>
        </div>
      </div>
    </div>
  );
};
