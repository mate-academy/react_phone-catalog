import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <>
      <div className="shop-by-category">
        <h1 className="shop-by-category__title">Shop by category</h1>
        <div className="shop-by-category__container">
          <div className="shop-by-category__wrapper">
            <div className="shop-by-category__wrapper--phones"></div>
            <p className="shop-by-category__name">Mobile phones</p>
            <p className="shop-by-category__number">95 models</p>
          </div>
          <div className="shop-by-category__wrapper">
            <div className="shop-by-category__wrapper--tablets"></div>
            <p className="shop-by-category__name">Tablets</p>
            <p className="shop-by-category__number">24 models</p>
          </div>
          <div className="shop-by-category__wrapper">
            <div className="shop-by-category__wrapper--accessories"></div>
            <p className="shop-by-category__name">Accessories</p>
            <p className="shop-by-category__number">100 models</p>
          </div>
        </div>
      </div>
    </>
  );
};
