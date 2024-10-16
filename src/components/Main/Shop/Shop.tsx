import { TShop } from '../../../types/TShop';
import './Shop.scss';

interface ShopProps {
  shops: TShop[];
}

export const Shop: React.FC<ShopProps> = ({ shops }) => {
  return (
    <>
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
              style={{
                width: index === 2 ? '290%' : '150%',
                padding: index === 2 ? '104px 0 0 300px' : '110px 0 0 80px',
              }}
            />
          </div>
          <h4 className="shop-block__title">{shop.title}</h4>
          <p className="shop-block__subtitle">{shop.subtitle}</p>
        </div>
      ))}
    </>
  );
};
