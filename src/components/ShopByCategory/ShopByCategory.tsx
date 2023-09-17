import { FC } from 'react';
import { Link } from 'react-router-dom';
import phones from './assets/category-phones.png';
import tablets from './assets/category-tablets.png';
import accessories from './assets/category-accessories.png';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: FC = () => {
  return (
    <section className={styles.category}>
      <h1 className={styles.title}>
        Shop by category
      </h1>
      <div className={styles.container}>
        <Link
          to="/phones"
          data-cy="categoryLinksContainer"
          className={styles.link}
        >
          <div
            className={styles.card}
          >
            <img
              src={phones}
              alt="Phones"
              className={styles.image}
            />
            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Mobile phones
              </h2>
              <h3 className={styles.models}>
                95 models
              </h3>
            </div>
          </div>
        </Link>

        <Link
          to="/tablets"
          data-cy="categoryLinksContainer"
          className={styles.link}
        >
          <div
            className={styles.card}
          >
            <img
              src={tablets}
              alt="Tablets"
              className={styles.image}
            />
            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Tablets
              </h2>
              <h3 className={styles.models}>
                24 models
              </h3>
            </div>
          </div>
        </Link>

        <Link
          to="/accessories"
          className={styles.link}
        >
          <div
            className={styles.card}
            data-cy="categoryLinksContainer"
          >
            <img
              src={accessories}
              alt="Accessories"
              className={styles.image}
            />
            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Accessories
              </h2>
              <h3 className={styles.models}>
                100 models
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
