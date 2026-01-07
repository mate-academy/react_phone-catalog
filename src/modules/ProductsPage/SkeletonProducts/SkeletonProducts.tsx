import style from './SkeletonProducts.module.scss';

export const SkeletonProducts = () => (
  <div className={style.skeleton}>
    <div className={style.skeleton__container}>
      <figure className={`image  is-skeleton ${style.skeleton__img}`}>
        <img alt="Placeholder" src="https://placehold.co/128x128" />
      </figure>

      <div
        className={`skeleton-block ${style.skeleton__name}`}
        style={{ margin: '0' }}
      ></div>
      <div
        className={`skeleton-block ${style.skeleton__price}`}
        style={{ margin: '0' }}
      ></div>
      <div>
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="buttons">
        <button className={`button is-skeleton ${style.skeleton__button}`}>
          Button
        </button>
        <button
          className={`button is-skeleton ${style.skeleton__favorite}`}
        ></button>
      </div>
    </div>
  </div>
);
