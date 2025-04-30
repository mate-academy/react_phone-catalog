import './CatalogSkeleton.scss';

export const CatalogSkeleton = () => {
  return (
    <div className="catalog-skeleton container">
      <div className="catalog-skeleton__controls">
        <div className="catalog-skeleton__breadcrumbs shimmer"></div>
        <div className="catalog-skeleton__back-button shimmer"></div>
        <div className="catalog-skeleton__actions">
          <div className="catalog-skeleton__select shimmer"></div>
          <div className="catalog-skeleton__select shimmer"></div>
        </div>
      </div>

      <div className="catalog-skeleton__cards">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div className="catalog-skeleton__card shimmer" key={idx}></div>
        ))}
      </div>

      <div className="catalog-skeleton__pagination shimmer"></div>
    </div>
  );
};
