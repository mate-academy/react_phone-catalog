import './CartItem.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartContext } from '../../contexts/CartContext';

interface Props {
  product: Product;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    getNumberOfCopies,
    deleteById,
    addCopy,
    deleteCopy,
  } = useContext(CartContext);
  const copies = getNumberOfCopies(product.id);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteById(product.id);
  };

  const handlePlus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addCopy(product);
  };

  const handleMinus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteCopy(product.id);
  };

  return (
    <Link
      to={`/phones/${product.itemId}`}
      className="cart-item"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className="cart-item__button-close"
        type="button"
        onClick={handleDelete}
      >
        <i className="icon icon--close-grey cart-item__icon--close" />
      </button>

      <img
        className="cart-item__image"
        src={`/_new/${product.image}`}
        alt="phone"
      />

      <p
        className="cart-item__name"
      >
        {product.name}
      </p>

      <div className="cart-item__actions">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className={classNames('button cart-item__button', {
            'button--disabled': copies === 1,
          })}
          onClick={handleMinus}
        >
          <i className={classNames('icon', {
            'icon--minus-grey': copies === 1,
            'icon--minus': copies > 1,
          })}
          />
        </button>

        <p className="cart-item__quantity">{copies}</p>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="button cart-item__button"
          onClick={handlePlus}
        >
          <i className="icon icon--plus" />
        </button>
      </div>

      <h2 className="cart-item__price">{`$${product.price}`}</h2>
    </Link>
  );
};
