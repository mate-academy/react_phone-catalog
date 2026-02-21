import './Loader.scss';

export const Loader = () => {
  return (
    <div className="custom-loader">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton__content">
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-value"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton__buttons">
              <div className="skeleton skeleton__button-add"></div>
              <div className="skeleton skeleton__button-favorite"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
