import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <section className={style.notFound}>
        <h1>Page not found</h1>
        <img
          className={style.notFound__image}
          src="src\pages\NotFoundPage\assets\page-not-found.png"
          alt="page not found image"
        />
      </section>
    </>
  );
};
