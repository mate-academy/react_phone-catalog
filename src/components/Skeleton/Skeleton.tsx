import style from './skeleton.module.scss';

export const Skeleton = () => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={`${style.card} ${style.loading}`}>
          <div className={style.image}></div>
          <div className={style.content}>
            <div className={style.title}></div>
            <div className={style.description}></div>
          </div>
        </div>
      </div>
    </>
  );
};
