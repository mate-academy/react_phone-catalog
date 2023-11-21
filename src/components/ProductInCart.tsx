import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Action, useCartContext } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import './ProductInCart.scss';

type Props = {
  cart: CartItem;
};

export const ProductInCart: React.FC<Props> = (
  { cart: { product, quantity } },
) => {
  const { removeFromCart, changeQuantity } = useCartContext();

  return (
    <div className="product-in-cart">
      <div className="product-in-cart__left">
        <button
          type="button"
          className="product-in-cart__remove"
          aria-label="remove button"
          data-cy="cartDeleteButton"
          onClick={() => removeFromCart(product.itemId)}
        />

        <Link to={product.itemId} className="product-in-cart__link">
          <img
            src={product.image}
            alt={product.name}
            className="product-in-cart__img"
          />

          <h2 className="product-in-cart__title">
            {product.name}
          </h2>
        </Link>

      </div>

      <div className="product-in-cart__right">
        <div className="product-in-cart__quantity-box">
          <button
            type="button"
            className={classNames(
              'product-in-cart__icon product-in-cart__icon--desc',
              { 'product-in-cart__icon--disable': quantity === 1 },
            )}
            aria-label="desc button"
            onClick={() => changeQuantity(product.itemId, Action.desc)}
          />

          <div
            className="product-in-cart__quantity"
            data-cy="productQauntity"
          >
            {quantity}
          </div>

          <button
            type="button"
            className={classNames(
              'product-in-cart__icon product-in-cart__icon--inc',
              { 'product-in-cart__icon--disable': quantity >= 10 },
            )}
            aria-label="inc button"
            onClick={() => changeQuantity(product.itemId, Action.inc)}
          />
        </div>

        <div className="product-in-cart__price">
          {`$${product.price}`}
        </div>
      </div>
    </div>
  );
};
