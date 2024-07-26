import React, { useContext } from 'react';
import { Product } from '../../shared/types/Product';
import { closeImg } from '../../utils/kit';
import { ActionContext } from '../../shared/Context/ActionContext';
import classNames from 'classnames';
import './CartItem.scss';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { handleAction, cartProducts } = useContext(ActionContext);

  const { id, itemId, name, image, price } = product;

  const quantity = cartProducts.find(p => p.id === id)?.count || 1;
  const fullPrice = price * quantity;

  const addClick = () => {
    handleAction(product, 'plus');
  };

  const removeClick = () => {
    handleAction(product, 'minus');
  };

  const removeProduct = (p: Product) => {
    handleAction(p, 'removeFromCart');
  };

  return (
    <div key={itemId} className="item">
      <div className="item-firstRow">
        <button
          className="item-btnRemove"
          type="button"
          onClick={() => removeProduct(product)}
        >
          <img src={closeImg} alt="Delate" className="item-btnRemove-img" />
        </button>
        <div className="item-images">
          <img src={image} alt={name} className="item-images-img" />
        </div>
        <div className="item-title">{name}</div>
      </div>

      <div className="item-secondRow">
        <div className="item-btn">
          <button
            type="button"
            onClick={removeClick}
            disabled={quantity === 1}
            className={classNames('item-btn-quantity', {
              ['item-btn-quantity-isDisabled']: quantity === 1,
            })}
          >
            <div
              className={classNames('icon', {
                'icon--minus': quantity >= 1,
                'icon--minus--disabled': quantity === 1,
              })}
            ></div>
          </button>

          <p className="item-btn-count">{quantity}</p>
          <button
            type="button"
            onClick={addClick}
            className="item-btn-quantity"
          >
            <div className="icon icon--plus"></div>
          </button>
        </div>
        <h3 className="item-price">{`$${fullPrice}`}</h3>
      </div>
    </div>
  );
};
