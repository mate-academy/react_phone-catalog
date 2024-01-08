import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  removeFromCart,
  plusProduct,
  minusProduct,
} from '../../features/cartItemsSlice';
import { useAppDispatch } from '../../app/hooks';
import { getProductDiscount } from '../../utils/getProductDiscount';
import { CartItemType } from '../../types/CartItem';

import './CartItem.scss';

type Props = {
  cartItem: CartItemType
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const dispath = useAppDispatch();

  const { id, product, quantity } = cartItem;

  const { type: productType, id: productID } = product;

  const productDetailsPath = `/${productType}s/${productID}`;

  const discountPrice = useMemo(() => {
    return getProductDiscount(product);
  }, [product]);

  return (
    <>
      <div className="CartItem-Left">
        <button
          className="CartItem-IconDelete Icon Icon_delete"
          data-cy="cartDeleteButton"
          type="button"
          aria-label="delete button"
          onClick={() => dispath(removeFromCart(id))}
        />

        <Link
          className="CartItem-LinkImage"
          to={productDetailsPath}
        >
          <img
            className="CartItem-Image"
            src={product.imageUrl}
            width={66}
            height={66}
            alt="product"
          />
        </Link>

        <Link
          className="CartItem-LinkTitle"
          to={productDetailsPath}
        >
          <h2 className="CartItem-CartTitle">
            {product.name}
          </h2>
        </Link>
      </div>

      <div className="CartItem-Right">
        <div className="CartItem-Counter">
          <button
            className="CartItem-Icon Icon Icon_minus"
            type="button"
            aria-label="minus button"
            disabled={quantity === 1}
            onClick={() => dispath(minusProduct(id))}
          />

          <span className="CartItem-Total">{quantity}</span>

          <button
            className="CartItem-Icon Icon Icon_plus"
            type="button"
            aria-label="plus button"
            onClick={() => dispath(plusProduct(id))}
          />
        </div>

        <span className="CartItem-Price">
          {discountPrice !== product.price
            ? `$${discountPrice * quantity}`
            : `$${product.price * quantity}`}
        </span>
      </div>
    </>
  );
};
