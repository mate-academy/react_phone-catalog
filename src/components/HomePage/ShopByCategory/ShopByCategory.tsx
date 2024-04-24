import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <>
      <h2 className="shop-by-category__title">Shop by category</h2>

      <div className="shop-by-category">
        <div className="category-card">
          <img src="./img/logo/temporary/category-phone.png" />
          <div className="category__title">Mobile Phones</div>
          <div className="category__amount-models">87 models</div>
        </div>

        <div className="category-card">
          <img src="./img/logo/temporary/category-phone.png" />
          <div className="category__title">Mobile Phones</div>
          <div className="category__amount-models">87 models</div>
        </div>

        <div className="category-card">
          <img src="./img/logo/temporary/category-phone.png" />
          <div className="category__title">Mobile Phones</div>
          <div className="category__amount-models">87 models</div>
        </div>
      </div>
    </>
  );
};
