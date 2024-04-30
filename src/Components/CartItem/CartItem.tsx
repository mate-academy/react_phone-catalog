import React, { useContext } from 'react';
import { Product } from '../../Types/Product';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';

import './CartItem.scss';
import { CartContext } from '../../Contexts/CartContext';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { image, name, price, id, itemId, category } = product;

  const { cart, addToCart, deleteProduct, deleteProductCopy } =
    useContext(CartContext);

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
      <div className="cart-item__top">
        <Button icon="close" onClick={handleDelete}>
          <i className="icon icon--close--disabled"></i>
        </Button>

        <Link to={`${category}/${itemId}`} className="cart-item__link">
          <div className="cart-item__image-container">
            <img
              src={`${LOCAL_URL}${image}`}
              alt={name}
              className="cart-item__image"
            />
          </div>

          <p className="cart-item__title">{name}</p>
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__count">
          <Button
            icon="count"
            onClick={handleDeleteCopy}
            disabled={amount <= 1}
          >
            <i
              className={classNames('icon icon--minus', {
                'icon--minus--disabled': amount <= 1,
              })}
            ></i>
          </Button>

          <p className="cart-item__count-text">{amount}</p>

          <Button icon="count" onClick={handleAddCopy}>
            <i className="icon icon--plus"></i>
          </Button>
        </div>

        <h3 className="cart-item__price">{`$${price}`}</h3>
      </div>
    </div>
  );
};
