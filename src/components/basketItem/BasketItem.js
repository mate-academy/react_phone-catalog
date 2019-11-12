import React from 'react';
import './BasketItem.css';
import { Button } from 'semantic-ui-react';
import { BASE_NAME } from '../../params';

const BasketItem = ({ basketItem, increaseQuantity, reduceQuantity, removeItem }) => {
  const { phone, quantity } = basketItem;

  return (
    <div className="basketItem">
      <div className="basketItem__info">
        <img src={`${BASE_NAME}/${phone.imageUrl}`} alt={phone.name} className="basketItem__img" />
        <div className="basketItem__content">
          <h4>
            {phone.name}
          </h4>
          <p>{phone.snippet}</p>
        </div>
      </div>
      <div className="quantityBlock">
        <h4>{`Quantity: ${quantity}`}</h4>
        <Button data-id={basketItem.id} onClick={reduceQuantity}>-</Button>
        <Button data-id={basketItem.id} onClick={increaseQuantity}>+</Button>
        <Button data-id={basketItem.id} onClick={removeItem}>X</Button>
      </div>
    </div>
  );
};

export default BasketItem;
