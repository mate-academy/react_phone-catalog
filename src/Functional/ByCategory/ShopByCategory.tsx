import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

export default function ShopByCategory() {
  return (
    <div className="shop">
      <h1 className="shop__title">Shop by category</h1>
      <div className="shop__main">
        <div className="shop__container">
          <Link to="/phones">
            <div className="shop__phone">
              <img
                src="public/img/category-phones.webp"
                alt="phones-category"
                className="shop__phone--img"
              />
            </div>
          </Link>
          <p className="shop__title">Mobile phones</p>
          <h6 className="shop__models--title">95 models</h6>
        </div>
        <div className="shop__container">
          <Link to="/tablets">
            <div className="shop__tablet">
              <img
                src="public/img/category-tablets.png"
                alt="tablets-category"
                className="shop__tablet--img"
              />
            </div>
          </Link>
          <p className="shop__title">Tablets</p>
          <h6 className="shop__models--title">24 models</h6>
        </div>
        <div className="shop__container">
          <Link to="/accessories">
            <div className="shop__accessories">
              <img
                src="public/img/category-accessories.png"
                alt="accessories-category"
                className="shop__accessories--img"
              />
            </div>
          </Link>
          <p className="shop__title">Accessories</p>
          <h6 className="shop__models--title">100 models</h6>
        </div>
      </div>
    </div>
  );
}
