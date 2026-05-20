import fav from '../../images/fav/Icons/Favourites (Heart Like).svg';
import { useCart } from '../../Context/Context';
import { Products } from '../../types/Products';
import classNames from 'classnames';
import { useFav } from '../../Context/FavouritesContext';
import activeFav from '../../images/icons/ActiveFav.svg';
import React from 'react';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToFav, removeFromFav, isInFav } = useFav();
  const addedFav = isInFav(String(product.id));

  const { addToCart, isInCart, removeFromCart } = useCart();
  const added = isInCart(String(product.id));
  const buttonClass = classNames('products-cart', {
    'products-cart-active': added,
  });

  return (
    <div className="page__models-buttons">
      <button
        type="button"
        className={buttonClass}
        onClick={e => {
          e.preventDefault();
          if (added) {
            removeFromCart(String(product.id));
          } else {
            addToCart(product);
          }
        }}
      >
        <span className="products-cart__link">
          <p className="products-cart__text">
            {added ? 'Added' : 'Add to cart'}
          </p>
        </span>
      </button>

      <button
        className={
          addedFav ? `products-fav-active products-fav` : `products-fav`
        }
        onClick={e => {
          e.preventDefault();
          if (addedFav) {
            removeFromFav(String(product.id));
          } else {
            addToFav(product);
          }
        }}
      >
        {addedFav ? (
          <img className="products-fav__img" src={activeFav} alt="Favourites" />
        ) : (
          <img className="products-fav__img" src={fav} alt="Favourites" />
        )}
      </button>
    </div>
  );
};
