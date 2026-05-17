import style from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <div className={style.wrapper}>
      <img src="./img/page-not-found.png" alt="" className={style.background} />
      <p className={style.text}>Page Not Found</p>
    </div>
  );
};
