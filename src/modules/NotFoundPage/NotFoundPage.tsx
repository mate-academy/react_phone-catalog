import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="notFoundPage container">
    <div className="notFoundPage__wrap">
      <p className="h2 notFoundPage__title container">
        Ooops... Page not found.
      </p>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className="notFoundPage__image"
      />
    </div>
  </div>
);
