import { Link } from 'react-router-dom';
import './categories.scss';
import { BASE_URL } from '../../utils/httpClient';

export const Categories = () => {
  return (
    <section className="page__section categories">
      <h1 className="categories__title">Shop by category</h1>

      <div className="categories__container">
        <Link
          to="/phones"
          className="categories__card"
        >
          <div
            className="
              categories__card-image
              categories__card-image--phones
            "
          >
            <img
              src={`${BASE_URL}img/category-phones.png`}
              alt="Category phones"
              className="categories__image"
            />
          </div>

          <p className="categories__name">Mobile phones</p>

          <p className="categories__quantity">95 models</p>
        </Link>

        <Link
          to="/tablets"
          className="categories__card"
        >
          <div
            className="
              categories__card-image
              categories__card-image--tablets
            "
          >
            <img
              src={`${BASE_URL}img/category-tablets.png`}
              alt="Category tablets"
              className="categories__image"
            />
          </div>

          <p className="categories__name">Tablets</p>

          <p className="categories__quantity">24 models</p>
        </Link>

        <Link
          to="/accessories"
          className="categories__card"
        >
          <div
            className="
              categories__card-image
              categories__card-image--accessories
            "
          >
            <img
              src={`${BASE_URL}img/category-accessories.png`}
              alt="Category accessories"
              className="categories__image"
            />
          </div>

          <p className="categories__name">Accessories</p>

          <p className="categories__quantity">100 models</p>
        </Link>
      </div>
    </section>
  );
};
