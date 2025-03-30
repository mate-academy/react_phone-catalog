import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  return (
    <div className="categories">
      <h2 className="title title--h2">Shop by category</h2>

      <div className="categories__container">
        <Link to="phones" className="categories__card">
          <div className="categories__img categories__img--phones"></div>

          <div className="categories__text">
            <p className="title title--h4">Mobile phones</p>

            <p className="body-text">124 models</p>
          </div>
        </Link>

        <Link to="tablets" className="categories__card">
          <div className="categories__img categories__img--tablets"></div>

          <div className="categories__text">
            <p className="title title--h4">Tablets</p>

            <p className="body-text">36 models</p>
          </div>
        </Link>

        <Link to="accessories" className="categories__card">
          <div className="categories__img categories__img--accessories"></div>

          <div className="categories__text">
            <p className="title title--h4">Accessories</p>

            <p className="body-text">34 models</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
