import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1>Page not found</h1>
      <img
        src="../../../public/img/page-not-found.png"
        alt="Page not found"
        className={s.pagenotfound}
      />
    </div>
  );
};
