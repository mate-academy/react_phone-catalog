import style from './Loader.module.scss';

export const Loader = () => (
  <div className={style.wrapper}>
    <div className={style.spinner} />
  </div>
);
