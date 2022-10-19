/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartProvider';
import { FavouriteContext } from '../FavouriteProvider';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart } = useContext(CartContext);
  const { favourites, isFavouriteToggle } = useContext(FavouriteContext);
  const {
    name, imageUrl, discount, price, screen, capacity, ram, id, type,
  } = product;

  const techSpecs = {
    Screen: screen,
    Capacity: capacity,
    Ram: ram,
  };

  const techSpecsList = Object.entries(techSpecs);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="productCard">
      <div className="productCard__foto">
        <Link
          to={`/${type}s/${id}`}
          onClick={backToTop}
        >
          <img src={imageUrl} alt={`${name}`} className="productCard__image" />
        </Link>
      </div>
      <Link
        to={`/${type}s/${id}`}
        className="productCard__title"
        onClick={backToTop}
      >
        {name}
      </Link>
      <div className="productCard__cost">
        <div className="productCard__price">
          {discount > 0
            ? `$${Math.round(price - (price * (discount / 100)))}`
            : `$${price}`}
        </div>
        {discount > 0 && (
          <div className="productCard__priceInitial">
            $
            {price}
          </div>
        )}
      </div>
      <div className="productCard__line" />
      <div className="productCard__tech-specs">
        {
          techSpecsList.map(techItem => (
            <div
              className="productCard__tech-specs-item"
              key={techItem[0]}
            >
              <div className="productCard__tech-specs-name">{techItem[0]}</div>
              <div className="productCard__tech-specs-value">
                {techItem[1] || '-'}
              </div>
            </div>
          ))
        }
      </div>

      <div className="productCard__buttons">
        <button
          type="button"
          className={classNames(
            'productCard__buttonToCart',
            {
              'productCard__buttonToCart--inCart':
              cart.some(item => item.id === id),
            },
          )}
          disabled={cart.some(item => item.id === id)}
          onClick={() => addToCart(product)}
        >
          {
            cart.some(item => item.id === id)
              ? 'Added to cart'
              : 'Add to cart'
          }
        </button>
        <button
          type="button"
          className={classNames(
            'productCard__buttonToFavourites',
            {
              'productCard__buttonToFavourites--isFavourite':
              favourites.some(item => item.id === id),
            },
          )}
          onClick={() => isFavouriteToggle(product)}
        />
      </div>
    </div>
  );
};
