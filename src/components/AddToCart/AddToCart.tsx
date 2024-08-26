import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

type Props = {
  className?: string;
  product: ProductType;
};

export const AddToCart: React.FC<Props> = ({ className = '', product }) => {
  const { cartItems, addItem } = useContext(AppContext);
  const isExistingInCart = cartItems.find(item => item.id === product.id);

  return (
    <button
      className={classNames(`${className} button add-to-cart`.trim(), {
        'add-to-cart--added': isExistingInCart,
      })}
      type="button"
      onClick={() => addItem(product, 'cart')}
      disabled={isExistingInCart && true}
    >
      {isExistingInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
