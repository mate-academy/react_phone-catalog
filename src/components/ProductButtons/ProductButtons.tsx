import { FC, useContext } from 'react';
import classNames from 'classnames';
import { CartContext } from '../../helpers/CartProvider';
import { FavouritesContext } from '../../helpers/FavouritesProvider';
import { Like } from '../Like/Like';
import { LikeActive } from '../Like/LikeActive';
import { Product } from '../../types/Product';
import { CardItem } from '../../types/CardItem';

type Props = {
  product: Product;
};

export const ProductButtons: FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const { id, price } = product;

  const isFavourites = favourites.includes(id);
  const isCart = cart.find((p: CardItem) => p.id === id);

  const handleFavourites = () => {
    if (isFavourites) {
      setFavourites((prevFavourites: string[]) => [
        ...prevFavourites.filter((favourite: string) => favourite !== id),
      ]);
    } else {
      setFavourites((prevFavourites: string[]) => [
        ...prevFavourites,
        product.id,
      ]);
    }
  };

  const handleCart = () => {
    if (!isCart) {
      setCart(prevCart => [
        ...prevCart,
        {
          id,
          count: 1,
          price,
        },
      ]);
    } else {
      setCart(prevCart => [
        ...prevCart.filter((p: CardItem) => p.id !== id),
      ]);
    }
  };

  return (
    <div className="product-card__buttons">
      <button
        className={classNames(
          'product-card__button',
          'product-card__button-cart',
          { 'product-card__button-cart--active': isCart },
        )}
        type="button"
        onClick={handleCart}
      >
        Add to cart
      </button>
      <button
        className={classNames(
          'product-card__button',
          'product-card__button-favorite',
          { 'product-card__button-favorite--active': isFavourites },
        )}
        type="button"
        data-cy="addToFavorite"
        onClick={handleFavourites}
      >
        <Like />

        <LikeActive />
      </button>
    </div>
  );
};
