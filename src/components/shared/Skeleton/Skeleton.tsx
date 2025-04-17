import './Skeleton.style.scss';

import { Page } from "../../../types/Page"

type Props = {
  page: Page;
}

export const Skeleton: React.FC<Props> = ({ page }) => {
  if (page === 'home') {
    return (
      <div className="home">
      <div className="home__h1 skeleton skeleton-text" style={{ width: '70%', height: '48px' }} />

      <div className="home__swiper">
        <div className="home-swiper skeleton" style={{ width: '100%', maxWidth: '1136px', height: '189px' }} />
      </div>

      <div className="home__new-models">
        <div className="slider">
          <div className="slider__top">
            <div className="slider__title skeleton skeleton-text" style={{ width: '200px', height: '32px' }} />
            <div className="slider__buttons">
              <div className="skeleton" style={{ width: '32px', height: '32px' }} />
              <div className="skeleton" style={{ width: '32px', height: '32px' }} />
            </div>
          </div>
          <div className="slider__slides">
            <div className="slider__slide">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ width: '272px', height: '400px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="home__categories categories">
        <div className="categories__title skeleton skeleton-text" style={{ width: '300px', height: '36px' }} />
        <div className="categories__blocks blocks">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="blocks__block block">
              <div className="block__img skeleton" style={{ width: '100%', height: '288px' }} />
              <div className="block__name skeleton skeleton-text" style={{ width: '80%', height: '24px' }} />
              <div className="block__items-number skeleton skeleton-text" style={{ width: '60%', height: '16px' }} />
            </div>
          ))}
        </div>
      </div>

      <div className="home__hot-prices">
        <div className="slider">
          <div className="slider__top">
            <div className="slider__title skeleton skeleton-text" style={{ width: '200px', height: '32px' }} />
            <div className="slider__buttons">
              <div className="skeleton" style={{ width: '32px', height: '32px' }} />
              <div className="skeleton" style={{ width: '32px', height: '32px' }} />
            </div>
          </div>
          <div className="slider__slides">
            <div className="slider__slide">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ width: '272px', height: '400px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // if (page === 'products' || page === 'fav') {
  //   return();
  // }

  // if (page === 'cart') {
  //   return();
  // }

  // if (page === 'productDetails') {
  //   return();
  // }
}
