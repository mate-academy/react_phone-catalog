import React from 'react';
import './SkeletonproductInfoPage.scss';

export const SkeletonProductInfoPage: React.FC = () => {
  return (
    <div className="skeletonProductInfo">
      <div className="skeletonProductInfo__breadcrumb skeleton"></div>

      <div className="skeletonProductInfo__title skeleton"></div>

      <div className="skeletonProductInfo__row">
        <div className="skeletonProductInfo__galleryBlock">
          {/* main image */}
          <div className="skeletonProductInfo__main skeleton"></div>

          {/* preview list */}
          <div className="skeletonProductInfo__previewList">
            <div className="skeletonProductInfo__preview skeleton"></div>
            <div className="skeletonProductInfo__preview skeleton"></div>
            <div className="skeletonProductInfo__preview skeleton"></div>
            <div className="skeletonProductInfo__preview skeleton"></div>
          </div>
        </div>

        {/* right controls */}
        <div className="skeletonProductInfo__controls">
          <div className="skeleton skeletonProductInfo__row"></div>
          <div className="skeleton skeletonProductInfo__colors"></div>
          <div className="skeletonProductInfo__line"></div>

          <div className="skeleton skeletonProductInfo__capacityRow"></div>
          <div className="skeletonProductInfo__line"></div>

          <div className="skeleton skeletonProductInfo__price"></div>
          <div className="skeleton skeletonProductInfo__button"></div>

          <div className="skeletonProductInfo__specs">
            <div className="skeleton skeletonProductInfo__spec"></div>
            <div className="skeleton skeletonProductInfo__spec"></div>
            <div className="skeleton skeletonProductInfo__spec"></div>
            <div className="skeleton skeletonProductInfo__spec"></div>
          </div>
        </div>
      </div>

      {/* about & tech */}
      <div className="skeletonProductInfo__about">
        <div className="skeletonProductInfo__aboutBlock">
          <div className="skeleton skeletonProductInfo__aboutTitle"></div>
          <div className="skeletonProductInfo__line"></div>

          <div className="skeleton skeletonProductInfo__text"></div>
          <div className="skeleton skeletonProductInfo__text"></div>
          <div className="skeleton skeletonProductInfo__text"></div>
        </div>

        <div className="skeletonProductInfo__tech">
          <div className="skeleton skeletonProductInfo__aboutTitle"></div>
          <div className="skeletonProductInfo__line"></div>

          <div className="skeleton skeletonProductInfo__text"></div>
          <div className="skeleton skeletonProductInfo__text"></div>
          <div className="skeleton skeletonProductInfo__text"></div>
        </div>
      </div>
    </div>
  );
};
