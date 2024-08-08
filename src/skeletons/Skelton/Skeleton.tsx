import React from 'react';
import Style from './Skeleton.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={Style.skeleton}>
      <div className={Style.skeleton__head}>
        <div
          className={`${Style.skeleton__head__title} ${Style.skeleton__animate}`}
        ></div>
        <div
          className={`${Style.skeleton__head__paragraph} ${Style.skeleton__animate}`}
        ></div>
      </div>

      <div className={Style.skeleton__filters}>
        <div className={Style.skeleton__filters__sort}>
          <div
            className={`${Style.skeleton__filters__sort__label} ${Style.skeleton__animate}`}
          ></div>
          <div
            className={`${Style.skeleton__filters__sort__select} ${Style.skeleton__animate}`}
          ></div>
        </div>

        <div className={Style.skeleton__filters__items}>
          <div
            className={`${Style.skeleton__filters__items__label} ${Style.skeleton__animate}`}
          ></div>
          <div
            className={`${Style.skeleton__filters__items__select} ${Style.skeleton__animate}`}
          ></div>
        </div>
      </div>

      <div className={Style.skeleton__container}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={Style.skeleton__container__card}>
            <div
              className={`${Style.skeleton__container__card__img} ${Style.skeleton__animate}`}
            ></div>
            <div
              className={`${Style.skeleton__container__card__title} ${Style.skeleton__animate}`}
            ></div>
            <div
              className={`${Style.skeleton__container__card__paragraph} ${Style.skeleton__animate}`}
            ></div>
          </div>
        ))}
      </div>

      <div className={Style.skeleton__pagination}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`${Style.skeleton__pagination__item} ${Style.skeleton__animate}`}
          ></div>
        ))}
      </div>
    </div>
  );
};
