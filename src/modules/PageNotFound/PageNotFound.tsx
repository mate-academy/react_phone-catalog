import style from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <section className={style['not-found']}>
      <h1 className={style['not-found__title']}>Page not found</h1>
      <div className={style['not-found__style']}></div>
    </section>
  );
};
