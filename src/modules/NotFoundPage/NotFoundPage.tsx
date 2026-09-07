import style from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={style.notFoundPage}>
      <p className={style.notFoundPage__text}>Page not found</p>
    <img className={style.notFoundPage__image} src="./img/product-not-found.png" alt="" />
    </div>
  );
}