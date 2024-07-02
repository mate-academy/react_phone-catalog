import classNames from 'classnames';
import './AddButtons.scss';
import { Product } from '../../../types/Product';
import { useContext } from 'react';
import { ProductContext } from '../Context/Context';

type Props = {
  product: Product;
};

export const AddButtons: React.FC<Props> = ({ product }) => {
  const { setLocalCart, setLocalFavourite, cart, favourite } =
    useContext(ProductContext);

  const isInCart = cart.some(good => good.id === product.id);
  const isInFavourite = favourite.some(good => good.id === product.id);

  const handleAddCart = (good: Product) => {
    setLocalCart(currentCart => [...currentCart, good]);
  };

  const handleHeartLike = (good: Product) => {
    if (isInFavourite) {
      return setLocalFavourite(currentLike => {
        return currentLike.filter(item => item.id !== product.id);
      });
    }

    setLocalFavourite(currentLike => [...currentLike, good]);
  };

  return (
    <div className="add-buttons">
      <button
        className={classNames('add-buttons__add-to-cart', {
          'add-buttons__add-to-cart--disabled': isInCart,
        })}
        onClick={() => handleAddCart(product)}
        disabled={isInCart}
      >
        {isInCart ? `Added` : `Add to cart`}
      </button>
      <button
        className={classNames('add-buttons__heart-like', {
          'add-buttons__heart-like--disabled': isInFavourite,
        })}
        onClick={() => handleHeartLike(product)}
      ></button>
    </div>
  );
};
