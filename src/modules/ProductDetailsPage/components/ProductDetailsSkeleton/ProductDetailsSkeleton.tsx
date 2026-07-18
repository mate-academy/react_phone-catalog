import './ProductDetailsSkeleton.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <div className="container container--product-details-page">
      <section className="section section--head">
        <div className="product-details-skeleton__breadcrumbs skeleton" />
        <div className="product-details-skeleton__button-back skeleton" />
      </section>

      <section className="section section--body">
        <div className="product-details-skeleton__title skeleton" />

        <div className="product-details-skeleton__region-item">
          <div className="product-details-skeleton__photo">
            <div className="product-details-skeleton__main-photo skeleton" />
            <div
              className="
                product-details-skeleton__photo-previews skeleton
              "
            />
          </div>

          <div className="product-details-skeleton__main-controls">
            <div className="product-details-skeleton__section skeleton" />
            <div className="product-details-skeleton__section skeleton" />
            <div className="product-details-skeleton__section-price skeleton" />
            <div
              className="
                  product-details-skeleton__section-specs skeleton
                "
            />
          </div>
        </div>

        <div className="product-details-skeleton__region-description">
          <div className="product-details-skeleton__about">
            <div className="product-details-skeleton__about-title skeleton" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="product-details-skeleton__description skeleton"
              />
            ))}
          </div>

          <div className="product-details-skeleton__region-specs-product">
            <div className="product-details-skeleton__subtitle skeleton" />
            <div className="product-details-skeleton__wrapper-speck">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="product-details-skeleton__specs skeleton"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--products-slider">
        <div className="products-slider-skeleton">
          <div className="products-slider-skeleton__header-slider">
            <div className="products-slider-skeleton__title-slider skeleton" />
            <div className="products-slider-skeleton__button-slider skeleton" />
          </div>
          <div className="products-slider-skeleton__list skeleton" />
        </div>
      </section>
    </div>
  );
};
