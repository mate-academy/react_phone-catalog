import React, { useContext } from 'react';
// import { CartItem as CartItemType } from 'types/CartItem';
import { ProductPreview } from 'types/ProductPreview';
import cartItemStyle from './CartItem.module.scss';
import { CartContext } from '../../../../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  cartItem: ProductPreview;
  productQuantity: number;
};

export const CartItem: React.FC<Props> = ({ cartItem, productQuantity }) => {
  const { deleteItem, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const itemId = cartItem.id.toString();

  const totalCostOfItem = cartItem.price * productQuantity;

  const pathToProduct = `/${cartItem.category}/${cartItem.itemId}`;

  return (
    <div className={cartItemStyle['cart-item']}>
      <div
        className={`${cartItemStyle['cart-item__container']} ${cartItemStyle['cart-item__container__info']}`}
      >
        <button
          className={`${cartItemStyle['cart-item__button']} ${cartItemStyle['cart-item__button--delete']}`}
          onClick={() => deleteItem(itemId)}
        ></button>
        <Link to={pathToProduct}>
          <img
            src={cartItem.image}
            alt="Phone image"
            className={cartItemStyle['cart-item__image']}
          />
        </Link>
        <Link to={pathToProduct}>
          <span className={cartItemStyle['cart-item__name']}>
            {cartItem.name}
          </span>
        </Link>
      </div>
      <div className={cartItemStyle['cart-item__buttons']}>
        <button
          className={`${cartItemStyle['cart-item__button']} ${cartItemStyle['cart-item__button--decrease']} ${productQuantity === 1 ? cartItemStyle['cart-item__button--decrease--disabled'] : ''}`}
          onClick={() => decreaseQuantity(itemId)}
          disabled={productQuantity === 1}
        ></button>
        <span className={cartItemStyle['cart-item__buttons__quantity']}>
          {productQuantity}
        </span>
        <button
          className={`${cartItemStyle['cart-item__button']} ${cartItemStyle['cart-item__button--increase']}`}
          onClick={() => increaseQuantity(itemId)}
        ></button>
      </div>
      <span
        className={cartItemStyle['cart-item__price']}
      >{`$${totalCostOfItem}`}</span>
    </div>
  );
};
