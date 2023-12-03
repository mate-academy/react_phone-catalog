import './notFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__text">Page not found</h1>
      <div className="not-found-page__smile">
        <img
          className="not-found-page__smile-image"
          src="img/utils/smile.png"
          alt="smile-sad"
        />
      </div>
    </div>
  );
};
