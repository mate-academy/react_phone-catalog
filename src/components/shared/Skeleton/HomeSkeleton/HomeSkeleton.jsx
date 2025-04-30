import './HomeSkeleton.style.scss';

export const HomeSkeleton = () => {
  return (
    <div className="skeleton-home">
      <div className="skeleton-home__title shimmer"></div>

      <div className="skeleton-home__swiper shimmer"></div>

      <div className="skeleton-home__slider">
        <div className="skeleton-home__slider-title shimmer"></div>
        <div className="skeleton-home__slider-cards">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-home__card shimmer"></div>
          ))}
        </div>
      </div>

      <div className="skeleton-home__categories">
        <div className="skeleton-home__categories-title shimmer"></div>
        <div className="skeleton-home__category-blocks">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-home__category shimmer"></div>
          ))}
        </div>
      </div>

      <div className="skeleton-home__slider">
        <div className="skeleton-home__slider-title shimmer"></div>
        <div className="skeleton-home__slider-cards">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-home__card shimmer"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
