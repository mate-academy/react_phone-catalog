/* eslint-disable no-console */
import React from 'react';
import { TShop } from '../../../types/TShop';
import './Shop.scss';
import getStylesShop from '../../../services/helpers/getStylesShop';
import { useHandleScroll, useWindowWidth } from '../../../hooks/Hooks';

interface ShopProps {
  shops: TShop[];
}

export const Shop: React.FC<ShopProps> = ({ shops }) => {
  const windowWidth = useWindowWidth();
  const animationStyles = useHandleScroll(shops);

  return (
    <div className="shop-wrapper">
      {shops.map((shop, index) => (
        <div key={shop.id} className="shop-block">
          <div
            className="shop-block__container-img"
            style={
              (animationStyles[index],
              {
                background: index === 2 ? '#983c5c' : index % 2 === 0 ? '#6D6474' : '#D53C51',
              })
            }
          >
            <img
              className="shop-block__img"
              src={shop.image}
              alt={shop.name}
              style={{ ...getStylesShop(index, windowWidth), ...animationStyles[index] }}
            />
          </div>
          <h3 className="shop-block__title" style={animationStyles[index]}>
            {shop.title}
          </h3>
          <p className="shop-block__subtitle" style={animationStyles[index]}>
            {shop.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};
