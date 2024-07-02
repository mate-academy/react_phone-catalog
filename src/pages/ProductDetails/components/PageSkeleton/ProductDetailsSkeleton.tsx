import './ProductDetailsSkeleton.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <div className="details-skeleton">
      <div className="details-skeleton__main-title skeleton"></div>
      <div className="details-skeleton__images">
        <div className="details-skeleton__image skeleton"></div>
        <div className="details-skeleton__image-thumbnails">
          <div className="details-skeleton__image-thumbnail skeleton"></div>
          <div className="details-skeleton__image-thumbnail skeleton"></div>
          <div className="details-skeleton__image-thumbnail skeleton"></div>
          <div className="details-skeleton__image-thumbnail skeleton"></div>
          <div className="details-skeleton__image-thumbnail skeleton"></div>
        </div>
      </div>
      <div className="details-skeleton__info">
        <div className="details-skeleton__title skeleton"></div>
        <div className="details-skeleton__colors">
          <div className="details-skeleton__color skeleton"></div>
          <div className="details-skeleton__color skeleton"></div>
          <div className="details-skeleton__color skeleton"></div>
        </div>
        <div className="details-skeleton__memory">
          <div className="details-skeleton__memory-option skeleton"></div>
          <div className="details-skeleton__memory-option skeleton"></div>
        </div>
        <div className="details-skeleton__price skeleton"></div>
        <div className="details-skeleton__buttons">
          <div className="details-skeleton__buttons-cart skeleton"></div>
          <div className="details-skeleton__buttons-favourite skeleton"></div>
        </div>
        <div className="details-skeleton__specs">
          <div className="details-skeleton__spec">
            <div className="details-skeleton__spec-title skeleton"></div>
          </div>
        </div>
      </div>
      <div className="details-skeleton__about">
        <div className="details-skeleton__about-title skeleton"></div>
        <div className="details-skeleton__about-description">
          <div
            className="details-skeleton__about-description-text
                skeleton"
          ></div>
          <div
            className="details-skeleton__about-description-text
              skeleton"
          ></div>
        </div>
      </div>
      <div className="details-skeleton__tech-specs">
        <div className="details-skeleton__tech-specs-title skeleton"></div>
        <div className="details-skeleton__tech-specs-table">
          <div className="details-skeleton__tech-specs-row">
            <div className="details-skeleton__tech-specs-cell skeleton"></div>
            <div className="details-skeleton__tech-specs-cell skeleton"></div>
          </div>
          <div className="details-skeleton__tech-specs-row">
            <div className="details-skeleton__tech-specs-cell skeleton"></div>
            <div className="details-skeleton__tech-specs-cell skeleton"></div>
          </div>
        </div>
      </div>
      <div className="details-skeleton__related-products">
        <div className="details-skeleton__related-products-item skeleton"></div>
        <div className="details-skeleton__related-products-item skeleton"></div>
        <div className="details-skeleton__related-products-item skeleton"></div>
        <div className="details-skeleton__related-products-item skeleton"></div>
      </div>
    </div>
  );
};
