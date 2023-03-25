import { FC, useState, useContext } from 'react';
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
  const [handleChange, setHandleChange] = useState(false);

  const { id, price } = product;

  const isFavourites = favourites.includes(product.id);

  const handleFavourites = () => {
    let newFavourites = [];

    if (favourites.includes(product.id)) {
      newFavourites = favourites
        .filter((favourite: string) => favourite !== product.id);
    } else {
      newFavourites = [...favourites, product.id];
    }

    setFavourites(newFavourites);
    setHandleChange(!handleChange);
  };

  const handleCart = () => {
    let carts = [];

    if (cart.length) {
      carts = cart;
    }

    if (!carts.find((p: CardItem) => p.id === id)) {
      setCart([
        ...carts,
        {
          id,
          count: 1,
          price,
        },
      ]);
    } else {
      setCart([
        ...carts.filter((p: CardItem) => p.id !== id),
      ]);
    }

    setHandleChange(!handleChange);
  };

  return (
    <div className="product-card__buttons">
      <button
        className={classNames(
          'product-card__button product-card__button-cart',
          {
            'product-card__button-cart--active':
              cart.find((p: CardItem) => p.id === id),
          },
        )}
        type="button"
        onClick={handleCart}
      >
        Add to cart
      </button>
      <button
        className={classNames(
          'product-card__button product-card__button-favorite',
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
