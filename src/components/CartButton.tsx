import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Product } from '../types/Product';
import { Context } from '../contexts/Context';
import { CartProduct } from '../types/CartProduct';

type Props = {
  product: Product,
};

export const CartButton: FC<Props> = ({ product }) => {
  const {
    cart,
    toggleCart,
  } = useContext(Context);

  const foundProduct = cart.find((cartList: CartProduct) => (
    cartList.item.id === product.id));

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-cart', {
          'products-slider__item-button-cart--active':
          foundProduct,
        },
      )}
      type="button"
      onClick={() => toggleCart(product)}
    >
      {foundProduct && (
        'Added to cart'
      )}
      {!foundProduct && (
        'Add to cart'
      )}
    </button>
  );
};
