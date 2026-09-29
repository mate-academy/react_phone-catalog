import React from 'react';
import './ProductDetailsSkeleton.scss';

type Props = {
  className?: string;
};

export const ProductDetailsSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`product-details-skeleton ${className}`.trim()}>
      <div className="product-details-skeleton__main">
        {/* Галерея */}
        <div className="product-details-skeleton__gallery">
          <div className="product-details-skeleton__thumbnails">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="product-details-skeleton__thumb" />
            ))}
          </div>
          <div className="product-details-skeleton__main-image" />
        </div>

        {/* Панель действий */}
        <div className="product-details-skeleton__actions">
          <div className="product-details-skeleton__colors">
            <div
              className="
                product-details-skeleton__skeleton-box
                product-details-skeleton__skeleton-box--label
              "
            />
            <div className="product-details-skeleton__color-list">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-details-skeleton__color-btn" />
              ))}
            </div>
          </div>

          <div className="product-details-skeleton__inner">
            <div className="product-details-skeleton__capacity">
              <div
                className="
                  product-details-skeleton__skeleton-box
                  product-details-skeleton__skeleton-box--label
                "
              />
              <div
                className="
                  product-details-skeleton__capacity-list
                "
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="product-details-skeleton__capacity-btn"
                  />
                ))}
              </div>
            </div>

            <div className="product-details-skeleton__price-block">
              <div
                className="
                  product-details-skeleton__skeleton-box
                  product-details-skeleton__skeleton-box--price
                "
              />
            </div>

            <div className="product-details-skeleton__buttons">
              <div
                className="
                  product-details-skeleton__skeleton-box
                  product-details-skeleton__skeleton-box--btn-add
                  "
              />
              <div
                className="
                  product-details-skeleton__skeleton-box
                  product-details-skeleton__skeleton-box--btn-fav
                  "
              />
            </div>

            <div className="product-details-skeleton__specs-summary">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-details-skeleton__specs-item">
                  <div
                    className="
                      product-details-skeleton__skeleton-box
                      product-details-skeleton__skeleton-box--spec-name
                      "
                  />
                  <div
                    className="
                      product-details-skeleton__skeleton-box
                      product-details-skeleton__skeleton-box--spec-val
                      "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Нижний блок (About + Tech specs) */}
        <div className="product-details-skeleton__info">
          <div className="product-details-skeleton__about">
            <h2 className="product-details-skeleton__section-title">
              <div
                className="product-details-skeleton__skeleton-box
                 product-details-skeleton__skeleton-box--title
                "
              />
            </h2>

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="product-details-skeleton__description">
                <div
                  className="
                    product-details-skeleton__skeleton-box
                    product-details-skeleton__skeleton-box--sub-title
                    "
                />
                <div
                  className="
                    product-details-skeleton__skeleton-box
                    product-details-skeleton__skeleton-box--text
                    "
                />
                <div
                  className="
                    product-details-skeleton__skeleton-box
                    product-details-skeleton__skeleton-box--text
                    product-details-skeleton__skeleton-box--text-short
                    "
                />
              </div>
            ))}
          </div>

          <div className="product-details-skeleton__tech-specs">
            <h2 className="product-details-skeleton__section-title">
              <div
                className="
                  product-details-skeleton__skeleton-box
                  product-details-skeleton__skeleton-box--title
                  "
              />
            </h2>
            <div className="product-details-skeleton__specs-list">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-details-skeleton__specs-item">
                  <div
                    className="
                      product-details-skeleton__skeleton-box
                      product-details-skeleton__skeleton-box--spec-name
                      "
                  />
                  <div
                    className="
                      product-details-skeleton__skeleton-box
                      product-details-skeleton__skeleton-box--spec-val
                      "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
