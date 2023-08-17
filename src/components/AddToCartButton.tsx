import classNames from 'classnames';
import { useState } from 'react';
import { cartListAdded, checkIsSelected } from '../helpers/cartTab';

type Props = {
  id: string,
  bigButton?:boolean,
};

export const AddToCartButton: React.FC<Props> = ({
  id,
  bigButton,
}) => {
  const [
    isInCart,
    setIsInCart,
  ] = useState<boolean>(checkIsSelected(id));
  const handleAddToCart = () => {
    setIsInCart(true);
    cartListAdded(id);
  };

  return (
    <button
      className={classNames('button', {
        active: isInCart,
        'button--big': bigButton,
      })}
      onClick={handleAddToCart}
      type="button"
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
