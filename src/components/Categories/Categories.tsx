import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helpers/constants';

export const Categories = () => (
  <div className="categories">
    <div className="categories__content">
      <h2 className="categories__title">
        Shop by category
      </h2>

      <ul className="categories__list">
        <li className="categories__item">
          <Link to="/phones" className="categories__link">
            <div className="categories__image-container">
              <img
                src={`${BASE_URL}/img/category-phones.png`}
                alt="phones"
                className="categories__image"
              />
            </div>

            <h4 className="categories__title">
              Mobile phones
            </h4>

            <p className="categories__number">
              XXX models
            </p>
          </Link>
        </li>
        <li className="categories__item">
          <Link to="/tablets" className="categories__link">
            <div className="categories__image-container">
              <img
                src={`${BASE_URL}/img/category-tablets.png`}
                alt="tablets"
                className="categories__image"
              />
            </div>

            <h4 className="categories__title">
              Tablets
            </h4>

            <p className="categories__number">
              XXX models
            </p>
          </Link>
        </li>
        <li className="categories__item">
          <Link to="/accessories" className="categories__link">
            <div className="categories__image-container">
              <img
                src={`${BASE_URL}/img/category-accessories.png`}
                alt="phones"
                className="categories__image"
              />
            </div>

            <h4 className="categories__title">
              Accessories phones
            </h4>

            <p className="categories__number">
              XXX models
            </p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
