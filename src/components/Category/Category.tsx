import classNames from 'classnames';
import styles from './Category.module.scss';

export const Category = () => {
  return (
    <section className="category" id="category">
      <h3 className={styles.category__title}>Shop by category</h3>

      <div className={styles.category__wrapper}>
        <div className={classNames(styles.category__card)}>
          <a
            href="#"
            className={classNames(
              styles.category__link,
              styles['category__link--phones'],
            )}
          ></a>

          <div className={styles.category__details}>
            <h4 className="category__subTitle">Mobile phones</h4>
            <p className="body-text">95 models</p>
          </div>
        </div>

        <div className={classNames(styles.category__card)}>
          <a
            href="#"
            className={classNames(
              styles.category__link,
              styles['category__link--tablets'],
            )}
          ></a>

          <div className={styles.category__details}>
            <h4 className="category__subTitle">Tablets</h4>
            <p className="body-text">24 models</p>
          </div>
        </div>

        <div className={classNames(styles.category__card)}>
          <a
            href="#"
            className={classNames(
              styles.category__link,
              styles['category__link--accessories'],
            )}
          ></a>

          <div className={styles.category__details}>
            <h4 className="category__subTitle">Accessories</h4>
            <p className="body-text">100 models</p>
          </div>
        </div>
      </div>
    </section>
  );
};
