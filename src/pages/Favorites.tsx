import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Products } from '../types/products';
import { useAppContext } from '../ContextStor';

export const Favorites = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, setFavorites } = useAppContext();

  const toggleFavorite = (product: Products) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <>
      <div className="page-phones">
        <Link to="/">
          <img className="page-phones__house" src="./img/Home.svg" alt="Home" />
        </Link>
        <img
          className="page-phones__arrow"
          src="./img/Chevron (Arrow Right).svg"
          alt="Chevron"
        />
        <p className="page-phones__catygory-text">
          {location.pathname.includes('/tablets')
            ? 'Tablets'
            : location.pathname.includes('/phones')
              ? 'Phones'
              : location.pathname.includes('/accessories')
                ? 'Accessories'
                : location.pathname.includes('/favourites')
                  ? 'Favourites'
                  : ''}
        </p>
      </div>

      <h1>Favourites</h1>
      <p>{favorites.length} items</p>

      <ul className="card__grid">
        {favorites.length > 0 &&
          favorites.map(product => (
            <div key={product.id} className="card">
              <img
                onClick={() => {
                  navigate(`/${product.category}/${product.itemId}`);
                }}
                className="card__image"
                src={product.image}
                alt="card-image"
              />
              <p className="card__name">{product.name}</p>
              <p className="card__price-regular">{`${product.price}$`}</p>

              <div className="card__line"></div>

              <div className="card__screen">
                <p className="card__screen-name">Screen</p>
                <p className="card__screen-info">{product.screen}</p>
              </div>

              <div className="card__capacity">
                <p className="card__capacity-name">Capacity</p>
                <p className="card__capacity-info">{product.capacity}</p>
              </div>

              <div className="card__ram">
                <p className="card__ram-name">Ram</p>
                <p className="card__ram-info">{product.ram}</p>
              </div>

              <div className="card__buy">
                <button className="card__buy-cart">Add to cart</button>
                <img
                  onClick={() => {
                    toggleFavorite(product);
                  }}
                  className="page-home-card__favorite"
                  src={
                    favorites.some(fav => fav.id === product.id)
                      ? './img/Add to fovourites - Added.svg'
                      : './img/add-to-cart.svg'
                  }
                  alt="favorite"
                />
              </div>
            </div>
          ))}
      </ul>
    </>
  );
};
