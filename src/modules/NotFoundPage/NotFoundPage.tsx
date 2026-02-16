import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <>
      <section className="NotFoundPage wrapper">
        <div className="grid">
          <h1>Page not found</h1>
          <img
            src="img/page-not-found.png"
            alt="Not found"
            className="NotFoundImage"
          />
        </div>
      </section>
    </>
  );
};
