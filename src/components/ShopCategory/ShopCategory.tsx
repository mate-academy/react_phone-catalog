import { Link } from 'react-router-dom';
import './Category.scss';

export const ShopCategory: React.FC = () => {
  const URL = 'https://mate-academy.github.io/react_phone-catalog/';

  return (
    <section className="shopcategory">
      <div className="container">
        <h2 className="category__title">Shop by category</h2>
        <div
          className="category"
          data-cy="categoryLinksContainer"
        >

          <div className="category__box">
            <Link
              to="phones"
              className="category__link"
            >
              <div className="category__container category__container--1">
                <img
                  className="category__img"
                  src={`${URL}_new/img/category-phones.png`}
                  alt="phone"
                />
              </div>
              <div>
                Mobile phones
                <p className="category__description"> 95 models</p>
              </div>
            </Link>
          </div>
          <div className="category__box">
            <Link
              to="tablets"
              className="category__link"
            >
              <div className="category__container category__container--2">
                <img
                  className="category__img"
                  src={`${URL}_new/img/category-tablets.png`}
                  alt="tablets"
                />
              </div>
              <div>
                Tablets
                <p className="category__description">0 models</p>
              </div>
            </Link>

          </div>
          <div className="category__box">
            <Link
              to="accessories"
              className="category__link"
            >
              <div className="category__container category__container--3">
                <img
                  className="category__img"
                  src={`${URL}_new/img/category-accessories.png`}
                  alt="accessories"
                />
              </div>
              <div>
                Accessories
                <p className="category__description">0 models</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};
