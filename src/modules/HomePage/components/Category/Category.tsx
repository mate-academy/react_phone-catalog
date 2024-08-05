import './Category.scss';
import { Link } from 'react-router-dom';

export const Categorys = () => {
  return (
    <div className="category">
      <div className="container">
        <div className="category__content">
          <div className="top-title">
            <h2 className="top-title__title">Shop by category</h2>
          </div>
          <div className="category__items">
            <article className="category__item">
              <Link to="/phones">
                <div className="category__picture category__picture--phones">
                  <img
                    src="./img/category-phones.webp"
                    alt="category-phones"
                    className="category__image"
                  />
                </div>

                <h4 className="categoru__links"> Mobile phones </h4>
              </Link>
              <p className="category__length">95 models</p>
            </article>

            <article className="category__item">
              <Link to="/tablets">
                <div className="category__picture category__picture--tablets">
                  <img
                    src="./img/category-tablets.webp"
                    alt="tablets-tablets"
                    className="category__image"
                  />
                </div>

                <h4 className="categoru__links"> Tablets </h4>
              </Link>
              <p className="category__length">24 models</p>
            </article>

            <article className="category__item">
              <Link to="/accessories">
                <div
                  className="
                  category__picture
                  category__picture--accessories"
                >
                  <img
                    src="./img/category-accessories.webp"
                    alt="category-accessories"
                    className="category__image"
                  />
                </div>

                <h4 className="categoru__links"> Accessories </h4>
              </Link>
              <p className="category__length">100 models</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
