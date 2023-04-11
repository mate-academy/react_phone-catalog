import './NotFoundPage.scss';

export const NotFoundPAge = () => {
  return (
    <section className="notFound">
      <img
        src="Images/404-page-not-found.png"
        alt=""
        className="notFound__img"
      />

      <div>
        <p className="notFound__error">404</p>
        <p className="notFound__message">
          Unfortunately, this page address was not found. Page does not exist
        </p>
      </div>
    </section>
  );
};
