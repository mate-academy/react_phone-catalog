import './ProductPageSkeleton.scss';

export const ProductPageSkeleton = () => {
  return (
    <div className="skeleton-product-page">
      <div className="skeleton-product-page__crumbs shimmer"></div>

      <div className="skeleton-product-page__backbutton shimmer"></div>

      <div className="skeleton-product-page__title shimmer"></div>

      <div className="skeleton-product-page__sections">
        <div className="skeleton-product-page__section skeleton-product-page__section--design">
          <div className="skeleton-product-page__product-design shimmer"></div>

          <div className="skeleton-product-page__sidebar">
            <div className="skeleton-product-page__options">
              <div className="skeleton-product-page__options__block skeleton-product-page__options__block--colors">
                <div className="skeleton-product-page__options__title shimmer"></div>
                <div className="skeleton-product-page__options__wrap">
                  <div className="skeleton-product-page__options__color-wrap shimmer"></div>
                  <div className="skeleton-product-page__options__color-wrap shimmer"></div>
                  <div className="skeleton-product-page__options__color-wrap shimmer"></div>
                </div>
              </div>

              <div className="skeleton-product-page__options__block skeleton-product-page__options__block--capacity">
                <div className="skeleton-product-page__options__title shimmer"></div>
                <div className="skeleton-product-page__options__wrap">
                  <div className="skeleton-product-page__options__capacity shimmer"></div>
                  <div className="skeleton-product-page__options__capacity shimmer"></div>
                  <div className="skeleton-product-page__options__capacity shimmer"></div>
                </div>
              </div>
            </div>

            <div className="skeleton-product-page__actions">
              <div className="skeleton-product-page__price shimmer"></div>
              <div className="skeleton-product-page__buttons shimmer"></div>
            </div>

            <div className="skeleton-product-page__tech-specs shimmer"></div>
          </div>
        </div>

        <div className="skeleton-product-page__section skeleton-product-page__section--info">
          <div className="skeleton-product-page__article">
            <div className="skeleton-product-page__article__title shimmer"></div>
            <div className="skeleton-product-page__article__paragraphs">
              <div className="skeleton-product-page__article__paragraph shimmer"></div>
              <div className="skeleton-product-page__article__paragraph shimmer"></div>
              <div className="skeleton-product-page__article__paragraph shimmer"></div>
            </div>
          </div>

          <div className="skeleton-product-page__tech-specs-info">
            <div className="skeleton-product-page__tech-specs-info__title shimmer"></div>
            <div className="skeleton-product-page__tech-specs-info__content shimmer"></div>
          </div>
        </div>
      </div>

      <div className="skeleton-product-page__slider shimmer"></div>
    </div>
  );
};
