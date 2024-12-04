import './Gadgets.scss';
import './UnderNav.scss';
import '../App.scss';
import { CartContext, FavoritesContext } from './AppProvaider';
import FavoriteAdd from '../img/Favorite-add.svg';
import FavoriteAddActive from '../img/Favorite-add-active.svg';
import Home from '../img/Home.svg';
import { useContext } from 'react';
import { CartContextType, FavoritesContextType, Product } from './types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const FavoritePage = () => {
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);
  const cartContext = useContext<CartContextType>(CartContext);
  const { addToCart, removeFromCart, cartInclude } = cartContext;

  const { favorites, addToFavorites, removeFromFavorites, favoritesInclude } =
    favoritesContext;

  return (
    <>
      <div className="under-nav">
        <div className="under-nav__back">
          <a href="/">
            <img src={Home} alt="home" />
          </a>
          <div className="under-nav__back__text">{` > Phones`}</div>
        </div>
        <h1 className="under-nav__h1">Favourites</h1>
        <div className="under-nav__models-count">{`${favorites.length} items

`}</div>
      </div>
      {favorites.map(product => (
        <div className="card" key={product.id}>
          <div className="card__content">
            <Link to={`/product/${product.id}`}>
              <img
                className="card__img"
                src={product.images[0]}
                alt={product.id}
              />
            </Link>
            <div className="card__main-text">{product.name}</div>
            <div className="card__price">
              <div className="card__price__discount">
                {`$${product.priceDiscount}`}
              </div>
              <div className="card__price__regular">{`$${product.priceRegular}`}</div>
            </div>
            <div className="card__specs">
              <div className="card__specs__string">
                Screen
                <div className="card__specs__string__value">
                  {product.screen}
                </div>
              </div>
              <div className="card__specs__string">
                Capacity
                <div className="card__specs__string__value">
                  {product.capacity}
                </div>
              </div>
              <div className="card__specs__string">
                RAM
                <div className="card__specs__string__value">{product.ram}</div>
              </div>
            </div>
            <div className="card__buttons">
              <button
                className={classNames('card__buttons__add button__add', {
                  button__add__active: cartInclude(product),
                })}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  cartInclude(product)
                    ? removeFromCart(product)
                    : addToCart(product);
                }}
              >
                {cartInclude(product) ? 'Remove from cart' : 'Add to cart'}
              </button>
              <img
                className="card__buttons__favorite button__favorite"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  favoritesInclude(product)
                    ? removeFromFavorites(product.id)
                    : addToFavorites(product);
                }}
                src={
                  favoritesInclude(product) ? FavoriteAddActive : FavoriteAdd
                }
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
