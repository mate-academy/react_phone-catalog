import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <div className="shop-by-category">
      <div className="shop-by-category__wrapper">
        <h2 className="shop-by-category__title">Shop by category</h2>

        <div className="shop-by-category__categories">
          <div className="category">
            <Link
              to={'phones'}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                className="category__image"
                src="img/categories/mobile-phones.png"
                alt="category"
              />
            </Link>
            <h4 className="category__title">Mobile phones</h4>
            <p className="category__count">124 models</p>
          </div>

          <div className="category">
            <Link
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              to={'tablets'}
            >
              <img
                className="category__image"
                src="img/categories/tablets.png"
                alt="category"
              />
            </Link>
            <h4 className="category__title">Tablets</h4>
            <p className="category__count">36 models</p>
          </div>

          <div className="category">
            <Link
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              to={'accessories'}
            >
              <img
                className="category__image"
                src="img/categories/Accessories.png"
                alt="category"
              />
            </Link>
            <h4 className="category__title">Accessories</h4>
            <p className="category__count">34 models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
