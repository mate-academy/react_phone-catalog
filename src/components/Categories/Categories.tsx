import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className="container">
        <h1 className="title">Shop by category</h1>
        <div className={styles.categories__items}>
          <div className={styles.categories__item}>
            <Link className={styles['categories__item-imglink']} to="/phones">
              <img
                className={styles['categories__item-img']}
                src="./img/categories/phones.png"
                alt="Mobile phones"
              />
            </Link>
            <div className={styles['categories__item-box']}>
              <Link
                className={styles['categories__item-titlelink']}
                to="/phones"
              >
                <h4 className={styles['categories__item-title']}>
                  Mobile phones
                </h4>
              </Link>
              <p className={styles['categories__item-text']}>124 models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <Link className={styles['categories__item-imglink']} to="/tablets">
              <img
                className={styles['categories__item-img']}
                src="./img/categories/tablets.png"
                alt="Tablets"
              />
            </Link>
            <div className={styles['categories__item-box']}>
              <Link
                className={styles['categories__item-titlelink']}
                to="/tablets"
              >
                <h4 className={styles['categories__item-title']}>Tablets</h4>
              </Link>
              <p className={styles['categories__item-text']}>36 models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <Link
              className={styles['categories__item-imglink']}
              to="/accessories"
            >
              <img
                className={styles['categories__item-img']}
                src="./img/categories/accessories.png"
                alt="Accessories"
              />
            </Link>
            <div className={styles['categories__item-box']}>
              <Link
                className={styles['categories__item-titlelink']}
                to="/accessories"
              >
                <h4 className={styles['categories__item-title']}>
                  Accessories
                </h4>
              </Link>
              <p className={styles['categories__item-text']}>34 models</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
