import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="not-found">
        <div className="page__title">Product was not found</div>
        <img
          src="img/page-not-found.png"
          alt="Page not found"
          className="not-found__img"
        />
      </div>
    </div>
  );
};
