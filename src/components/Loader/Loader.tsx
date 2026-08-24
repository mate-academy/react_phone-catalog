import './Loader.scss';

export const Loader = () => {
  return (
    <div className="Loader">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton skeleton-card__image" />

          <div className="skeleton skeleton-card__title" />

          <div className="skeleton skeleton-card__price" />

          <div className="skeleton skeleton-card__line" />
          <div className="skeleton skeleton-card__line" />
          <div className="skeleton skeleton-card__line" />

          <div className="skeleton-card__buttons">
            <div className="skeleton skeleton-card__button" />
            <div className="skeleton skeleton-card__heart" />
          </div>
        </div>
      ))}
    </div>
  );
};
