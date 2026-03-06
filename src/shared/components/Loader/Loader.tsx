import s from './Loader.module.scss';

export const Loader = () => (
  <div className={s.loaderContainer}>
    <div className={s.spinner}></div>
  </div>
);
