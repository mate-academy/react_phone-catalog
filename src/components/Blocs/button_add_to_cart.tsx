import { useState, useContext } from 'react';
import classNames from 'classnames';
import { Context } from '../context';
import { ProductType } from '../../types/Product';

type Props = {
  product: ProductType | undefined
};

export const ButtonAddToCart: React.FC<Props> = ({ product }) => {
  const {
    cart,
    setCart,
  } = useContext(Context);

  const [
    buttonCard,
    setButtonCard,
  ] = useState(cart?.some(productItem => productItem.id === product?.id));

  return product ? (
    <button
      type="button"
      className={classNames(
        'card__button',
        'card__button--add_to_cart',
        { 'card__button--active_to_cart': buttonCard },
      )}
      onClick={() => {
        if (cart && !cart.some(productItem => productItem.id === product.id)) {
          localStorage.setItem('cart', JSON.stringify([...cart, product]));
          setCart([...cart, product]);
          setButtonCard(true);
        } else if (!cart?.length) {
          localStorage.setItem('cart', JSON.stringify([product]));
          setCart([product]);
          setButtonCard(true);
        }
      }}
    >
      Add to cart
    </button>
  ) : (<h2>no product</h2>);
};
