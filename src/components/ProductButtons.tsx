import { useContext } from 'react';
import classNames from 'classnames';
import { CartContext } from '../context/CartProvider';
import { FavoritesContext } from '../context/FavoritesProvider';
import PrimaryButton from './PrimaryButton';
import SquareButton from './SquareButton';
import { ReactComponent as Liked }
  from '../assets/images/icons/liked-icon.svg';
import { ReactComponent as NotLiked }
  from '../assets/images/icons/notLiked-icon.svg';

type Props = {
  id: string;
  bigSize?: boolean;
};

const ProductButtons: React.FC<Props> = ({ id, bigSize = false }) => {
  const {
    getItemQuantity,
    removeFromCart,
    increaseQuantity,
  } = useContext(CartContext);

  const {
    favorites,
    addInFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const itemQuantity = getItemQuantity(id);

  const handleCart = () => {
    if (itemQuantity) {
      removeFromCart(id);
    } else {
      increaseQuantity(id);
    }
  };

  const handleFaforites = () => {
    if (favorites.includes(id)) {
      removeFromFavorites(id);
    } else {
      addInFavorites(id);
    }
  };

  return (
    <div className="card__button-container">
      <PrimaryButton
        OnClick={handleCart}
        classModificator={classNames({
          'primary-button--selected': itemQuantity,
          'primary-button--large': bigSize,
        })}
      >
        Add to cart
      </PrimaryButton>
      <SquareButton
        OnClick={handleFaforites}
        classModificator={classNames(
          {
            'primary-button--selected': itemQuantity,
            'square-button--l': bigSize,
            'square-button--m': !bigSize,

          },
        )}
      >
        {favorites.includes(id) ? <Liked /> : <NotLiked />}
      </SquareButton>
    </div>
  );
};

export default ProductButtons;
