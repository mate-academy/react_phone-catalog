import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">Page not found</h1>
      <img
        className="page-not-found__image"
        src="./img/page-not-found.png"
        alt="page not found"
      />
    </div>
  );
};
