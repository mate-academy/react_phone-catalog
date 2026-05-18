import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

export default function ShopByCategory() {
  return (
    <div className="shop">
      <h2 className="shop__title">Shop by category</h2>

      <div className="shop__main">
        <div className="shop__container">
          <Link to="/phones" className="shop__link">
            <div className="shop__card shop__card--phones">
              <img
                src="img/category-phones.webp"
                alt="phones-category"
                className="shop__img"
              />
            </div>
          </Link>
          <p className="shop__label">Mobile phones</p>
          <h6 className="shop__models">95 models</h6>
        </div>

        <div className="shop__container">
          <Link to="/tablets" className="shop__link">
            <div className="shop__card shop__card--tablets">
              <img
                src="img/category-tablets.png"
                alt="tablets-category"
                className="shop__img"
              />
            </div>
          </Link>
          <p className="shop__label">Tablets</p>
          <h6 className="shop__models">24 models</h6>
        </div>

        <div className="shop__container">
          <Link to="/accessories" className="shop__link">
            <div className="shop__card shop__card--accessories">
              <img
                src="img/category-accessories.png"
                alt="accessories-category"
                className="shop__img"
              />
            </div>
          </Link>
          <p className="shop__label">Accessories</p>
          <h6 className="shop__models">100 models</h6>
        </div>
      </div>
    </div>
  );
}