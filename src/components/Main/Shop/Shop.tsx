import { TShop } from '../../../types/TShop';
import './Shop.scss';
interface ShopProps {
  shops: TShop[];
}
import React, { useEffect, useState } from 'react';
export const Shop: React.FC<ShopProps> = ({ shops }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getStyles = (index: number) => {
    if (windowWidth <= 360) {
      return {
        width: index === 2 ? '280%' : '150%',
        padding: index === 2 ? '64px 0 0 300px' : '120px 0 0 100px',
      };
    } else if (windowWidth >= 360 && windowWidth < 500) {
      return {
        width: index === 2 ? '150%' : '100%',
        padding: index === 2 ? '124px 0 0 200px' : '130px 0 0 50px',
      };
    } else if (windowWidth >= 500 && windowWidth < 640) {
      return {
        width: index === 2 ? '120%' : '80%',
        padding: index === 2 ? '124px 0 0 130px' : '130px 0 0 50px',
      };
    } else if (windowWidth >= 640) {
      return {
        width: index === 2 ? '300%' : '170%',
        padding: index === 2 ? '54px 0 0 200px' : '100px 0 0 70px',
      };
    }

    return {};
  };

  return (
    <div className="shop-wrapper">
      {shops.map((shop, index) => (
        <div key={shop.id} className="shop-block">
          <div
            className="shop-block__container-img"
            style={{
              background: index === 2 ? '#983c5c' : index % 2 === 0 ? '#6D6474' : '#D53C51',
            }}
          >
            <img
              className="shop-block__img"
              src={shop.image}
              alt={shop.name}
              style={getStyles(index)}
            />
          </div>
          <h3 className="shop-block__title">{shop.title}</h3>
          <p className="shop-block__subtitle">{shop.subtitle}</p>
        </div>
      ))}
    </div>
  );
};
