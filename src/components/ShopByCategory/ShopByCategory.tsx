import { FC } from 'react';
import { Link } from 'react-router-dom';
import phones from './assets/category-phones.png';
import tablets from './assets/category-tablets.png';
import accessories from './assets/category-accessories.png';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../types/Product';

type Props = {
  phone: Product[];
  tablet: Product[];
  accessory: Product[];
};

export const ShopByCategory: FC<Props> = ({
  phone,
  tablet,
  accessory,
}) => {
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
            <div className={styles.card__container}>
              <img
                src={phones}
                alt="Phones"
                className={styles.image}
              />
            </div>

            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Mobile phones
              </h2>
              <h3 className={styles.models}>
                {`${phone.length} models`}
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
            <div className={styles.card__container}>
              <img
                src={tablets}
                alt="Tablets"
                className={styles.image}
              />
            </div>

            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Tablets
              </h2>
              <h3 className={styles.models}>
                {`${tablet.length} models`}
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
            <div className={styles.card__container}>
              <img
                src={accessories}
                alt="Accessories"
                className={styles.image}
              />
            </div>

            <div className="subtitles">
              <h2 className={styles.subtitle}>
                Accessories
              </h2>
              <h3 className={styles.models}>
                {`${accessory.length} models`}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
