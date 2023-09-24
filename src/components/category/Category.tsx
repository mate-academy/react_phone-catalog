import './style.scss';

export const Category = () => {
  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>
      <div className="category__products">
        <div className="category__products-mobile">
          <img
            className="category__photo-phone"
            src="./img/banner-phone.png"
            alt="phones"
          />
          <p className="category__products-name">Mobile phones</p>
          <p className="category__products-count">71 models</p>
        </div>
        <div className="category__products-tablets">
          <img
            className="category__photo-tablets"
            src="./img/tablets.png"
            alt="tablets"
          />
          <p className="category__products-name">Tablets</p>
          <p className="category__products-count">0 models</p>
        </div>
        <div className="category__products-accessories">
          <img
            className="category__photo-accessories"
            src="./img/accessories.png"
            alt="accessories"
          />
          <p className="category__products-name">Accessories</p>
          <p className="category__products-count">0 models</p>
        </div>
      </div>
    </div>
  );
};
