import s from './SkeletonCard.module.scss';

export const SkeletonCard = () => {
  return (
    <div className={`${s.card} ${s.loading}`}>
      <div className={s.card__img}></div>
      <div className={s.card__title}></div>
      <div className={s.card__price}></div>
      <div className={s.card__divider}></div>
      <div className={s.card__specs}></div>
      <div className={s.card__buttons}>
        <div className={s.card__buttons_add}></div>
        <div className={s.card__buttons_like}></div>
      </div>
    </div>
  );
};
