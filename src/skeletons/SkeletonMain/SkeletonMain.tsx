import Style from './SkeletonMain.module.scss';

export const SkeletonMain: React.FC = () => {
  return (
    <>
      <div className={Style.skeleton}>
        <h1
          className={`${Style['skeleton__title']} ${Style['skeleton__title--h1']} ${Style.skeleton__animate}`}
        ></h1>

        <div className={`${Style.skeleton__img} ${Style.skeleton__animate}`} />

        <h2 className={Style['skeleton__title-h2']}></h2>

        <h2
          className={`${Style.skeleton__title} ${Style['skeleton__title--h2']} ${Style.skeleton__animate}`}
        ></h2>

        <div className={Style['skeleton__container_3']}>
          <div
            className={`${Style['skeleton__container_3__picture']} ${Style.skeleton__animate}`}
          />

          <div
            className={`${Style['skeleton__container_3__picture']} ${Style.skeleton__animate}`}
          />
        </div>

        <div className={Style['skeleton__container--2']}>
          <div className={Style.skeleton__item}>
            <div
              className={`${Style.skeleton__item__picture} ${Style.skeleton__animate}`}
            />
            <h3
              className={`${Style.skeleton__item__title} ${Style.skeleton__animate}`}
            ></h3>
            <p
              className={`${Style.skeleton__item__paragraph} ${Style.skeleton__animate}`}
            ></p>
          </div>

          <div className={Style.skeleton__item}>
            <div
              className={`${Style.skeleton__item__picture} ${Style.skeleton__animate}`}
            />
            <h3
              className={`${Style.skeleton__item__title} ${Style.skeleton__animate}`}
            ></h3>
            <p
              className={`${Style.skeleton__item__paragraph} ${Style.skeleton__animate}`}
            ></p>
          </div>

          <div className={Style.skeleton__item}>
            <div
              className={`${Style.skeleton__item__picture} ${Style.skeleton__animate}`}
            />
            <h3
              className={`${Style.skeleton__item__title} ${Style.skeleton__animate}`}
            ></h3>
            <p
              className={`${Style.skeleton__item__paragraph} ${Style.skeleton__animate}`}
            ></p>
          </div>
        </div>

        <h2
          className={`${Style.skeleton__title} ${Style['skeleton__title--h2']} ${Style.skeleton__animate}`}
        ></h2>

        <div className={Style['skeleton__container_3']}>
          <div
            className={`${Style['skeleton__container_3__picture']} ${Style.skeleton__animate}`}
          />

          <div
            className={`${Style['skeleton__container_3__picture']} ${Style.skeleton__animate}`}
          />
        </div>
      </div>
    </>
  );
};
