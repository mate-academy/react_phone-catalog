import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import categoryPhones from '../../../public/img/category-phones.webp';
import categoryTablets from '../../../public/img/category-tablets.png';
import categoryAccessories from '../../../public/img/category-accessories.png';

export default function ShopByCategory() {
  return (
    <div className="shop">
      <div className="shop__header">
        <h2 className="shop__title">Shop by category</h2>
        <div className="shop__main">
          <div className="shop__container">
            <Link to="/phones">
              <div className="shop__phone">
                <img
                  src={categoryPhones}
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
                  src={categoryTablets}
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
                  src={categoryAccessories}
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
    </div>
  );
}
