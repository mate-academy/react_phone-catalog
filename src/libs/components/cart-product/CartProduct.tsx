import { useContext, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './styles.scss';

import {
  IMG_ROOT_PATH, ButtonViews, IconNames, IconColors,
} from '../../enums';
import {
  getCartItemWithUpdatedQuantity, getUpdatedListWithProduct,
} from '../../helpers';
import { ProductInCartType } from '../../types';
import { Button } from '../button/Button';
import { StateContext } from '../state-provider/state-context';

type Props = {
  productInCart: ProductInCartType,
};

export const CartProduct: React.FC<Props> = ({ productInCart }) => {
  const { pathname, search } = useLocation();
  const { cart, setCart } = useContext(StateContext);

  const {
    id, image, category, phoneId, price, quantity,
  } = productInCart;

  const productUrl = `/${category}/${phoneId}`;
  const productImgPath = `${IMG_ROOT_PATH}/${image}`;

  const handleRemove = useCallback(() => {
    const updatedCart = getUpdatedListWithProduct(cart, productInCart, true);

    setCart(updatedCart);
  }, [cart, productInCart, setCart]);

  const handleIncrease = useCallback(() => {
    const updatedCart = getCartItemWithUpdatedQuantity(cart, id, 1);

    setCart(updatedCart);
  }, [cart, id, setCart]);

  const handleDecrease = useCallback(() => {
    const updatedCart = getCartItemWithUpdatedQuantity(cart, id, -1);

    setCart(updatedCart);
  }, [cart, id, setCart]);

  return (
    <article className="cart-product">
      <Button
        data-cy="cartDeleteButton"
        view={ButtonViews.ICON}
        icon={IconNames.PLUS}
        iconOptions={{
          rotate: 45,
          color: IconColors.GREY,
          width: '20',
          height: '20',
        }}
        aria-label="Remove product from cart"
        onClick={handleRemove}
      />

      <Link
        to={productUrl}
        state={{ pathname, search }}
        className="cart__product-image-cnt"
      >
        <img
          className="cart__product-image"
          src={productImgPath}
          alt="Preview"
        />
      </Link>

      <Link
        to={productUrl}
        state={{ pathname, search }}
        className="cart__product-link"
      >
        {productInCart.name}
      </Link>

      <div className="cart__product-controls">
        <Button
          className="cart__product-controls-button"
          view={ButtonViews.ICON_BORDER}
          icon={IconNames.MINUS}
          iconOptions={{ color: IconColors.DARK_GREY }}
          onClick={handleDecrease}
          disabled={quantity === 1}
          aria-label="Decrease product quantity"
        />

        <div className="cart__product-controls-qty">
          {quantity}
        </div>

        <Button
          className="cart__product-controls-button"
          view={ButtonViews.ICON_BORDER}
          icon={IconNames.PLUS}
          iconOptions={{ color: IconColors.DARK_GREY }}
          onClick={handleIncrease}
          aria-label="Increase product quantity"
        />
      </div>

      <div className="cart__product-price">
        {`$${price}`}
      </div>

    </article>
  );
};
