import React, { useContext } from 'react';
import { Product } from '../../types/Product';
import { CatalogContext } from '../Contexts/CatalogContext';
import { Link, useLocation } from 'react-router-dom';
import { getNextId } from '../../hooks/newId';

type Props = {
  model: Product;
  width?: string;
};

export const Card: React.FC<Props> = ({ model, width = '100%' }) => {
  // const [searchParams] = useSearchParams();
  const context = useContext(CatalogContext);
  const { favourites, addFavourites, deleteFromFavourites } = context;
  const { cart, addCart } = context;
  const hot = model.fullPrice / model.price - 1 > 0.1 ? true : false;

  const location = useLocation();
  const handlerAddToFavourites = () => {
    if (favourites.includes(model)) {
      deleteFromFavourites(model);
    } else {
      addFavourites(model);
    }
  };

  const handlerAddToCart = () => {
    if (cart.every(product => product.product.id !== model.id)) {
      const newProduct = {
        id: getNextId(cart),
        product: model,
        quantity: 1,
      };

      addCart(newProduct);
    }
  };

  return (
    <div
      className="card"
      style={{
        width: `${width}px`,
      }}
    >
      <div className="card__top">
        <div className="card__top-wrapper">
          <div className="card__image-wrapper">
            <Link
              to={`../${model.category}/${model.itemId}`}
              state={{
                location,
              }}
            >
              <img
                className="card__image"
                src={model.image}
                alt="Product image"
              />
            </Link>
          </div>
          <Link
            className="card__title"
            to={`../${model.category}/${model.itemId}`}
            state={{
              location,
            }}
          >
            {model.name}
          </Link>
        </div>
        <div className="card__price-wrapper">
          <p className="card__price">{`$${model.price}`}</p>
          {hot && (
            <p className="card__price card__price--full">{`$${model.fullPrice}`}</p>
          )}
        </div>
      </div>
      <div className="card__bottom">
        <div className="card__properties">
          <div className="card__property">
            <p className="card__property-name">Screen</p>
            <p className="card__property-value">{model.screen}</p>
          </div>
          <div className="card__property">
            <p className="card__property-name">Capacity</p>
            <p className="card__property-value">{model.capacity}</p>
          </div>
          <div className="card__property">
            <p className="card__property-name">RAM</p>
            <p className="card__property-value">{model.ram}</p>
          </div>
        </div>
        <div className="card__buttons">
          {cart.some(product => product.product.id === model.id) ? (
            <button className="card__addToCart card__addToCart--selected">
              Added to cart
            </button>
          ) : (
            <button className="card__addToCart" onClick={handlerAddToCart}>
              Add to cart
            </button>
          )}
          <button
            className="card__addToFavourite"
            onClick={handlerAddToFavourites}
          >
            {favourites.includes(model) ? (
              <img
                className="card__heart"
                src="img/icons/favouritesFilled.png"
                alt="favourites"
              />
            ) : (
              <img
                className="card__heart"
                src="img/icons/favourites.png"
                alt="favourites"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
