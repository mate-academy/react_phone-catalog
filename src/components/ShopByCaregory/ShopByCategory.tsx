import './ShopByCategory.scss';

export const ShopByCategory = () => (
  <div className="shop-by-category">
    <h1 className="shop-by-category__title">
      Shop by category
    </h1>

    <div
      className="shop-by-category__content"
      data-cy="categoryLinksContainer"
    >
      <div className="shop-by-category__link">
        <div
          className="
          shop-by-category__link__image
          shop-by-category__link__image-phones"
        />
        <div className="shop-by-category__link-title">Mobile phones</div>
        <div className="shop-by-category__link-description">95 models</div>

      </div>

      <div className="shop-by-category__link">
        <div
          className="
          shop-by-category__link__image
          shop-by-category__link__image-tablets"
        />
        <div className="shop-by-category__link-title">Tablets</div>
        <div className="shop-by-category__link-description">24 models</div>
      </div>

      <div className="shop-by-category__link">

        <div
          className="shop-by-category__link__image
             shop-by-category__link__image-accessories"
        />
        <div className="shop-by-category__link-title">
          Accessories
        </div>
        <div className="shop-by-category__link-description">
          15 models
        </div>

      </div>
    </div>

  </div>
);
