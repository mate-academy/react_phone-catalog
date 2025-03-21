import classNames from 'classnames';
import styles from './CategorySceleton.module.scss';

export const CategorySceleton = () => {
  return (
    <main className={styles.category}>
      <div className="page-container">
        <div className={styles.category__top}>
          <div
            className={classNames('is-skeleton', styles.category__breads)}
          ></div>
          <h1 className={classNames('is-skeleton', styles.category__title)}>
            Mobile Phones
          </h1>
          <p className={classNames('is-skeleton', styles.category__models)}>
            95 models
          </p>
        </div>
        <div className={styles.category__bottom}>
          <div className={styles.sort}>
            <div className={styles.sort__item}>
              <p className="is-skeleton">Sort By</p>
              <div className={classNames('is-skeleton', styles.sort__dropDown)}>
                Dropdown
              </div>
            </div>
            <div className={styles.sort__item}>
              <p className="is-skeleton">Sort By</p>
              <div className={classNames('is-skeleton', styles.sort__dropDown)}>
                Dropdown
              </div>
            </div>
          </div>
          <ul className={styles.cards}>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
          </ul>
          <ul className={styles.pagination}>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
            <li className="is-skeleton"></li>
          </ul>
        </div>
      </div>
    </main>
  );
};
