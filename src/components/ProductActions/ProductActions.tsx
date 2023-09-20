import { useContext } from 'react';
import classnames from 'classnames';
import { Product } from '../../types/Product';

import './ProductActions.scss';
import { CartContext } from '../../contexts/CartContext';
import { FavsContext } from '../../contexts/FavsContext';

export type Props = {
  product: Product;
};

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { favs, setFavs } = useContext(FavsContext);
  const isInCart = cart.some(item => item.id === product.id);

  const isInFavs = favs.some(item => item.id === product.id);

  const handleCartClick = () => {
    if (!isInCart) {
      setCart([...cart, { ...product }]);
    } else {
      setCart(cart.filter(item => item.id !== product.id));
    }
  };

  const handleFavClick = () => {
    if (!isInFavs) {
      setFavs([...favs, { ...product }]);
    } else {
      setFavs(favs.filter(item => item.id !== product.id));
    }
  };

  return (
    <div className="ProductActions">
      <button
        type="button"
        className={classnames(
          'ProductActions__cart-button',
          { 'ProductActions__cart-button--in-cart ': isInCart },
        )}
        onClick={handleCartClick}
      >
        {`${isInCart ? 'Added' : 'Add'} to cart`}
      </button>
      <button
        type="button"
        data-cy="addToFavorite"
        className={classnames(
          'ProductActions__fav-button',
          { 'ProductActions__fav-button--in-favs': isInFavs },
        )}
        onClick={handleFavClick}
      >
        {' '}
      </button>
    </div>
  );
};
