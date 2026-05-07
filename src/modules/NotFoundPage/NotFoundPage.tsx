import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={s.notFoundPage}>
      <img
        className={s.notFoundPage__img}
        src="./img/page-not-found.png"
        alt="page-not-found"
      />
    </div>
  );
};
