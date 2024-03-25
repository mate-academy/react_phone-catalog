import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Page not found</h1>
      <img className={style.img} src="/img/page-not-found.png" alt="" />
    </div>
  );
};
