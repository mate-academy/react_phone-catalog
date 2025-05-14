import { useNavigate } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import React from 'react';
import './ProductList.scss';

interface ProductListProps {
  items: Gargets[];
  onRemoveFromFavorites?: (item: Gargets) => void;
  like?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  items,
  onRemoveFromFavorites,
  like,
}) => {
  const navigate = useNavigate();

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
            <span className="product__list-add-to-cart">Add to cart</span>
            <button
              className="product__list-button-like"
              onClick={() => {
                if (onRemoveFromFavorites) {
                  onRemoveFromFavorites(item);
                }
              }}
            >
              <span
                className="swiper__like"
                style={{
                  backgroundImage: like
                    ? 'url(/public/img/favorites.png)'
                    : 'url(/public/img/navbar/like.png)',
                }}
              ></span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
