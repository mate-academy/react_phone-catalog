import './Categories.scss';

export const Categories = () => {
  return (
    <div className="categories">
      <div className="categories__title">Shop by category</div>
      <div className="categories__content">
        <div className="categories__option">
          <img
            src="img/category-phones.png"
            alt="phones"
            className="categories__image"
          />
          <h2 className="categories__title--phones">Phones</h2>
          <span className="categories__amount"></span>
        </div>
        <div className="categories__option">
          <img
            src="img/category-tablets.png"
            alt="tablets"
            className="categories__image"
          />
          <h2 className="categories__title--tablets">Tablets</h2>
          <span className="categories__amount"></span>
        </div>
        <div className="categories__option">
          <img
            src="img/category-accessories.png"
            alt="accessories"
            className="categories__image"
          />
          <h2 className="categories__title--accessories">Accessories</h2>
          <span className="categories__amount"></span>
        </div>
      </div>
    </div>
  );
};
