import style from './Loader.module.scss';

export const Loader = () => (
  <div className={style.loader} data-cy="Loader">
    <div className={style.loader__content}></div>
  </div>
);
