import classNames from 'classnames';
import styles from './DetailsSkeleton.module.scss';

export const DetailsSkeleton = () => {
  return (
    <div className={styles.skelton}>
      <h2 className={classNames('is-skeleton', styles.title)}>
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h2>
      <div className={styles.imageSlider}>
        <div className={styles.smallImg}>
          <div
            className={classNames('is-skeleton', styles.smallImg__item)}
          ></div>
          <div
            className={classNames('is-skeleton', styles.smallImg__item)}
          ></div>
          <div
            className={classNames('is-skeleton', styles.smallImg__item)}
          ></div>
          <div
            className={classNames('is-skeleton', styles.smallImg__item)}
          ></div>
          <div
            className={classNames('is-skeleton', styles.smallImg__item)}
          ></div>
        </div>
        <div className={classNames('is-skeleton', styles.bidImg)}></div>
      </div>
      <div className={styles.mainSpec}>
        <p className="has-skeleton">Available colors</p>
        <div className={styles.colors}>
          <div className={classNames('is-skeleton', styles.color)}></div>
          <div className={classNames('is-skeleton', styles.color)}></div>
          <div className={classNames('is-skeleton', styles.color)}></div>
          <div className={classNames('is-skeleton', styles.color)}></div>
        </div>
        <p className="has-skeleton">Select capacity</p>
        <div className={styles.capacities}>
          <div className={classNames('is-skeleton', styles.capacity)}></div>
          <div className={classNames('is-skeleton', styles.capacity)}></div>
          <div className={classNames('is-skeleton', styles.capacity)}></div>
        </div>

        <p className="has-skeleton">$375 $400</p>
        <div className={styles.buttons}>
          <div className={classNames('is-skeleton', styles.button)}></div>
          <div className={classNames('is-skeleton', styles.icon)}></div>
        </div>
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.about}>
        <p className="has-skeleton">About</p>
        <div className="skeleton-lines">
          <p className="has-skeleton"> And then there was Pro</p>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="skeleton-lines">
          <p className="has-skeleton"> And then there was Pro</p>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="skeleton-lines">
          <p className="has-skeleton"> And then there was Pro</p>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.techSpec}>
        <p className="has-skeleton">Tech specs</p>
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
