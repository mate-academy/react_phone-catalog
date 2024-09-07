import { Link } from 'react-router-dom';

export const Category = () => {
  return (
    <section className="category section">
      <div className="container">
        <h2 className="category__title section-title">Shop by category</h2>

        <ul className="category__list">
          <li className="category__item">
            <Link className="category__link" to="/phones">
              <div className="category__link-img">
                <img src="./img/category-phones.webp" alt="Phones" />
              </div>
              <h3 className="category__link-title">Mobile phones</h3>
              <p className="category__link-text">
                <span>95</span> models
              </p>
            </Link>
          </li>
          <li className="category__item">
            <Link className="category__link" to="/tablets">
              <div className="category__link-img category__link-img--light">
                <img src="./img/category-tablets.png" alt="Tablets" />
              </div>
              <h3 className="category__link-title">Tablets</h3>
              <p className="category__link-text">
                <span>24</span> models
              </p>
            </Link>
          </li>
          <li className="category__item">
            <Link className="category__link" to="/accessories">
              <div className="category__link-img category__link-img--red">
                <img src="./img/category-accessories.png" alt="Accessories" />
              </div>
              <h3 className="category__link-title">Accessories</h3>
              <p className="category__link-text">
                <span>100</span> models
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
