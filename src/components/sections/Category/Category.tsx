import './Category.scss';

export const Category = () => {
  return (
    <section className="category section">
      <div className="container">
        <h2 className="category__title title">Shop by category</h2>

        <ul className="category__list">
          <li className="category__item">
            <a className="category__link" href="#">
              <div className="category__link-img">
                <img
                  className="category__link"
                  src="./img/category-phones.webp"
                  alt=""
                />
              </div>
              <h3 className="category__link-title">Mobile phones</h3>
              <p className="category__link-text">
                <span>95</span> models
              </p>
            </a>
          </li>
          <li className="category__item">
            <a className="category__link" href="#">
              <div className="category__link-img category__link-img--light">
                <img
                  className="category__link"
                  src="./img/category-tablets.png"
                  alt=""
                />
              </div>
              <h3 className="category__link-title">Tablets</h3>
              <p className="category__link-text">
                <span>24</span> models
              </p>
            </a>
          </li>
          <li className="category__item">
            <a className="category__link" href="#">
              <div className="category__link-img category__link-img--red">
                <img
                  className="category__link"
                  src="./img/category-accessories.png"
                  alt=""
                />
              </div>
              <h3 className="category__link-title">Accessories</h3>
              <p className="category__link-text">
                <span>100</span> models
              </p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
