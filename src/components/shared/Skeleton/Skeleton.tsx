import './Skeleton.style.scss';

import React from 'react';
import { Page } from '../../../types/Page';
import classNames from 'classnames';

type Props = {
  page: Page;
};

export const Skeleton: React.FC<Props> = ({ page }) => {
  if (page === 'home') {
    return (
      <div className="home">
        <div className="home__h1 skeleton skeleton-text skeleton--h1" />

        <div className="home__swiper">
          <div className="home-swiper skeleton skeleton--home-swiper" />
        </div>

        <div className="home__new-models">
          <div className="slider">
            <div className="slider__top">
              <div className="slider__title skeleton skeleton-text skeleton--slider-title" />
              <div className="slider__buttons">
                <div className="skeleton skeleton--slider-button" />
                <div className="skeleton skeleton--slider-button" />
              </div>
            </div>
            <div className="slider__slides">
              <div className="slider__slide">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton skeleton--card" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="home__categories categories">
          <div className="categories__title skeleton skeleton-text skeleton--categories-title" />
          <div className="categories__blocks blocks">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="blocks__block block">
                <div className="block__img skeleton skeleton--block-img" />
                <div className="block__name skeleton skeleton-text skeleton--block-name" />
                <div className="block__items-number skeleton skeleton-text skeleton--block-items" />
              </div>
            ))}
          </div>
        </div>

        <div className="home__hot-prices">
          <div className="slider">
            <div className="slider__top">
              <div className="slider__title skeleton skeleton-text skeleton--slider-title" />
              <div className="slider__buttons">
                <div className="skeleton skeleton--slider-button" />
                <div className="skeleton skeleton--slider-button" />
              </div>
            </div>
            <div className="slider__slides">
              <div className="slider__slide">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton skeleton--card" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'products') {
    return (
      <div className="catalog">
        <div className="breadcrumbs">
          <div className="skeleton skeleton--breadcrumb-home" />
          <div className="skeleton skeleton--breadcrumb" />
          <div className="skeleton skeleton--breadcrumb-wide" />
        </div>

        <div className="catalog__title">
          <div className="skeleton skeleton--catalog-heading" />
          <div className="skeleton skeleton--catalog-subtitle" />
        </div>

        <div className="catalog__selection">
          <div className="skeleton skeleton--select" />
          <div className="skeleton skeleton--select" />
        </div>

        <div className="product-list">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton skeleton--product-card" />
          ))}
        </div>

        <div className="pagination">
          <div className="pagination__pages">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton skeleton--page" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === 'productDetails') {
    return (
      <div className={classNames('skeleton', `skeleton--${page}`)}>
        <div className="skeleton__crumbs" />
        <div className="skeleton__backbutton" />

        <div className="skeleton__title shimmer" />

        <div className="skeleton__main">
          <div className="skeleton__image shimmer" />

          <div className="skeleton__sidebar">
            <div className="skeleton__block shimmer" />
            <div className="skeleton__block shimmer" />
            <div className="skeleton__price shimmer" />
            <div className="skeleton__buttons shimmer" />
            <div className="skeleton__techspecs shimmer" />
          </div>
        </div>

        <div className="skeleton__info">
          <div className="skeleton__article shimmer" />
          <div className="skeleton__specs shimmer" />
        </div>

        <div className="skeleton__slider shimmer" />
      </div>
    );
  }
};
