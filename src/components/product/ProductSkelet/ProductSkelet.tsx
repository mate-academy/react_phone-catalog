import './ProductSkelet.scss';

export const ProductSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__img" />
      <div className="card-skeleton__title" />
      <div className="card-skeleton__price" />

      <div className="card-skeleton__features">
        <div className="card-skeleton__features-line" />
        <div className="card-skeleton__features-line" />
        <div className="card-skeleton__features-line" />
      </div>

      <div className="card-skeleton__actions">
        <div className="card-skeleton__actions-btn" />
        <div className="card-skeleton__actions-fav" />
      </div>
    </div>
  );
};
