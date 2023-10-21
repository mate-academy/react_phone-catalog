import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <main className="page__main">
      <div className="container">
        <div className="pageNotFound__wrap">
          <p
            className="pageNotFound__text"
          >
            Page not found, please return back
          </p>
          <div className="pageNotFound__img" />
        </div>
      </div>
    </main>
  );
};
