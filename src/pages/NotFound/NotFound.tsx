import './NotFound.scss';

export const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found__title">Page Not Found</h1>

    <img
      src={`./img/page-not-found.png`}
      alt="Page not found"
      className="not-found__image"
    />
  </div>
);
