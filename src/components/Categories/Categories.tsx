import mobile from '../../imgs/categories/mobile.png';
import teblets from '../../imgs/categories/tablets.png';
import accessories from '../../imgs/categories/accessories.png';

import './categories.scss';

export const Categories: React.FC = () => {
  return (
    <div className="categories">
      <h3 className="categories__title">Shop by category</h3>

      <div className="categories__content">
        <a href="/phones" className="categories__container">
          <div className="categories__img-box categories__img-box-mobile">
            <img src={mobile} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Mobile Phones</p>

          <span className="categories__quantity">222 models</span>
        </a>

        <a href="/tablets" className="categories__container">
          <div className="categories__img-box categories__img-box-tablets">
            <img src={teblets} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Tablets</p>

          <span className="categories__quantity">222 models</span>
        </a>

        <a href="/accessories" className="categories__container">
          <div className="categories__img-box categories__img-box-accessories">
            <img src={accessories} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Accessories</p>

          <span className="categories__quantity">222 models</span>
        </a>
      </div>
    </div>
  );
};
