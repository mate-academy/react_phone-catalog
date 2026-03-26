import notFoundPage from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={notFoundPage.notFoundPage}>
      <h1 className={notFoundPage.notFoundPage__title}>Page not found</h1>

      <div className={notFoundPage.notFoundPage__image}></div>
    </div>
  );
};
