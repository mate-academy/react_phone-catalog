import { NavLink, useNavigate } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import React from 'react';
import './ProductList.scss';
import { useCart } from '../CartContext/CartContext';
import classNames from 'classnames';

interface ProductListProps {
  items: Gargets[];
  onRemoveFromFavorites?: (item: Gargets) => void;
  like?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  items,
  onRemoveFromFavorites,
}) => {
  const navigate = useNavigate();
  const {
    addToCart,
    cartItems,
    favoriteItems,
    addFavorite,
    removeFavorite,
    removeFromCart,
  } = useCart();

  return (
    <div className="product__list">
      {items.map((item, index) => {
        const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
        const isLiked = favoriteItems.some(favItem => favItem.id === item.id);

        return (
          <div key={index} className="product__list-card">
            <img
              src={item.images[0]}
              alt={item.name}
              className="product__list-image"
              onClick={() => {
                navigate(`/${item.category}/${item.id}`, { state: item });
              }}
            />
            <h4 className="product__list-name">{item.name}</h4>
            <div className="product__list-position">
              <h3 className="product__list-costs">${item.priceRegular}</h3>
              <h3 className="product__list-sale">${item.priceDiscount}</h3>
              <div className="product__list-line"></div>
            </div>
            <div className="product__list-small-line" />
            <div className="product__list-position">
              <h5 className="product__list-screen">Screen</h5>
              <h5 className="product__list-oled">{item.screen}</h5>
            </div>
            <div className="product__list-position">
              <h5 className="product__list-capacity">Capacity</h5>
              <h5 className="product__list-gb">{item.capacity}</h5>
            </div>
            <div className="product__list-position">
              <h5 className="product__list-ram">RAM</h5>
              <h5 className="product__list-ram-gb">{item.ram}</h5>
            </div>
            <div className="product__list-position">
              <button
                className={classNames('swiper__add-to-cart', {
                  added: isInCart,
                })}
                onClick={e => {
                  e.preventDefault();
                  if (!isInCart) {
                    addToCart(item);
                  }

                  removeFromCart(item.id);
                }}
                style={{ pointerEvents: 'auto' }}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                className="product__list-button-like"
                onClick={() => {
                  if (isLiked) {
                    if (onRemoveFromFavorites) {
                      onRemoveFromFavorites(item);
                    }

                    removeFavorite(item.id);
                  } else {
                    addFavorite(item);
                  }
                }}
              >
                <span
                  className="swiper__like"
                  style={{
                    backgroundImage: isLiked
                      ? 'url(./img/favorites.png)'
                      : 'url(./img/navbar/like.png)',
                  }}
                ></span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
