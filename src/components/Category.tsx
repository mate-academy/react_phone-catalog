import { Link } from 'react-router-dom';

export const Category = () => {
  return (
    <section className="category">
      <div className="category__header">
        <h1>Shop by category</h1>
      </div>

      <div className="category__cards">
        <Link to="./phones" className="category__card">
          <div className="category__card__content category__card--beige">
            <img
              src="./new/img/category-phones.png"
              alt="Mobile phones"
              className="category__card__image category__card__image--phone"
            />
          </div>
          <div>
            <h3>Mobile phones</h3>
            <p className="text__body">71 models</p>
          </div>
        </Link>

        <Link to="./tablets" className="category__card">
          <div className="category__card__content category__card--gray">
            <img
              src="./new/img/category-tablets.png"
              alt="Tablets"
              className="category__card__image category__card__image--tablet"
            />
          </div>
          <div>
            <h3>Tablets</h3>
            <p className="text__body">24 models</p>
          </div>
        </Link>

        <Link to="/accessories" className="category__card">
          <div className="category__card__content category__card--red">
            <img
              src="./new/img/category-accessories.png"
              alt="Accessories"
              className="category__card__image category__card__image--acc"
            />
          </div>
          <div>
            <h3>Accessories</h3>
            <p className="text__body">100 models</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
