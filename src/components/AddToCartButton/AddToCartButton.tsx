import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { Context } from '../../context/Context';
import './AddToCartButton.scss';
import { ButtonType } from '../../types/ButtonType';

type Props = {
  product: Product;
  size: ButtonType;
};

export const AddToCartButton: React.FC<Props> = ({ product, size }) => {
  const { changeCart, cart } = useContext(Context);

  const isInCart = cart.length > 0
    ? cart.find(item => item.id === product?.id) : false;

  return (
    <button
      type="button"
      className={classNames(
        'button',
        `button--${size}`,
        {
          'button--selected': isInCart,
        },
      )}
      onClick={() => changeCart(product)}
    >
      {`${isInCart ? 'Added to cart' : 'Add to cart'}`}
    </button>
  );
};
