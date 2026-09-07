import classNames from 'classnames';
import './ButtonsAddToCardFavorites.scss';
import { CartContext, FavoritesContext } from '../utils/contexts';
import { useContext } from 'react';
import { Product } from '../Types/products';

type Props = {
  product: Product;
};

export const ButtonsAddToCardFavorites = ({ product }: Props) => {
  const favoritesContext = useContext(FavoritesContext);
  const cartContext = useContext(CartContext);

  if (!favoritesContext || !cartContext) {
    return <p>Loading...</p>;
  }

  const { favorites, setFavorites } = favoritesContext;
  const { cart, setCart } = cartContext;

  const isFavorite = favorites.some(fav => fav.id === product.id);
  const isInCart = cart.some(cartProduct => cartProduct.id === product.id);

  const addToFavorites = () => {
    setFavorites(
      isFavorite
        ? favorites.filter(fav => fav.id !== product.id)
        : [...favorites, product],
    );
  };

  const addToCart = () => {
    if (isInCart) {
      setCart(cart.filter(cartProduct => cartProduct.id !== product.id));
    } else {
      const newProduct = { ...product, quantity: 1 };

      setCart([...cart, newProduct]);
    }
  };

  return (
    <div className="buttons-add-to-card-favorites">
      <button
        className={classNames(
          'buttons-add-to-card-favorites__button',
          'buttons-add-to-card-favorites__button-buy',
          { 'buttons-add-to-card-favorites__button-buy--active': isInCart },
        )}
        onClick={addToCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={classNames(
          'buttons-add-to-card-favorites__button',
          'buttons-add-to-card-favorites__button-wishlist',
          {
            'buttons-add-to-card-favorites__button-wishlist--active':
              isFavorite,
          },
        )}
        onClick={addToFavorites}
      ></button>
    </div>
  );
};
