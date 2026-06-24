import style from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={style.container}>
      <span className={style.loader} />
    </div>
  );
};
