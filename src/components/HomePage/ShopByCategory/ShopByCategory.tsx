import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <>
      <h2 className="shop-by-category__title">Shop by category</h2>

      <div className="shop-by-category">
        <div className="category-card">
          <Link to="/phones" className="category__link">
            <img
              className="category-card__photo"
              src="./img/category-images/category-phone.png"
            />
            <div className="category__title">Mobile Phones</div>
            <div className="category__amount-models">87 models</div>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/tablets" className="category__link">
            <img
              className="category-card__photo"
              src="./img/category-images/category-tablets.png"
            />
            <div className="category__title">Tablets</div>
            <div className="category__amount-models">87 models</div>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/accessories" className="category__link">
            <img
              className="category-card__photo"
              src="./img/category-images/category-accessories.png"
            />
            <div className="category__title">Accessories</div>
            <div className="category__amount-models">87 models</div>
          </Link>
        </div>
      </div>
    </>
  );
};
