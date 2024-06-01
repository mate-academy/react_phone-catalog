import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './CartItem.scss';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../../context/CatalogContext';
import { CartProduct, Operation } from '../../../types';
import { Images } from '../../../images';
import * as Service from '../../../utils/service';

type Props = {
  cartProduct: CartProduct;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { addProductToCart, cart } = useContext(CatalogContext);
  const { quantity, product } = cartProduct;
  const { name, image, price, category, itemId } = product;
  const [itemIsDeleted, setItemIsDeleted] = useState(false);

  const handleDeleteItem = () => {
    setItemIsDeleted(true);

    if (cart.length === 1) {
      addProductToCart(cartProduct);
    } else {
      setTimeout(() => addProductToCart(cartProduct), 300);
    }
  };

  return (
    <article
      className={classNames('cart-item', {
        'cart-item__deleted': itemIsDeleted,
      })}
    >
      <div className="cart-item__imageBlock">
        <img
          src={Images.Button.Close}
          alt="closeImg"
          className="cart-item__imageBlock--close"
          onClick={handleDeleteItem}
        />

        <Link
          to={`/${category}/${itemId}`}
          className="cart-item__imageBlock--link"
          onClick={() => Service.scrollWindowTop()}
        >
          <img
            src={image}
            alt="cartProductImg"
            className="cart-item__imageBlock--photo"
          />

          <p className="body-text cart-item__imageBlock--name">{name}</p>
        </Link>
      </div>

      <div className="cart-item__priceBlock">
        <div className="cart-item__priceBlock--quantityBlock">
          <button
            className={classNames('button', {
              button__disabled: quantity === 1,
            })}
            disabled={quantity === 1}
            onClick={() => addProductToCart(cartProduct, Operation.Minus)}
          >
            <img src={Images.Operation.Minus} alt="minusImg" />
          </button>

          <p className="body-text cart-item__priceBlock--quantity">
            {quantity}
          </p>

          <button
            className="button"
            onClick={() => addProductToCart(cartProduct, Operation.Plus)}
          >
            <img src={Images.Operation.Plus} alt="plusImg" />
          </button>
        </div>

        <h3 className="cart-item__priceBlock--price">{`$${price * quantity}`}</h3>
      </div>
    </article>
  );
};
