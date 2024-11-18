import style from './PageNotFoundPage.module.scss';

export const PageNotFoundPage = () => {
  return (
    <div className={style.page_not_found_container}>
      <h3>Sorry Page Not Found</h3>
      <div className={style.img}></div>
    </div>
  );
};
