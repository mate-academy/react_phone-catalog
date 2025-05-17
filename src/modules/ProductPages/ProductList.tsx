import { NavLink, useNavigate } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import React, { useState } from 'react';
import './ProductList.scss';
import { useCart } from '../CartContext/CartContext';
import { Phone } from '../../interface/Phone';
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
  const { addToCart, addFavorite, removeFavorite } = useCart();
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Phone[]>([]);

  return (
    <div className="product__list">
      {items.map((item, index) => (
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
            <NavLink
              to="/"
              className={classNames('swiper__add-to-cart', {
                added: cartItems.some(item2 => item2.id === item.id),
              })}
              onClick={e => {
                e.preventDefault();
                addToCart(item);

                setCartItems(prev =>
                  prev.some(item2 => item2.id === item.id)
                    ? prev
                    : [...prev, item],
                );

                // alert('Added to cart!');
              }}
            >
              {cartItems.some(item2 => item2.id === item.id)
                ? 'Added to cart'
                : 'Add to cart'}
            </NavLink>
            <button
              className="product__list-button-like"
              onClick={() => {
                if (onRemoveFromFavorites) {
                  onRemoveFromFavorites(item);
                }

                const isLiked = likedIds.includes(item.id);

                setLikedIds(prev =>
                  isLiked
                    ? prev.filter(id => id !== item.id)
                    : [...prev, item.id],
                );

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isLiked ? removeFavorite(item.id) : addFavorite(item);
              }}
            >
              <span
                className="swiper__like"
                style={{
                  backgroundImage: likedIds.includes(item.id)
                    ? 'url(./img/favorites.png)'
                    : 'url(./img/navbar/like.png)',
                }}
              ></span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
