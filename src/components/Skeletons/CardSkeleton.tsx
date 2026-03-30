import style from './CardSkeleton.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={style.cardskeleton}>
      <div
        className={`${style.cardskeleton__image} ${style.cardskeleton__shimmer}`}
      />

      <div
        className={`${style.cardskeleton__name} ${style.cardskeleton__shimmer}`}
      />

      <div
        className={`${style.cardskeleton__price} ${style.cardskeleton__shimmer}`}
      />

      <div style={{ marginTop: '16px' }}>
        <div
          className={`${style.cardskeleton__underline} ${style.cardskeleton__shimmer}`}
        />
        <div
          className={`${style.cardskeleton__char} ${style.cardskeleton__shimmer}`}
        />
        <div
          className={`${style.cardskeleton__char} ${style.cardskeleton__shimmer}`}
        />
        <div
          className={`${style.cardskeleton__char} ${style.cardskeleton__shimmer}`}
        />
      </div>

      <div className={style.flex}>
        <div
          className={`${style.cardskeleton__btn} ${style.cardskeleton__shimmer}`}
        />
        <div
          className={`${style.cardskeleton__btnSmall} ${style.cardskeleton__shimmer}`}
        />
      </div>
    </div>
  );
};
