import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { Product } from 'src/types/Product';
import { HeartActiveIcon } from './Icons/HeartActiveIcon';
import { HeartIcon } from './Icons/HeartIcon';

enum ButtonStates {
  Added = 'Added to cart',
  NotAdded = 'Add to cart',
}

type Props = {
  product: Product,
  favourites: Product[],
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const AddButton: FC<Props> = ({
  product,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  const favouritesIds = favourites.map((el: Product) => el.id);
  const cartProductsIds = cartProducts.map((el: Product) => el.id);

  const isProductAddedToCart = cartProductsIds.includes(product.id);
  const isProductAddedTofav = favouritesIds.includes(product.id);

  const handleAddToFav = (favProduct: Product) => {
    setFavourites((prev: Product[]) => {
      return favouritesIds.includes(favProduct.id)
        ? prev.filter(el => el.id !== favProduct.id)
        : [...prev, favProduct];
    });
  };

  const handleAddToCart = (cartProduct: Product) => {
    setCartProducts((prev: Product[]) => {
      return cartProductsIds.includes(cartProduct.id)
        ? prev.filter(el => el.id !== cartProduct.id)
        : [...prev, cartProduct];
    });
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
    window.dispatchEvent(new Event('storage'));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    window.dispatchEvent(new Event('storage'));
  }, [cartProducts]);

  useEffect(() => {
    return () => {
      window.dispatchEvent(new Event('storage'));
    };
  }, []);

  return (
    <div className="specifications__buttons">
      <button
        type="button"
        className={classNames(
          'card__button--add-to-cart',
          'card__button',
          'specifications__button--add-to-cart',
          { 'card__button--add-to-cart--selected': isProductAddedToCart },
        )}
        onClick={() => handleAddToCart(product)}
      >
        {cartProductsIds.includes(product.id)
          ? ButtonStates.Added
          : ButtonStates.NotAdded}
      </button>

      <button
        type="button"
        data-cy="addToFavorite"
        className={classNames(
          'card__button--add-to-fav',
          'card__button',
          'specifications__button--add-to-fav',
        )}
        onClick={() => handleAddToFav(product)}
      >
        {isProductAddedTofav
          ? (
            <HeartActiveIcon />
          )
          : (
            <HeartIcon />
          )}
      </button>
    </div>
  );
};
