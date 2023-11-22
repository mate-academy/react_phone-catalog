import './Categories.scss';

export const Categories = () => {
  return (
    <div className="categories" data-cy="categoryLinksContainer">
      <h1 className="categories__title">Shop by category</h1>
      <div className="categories__bottom">
        <div className="category">
          <div className="category__picture category__picture--1">
            <img
              src="_new/img/category-phones.png"
              alt="phones"
              className="category__picture--img category__picture--img-phones"
            />
          </div>

          <h1 className="category__title">Mobile phones</h1>
          <p className="category__num">95 models</p>
        </div>
        <div className="category">
          <div className="category__picture category__picture--2">
            <img
              src="_new/img/category-tablets.png"
              alt=""
              className="category__picture--img category__picture--img-tablets"
            />
          </div>

          <h1 className="category__title">Tablets</h1>
          <p className="category__num">24 models</p>
        </div>
        <div className="category">
          <div className="category__picture category__picture--3">
            <img
              src="_new/img/category-accessories.png"
              alt="accessories"
              className="category__picture--img
              category__picture--img-accessories"
            />
          </div>

          <h1 className="category__title">Accessories</h1>
          <p className="category__num">100 models</p>
        </div>
      </div>
    </div>
  );
};
