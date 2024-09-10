import { Link, useLocation } from 'react-router-dom';

import { removeFromCart, addToCart } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { Button } from '../Button';

import { Product } from '../../types/Product';

import styles from './CartItem.module.scss';
const {
  item,
  item__row,
  item__img,
  item__link,
  item__counter,
  item__amount,
  item__cost,
} = styles;

type CartItemProps = {
  product: Product;
};

export const CartItem = ({ product }: CartItemProps) => {
  const pathname = useLocation().pathname;

  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  // #region handler functions
  const deleteProduct = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  const addProduct = (product: Product) => {
    dispatch(addToCart(product));
  };
  // #endregion

  const currentItem = cartItems.find((item) => item.product.id === product.id);

  if (!currentItem) {
    return;
  }

  const productCost = currentItem.product.fullPrice * currentItem.quantity;
  const productPageUrl = `/catalog/${product.category}/${product.itemId}`;

  const isInCart = pathname.startsWith('/user/cart');
  const minusButtonDisabled = currentItem.quantity === 1;

  return (
    <div className={item}>
      <div className={item__row}>
        <Button
          bgImg={'/icons/icon-close.svg'}
          action={() => deleteProduct(product.id)}
          disabled={false}
          additionalStyles={{
            borderColor: 'transparent',
            opacity: '50%',
            padding: '0',
          }}
        />

        <Link
          to={productPageUrl}
          className={item__link}
          state={isInCart && { from: 'user', previousPath: pathname }}
        >
          <img
            src={`/${product.image}`}
            alt={`${product.name} image`}
            className={item__img}
          />
          <p>{product.name}</p>
        </Link>
      </div>

      <div className={item__row}>
        <div className={item__counter}>
          <Button
            bgImg={'/icons/icon-minus.svg'}
            disabled={minusButtonDisabled}
            action={() => deleteProduct(product.id)}
          />

          <p className={item__amount}>{currentItem.quantity}</p>

          <Button
            bgImg={'/icons/icon-plus.svg'}
            disabled={false}
            action={() => addProduct(product)}
            additionalStyles={{ borderColor: '#B4BDC3' }}
          />
        </div>

        <span className={item__cost}>{`$${productCost}`}</span>
      </div>
    </div>
  );
};
