import React from 'react';
import Styles from './SkeletonDetails.module.scss';

export const SkeletonDetails: React.FC = () => {
  return (
    <div className={Styles.skeleton}>
      <div
        className={`${Styles.skeleton__title} ${Styles.skeleton__animate}`}
      ></div>

      <div className={Styles.skeleton__slider}>
        <div className={`${Styles.skeleton__slider__container} ${Styles.skeleton__animate}`}>
          <div
            className={`${Styles.skeleton__slider__container__img} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__container__img} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__container__img} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__container__img} ${Styles.skeleton__animate}`}
          />
        </div>

        <div className={Styles.skeleton__slider__picker}>
          <div
            className={`${Styles.skeleton__slider__picker__item} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__picker__item} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__picker__item} ${Styles.skeleton__animate}`}
          />
          <div
            className={`${Styles.skeleton__slider__picker__item} ${Styles.skeleton__animate}`}
          />
        </div>
      </div>

      <div className={Styles.skeleton__colors}>
        <div className={Styles.skeleton__colors__paragraphs}>
          <p
            className={`${Styles.skeleton__colors__paragraphs__item} ${Styles.skeleton__animate}`}
          ></p>
          <p
            className={`${Styles.skeleton__colors__paragraphs__item} ${Styles.skeleton__animate}`}
          ></p>
        </div>

        <div className={Styles.skeleton__colors__container}>
          <div
            className={`${Styles['skeleton__colors__container__item']} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles['skeleton__colors__container__item']} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles['skeleton__colors__container__item']} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles['skeleton__colors__container__item']} ${Styles.skeleton__animate}`}
          ></div>
        </div>

        <div
        className={`${Styles.skeleton__colors__separator} ${Styles.skeleton__animate}`}
      />
      </div>

      <div className={Styles.skeleton__capacity}>
        <p
          className={`${Styles.skeleton__capacity__paragraph} ${Styles.skeleton__animate}`}
        ></p>

        <div className={Styles.skeleton__capacity__container}>
          <div
            className={`${Styles.skeleton__capacity__container__item} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles.skeleton__capacity__container__item} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles.skeleton__capacity__container__item} ${Styles.skeleton__animate}`}
          ></div>
        </div>

        <div
        className={`${Styles.skeleton__capacity__separator} ${Styles.skeleton__animate}`}
      />
      </div>

      <div className={Styles.skeleton__price}>
        <div className={Styles.skeleton__price__container}>
          <p
            className={`${Styles.skeleton__price__discount} ${Styles.skeleton__animate}`}
          ></p>
          <p
            className={`${Styles.skeleton__price__full} ${Styles.skeleton__animate}`}
          ></p>
        </div>

        <div className={Styles.skeleton__price__container}>
          <div
            className={`${Styles.skeleton__price__add} ${Styles.skeleton__animate}`}
          ></div>
          <div
            className={`${Styles.skeleton__price__fav} ${Styles.skeleton__animate}`}
          />
        </div>
      </div>

      <div className={Styles.skeleton__info}>
        <p

        >
          <span
            className={`${Styles.skeleton__info__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__info__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__info__paragraph}
        >
          <span
            className={`${Styles.skeleton__info__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__info__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__info__paragraph}
        >
          <span
            className={`${Styles.skeleton__info__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__info__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__info__paragraph}
        >
          <span
            className={`${Styles.skeleton__info__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__info__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>
      </div>

      <div className={Styles.skeleton__description}>
        <p
          className={`${Styles.skeleton__description__title} ${Styles.skeleton__animate}`}
        ></p>

        <div
          className={`${Styles.skeleton__description__separator} ${Styles.skeleton__animate}`}
        />

        <p
          className={`${Styles.skeleton__description__title} ${Styles.skeleton__animate}`}
        ></p>
        <article
          className={`${Styles.skeleton__description__article} ${Styles.skeleton__animate}`}
        ></article>

        <p
          className={`${Styles.skeleton__description__title} ${Styles.skeleton__animate}`}
        ></p>
        <article
          className={`${Styles.skeleton__description__article} ${Styles.skeleton__animate}`}
        ></article>

        <p
          className={`${Styles.skeleton__description__title} ${Styles.skeleton__animate}`}
        ></p>
        <article
          className={`${Styles.skeleton__description__article} ${Styles.skeleton__animate}`}
        ></article>
      </div>

      <div className={Styles.skeleton__tech}>
        <p
          className={`${Styles.skeleton__tech__title} ${Styles.skeleton__animate}`}
        ></p>

        <div
          className={Styles.skeleton__tech__separator}
        />

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>

        <p
          className={Styles.skeleton__tech__paragraph}
        >
          <span
            className={`${Styles.skeleton__tech__paragraph__name} ${Styles.skeleton__animate}`}
          ></span>
          <span
            className={`${Styles.skeleton__tech__paragraph__value} ${Styles.skeleton__animate}`}
          ></span>
        </p>
      </div>
    </div>
  );
};
