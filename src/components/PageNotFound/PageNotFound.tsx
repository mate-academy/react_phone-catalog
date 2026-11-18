import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <main className="page-not-found__main">
      <div className="page-not-found__content">
        <div className="page-not-found__img--wrapper">
          <img className="page-not-found__img" src="img/page-not-found.png" alt="" />
        </div>
        <div className="page-not-found__title">
          Page not found
        </div>
      </div>
    </main>
  );
}
