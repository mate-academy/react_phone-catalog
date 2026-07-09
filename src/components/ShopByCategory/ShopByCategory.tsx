import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import productsData from '/public/api/products.json';

export const ShopByCategory: FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  // Рахуємо кількість моделей для кожної категорії
  const tabletCount = productsData.filter(
    (product: any) => product.category === 'tablets',
  ).length;
  const phoneCount = productsData.filter(
    (product: any) => product.category === 'phones',
  ).length;
  const accessoriesCount = productsData.filter(
    (product: any) => product.category === 'accessories',
  ).length;

  return (
    <section className="shopByCategory">
      <h2 className="shopByCategory__h1">Shop by category</h2>

      <div className="shopByCategory__items">
        {/* КАТЕГОРІЯ: PHONES */}
        <Link to="/phones" className="shopByCategory__items__item">
          <div className="shopByCategory__items__item__image-container">
            <img src={`${baseUrl}/img/category-phones.png`} alt="Phones" />
          </div>
          <span className="shopByCategory__items__item__title">Mobile phones</span>
          <span className="shopByCategory__items__item__models">
            {phoneCount} models
          </span>
        </Link>

        {/* КАТЕГОРІЯ: TABLETS */}
        <Link to="/tablets" className="shopByCategory__items__item">
          <div className="shopByCategory__items__item__image-container">
            <img src={`${baseUrl}/img/category-tablets.png`} alt="Tablets" />
          </div>
          <span className="shopByCategory__items__item__title">Tablets</span>
          <span className="shopByCategory__items__item__models">
            {tabletCount} models
          </span>
        </Link>

        {/* КАТЕГОРІЯ: ACCESSORIES */}
        <Link to="/accessories" className="shopByCategory__items__item">
          <div className="shopByCategory__items__item__image-container">
            <img src={`${baseUrl}/img/category-accessories.png`} alt="Accessories" />
          </div>
          <span className="shopByCategory__items__item__title">Accessories</span>
          <span className="shopByCategory__items__item__models">
            {accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
