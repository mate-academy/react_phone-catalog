import { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

// Styles
import './CardButtons.scss';

// Contexts
import { FavouritesContext } from '../../contexts/FavoritesProvider';
import { CartContext } from '../../contexts/CartProvider';

// Components
import { PrimaryButton } from '../PrimaryButton';
import { Button } from '../Button';

type Props = {
  size: 'big' | 'small'
  id: string;
};

export const CardButtons: FunctionComponent<Props> = ({ id, size }) => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const handleFavourites = () => {
    let newFavourites = [];

    if (favourites.includes(id)) {
      newFavourites = favourites.filter((favourite: string) => favourite !== id);
    } else {
      newFavourites = [...favourites, id];
    }

    setFavourites(newFavourites);
  };

  const handleCart = () => {
    let newCart = [];

    if (cart.includes(id)) {
      newCart = cart.filter((cartItem: string) => cartItem !== id);
    } else {
      newCart = [...cart, id];
    }

    setCart(newCart);
  };

  return (
    <div className={classNames('CardButtons', {
      'CardButton--big': size === 'big',
    })}
    >
      <PrimaryButton
        selected={cart.includes(id)}
        callback={handleCart}
      >
        {cart.includes(id) ? 'Added to cart' : 'Add to cart'}
      </PrimaryButton>

      <Button
        disablet={false}
        classModificator={classNames('Button--heart', {
          'Button--heartSelected': favourites.includes(id),
        })}
        callback={handleFavourites}
      />
    </div>
  );
};
