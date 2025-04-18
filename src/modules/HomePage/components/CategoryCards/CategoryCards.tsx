import { NavLink } from 'react-router-dom';

import styles from './CategoryCards.module.scss';

// eslint-disable-next-line
import { productFilterByCategory } from '../../../../shared/utils/productFilterByCategory';
import { AllProducts } from '../../../../shared/types/AllProducts/AllProducts';

type Props = {
  data: AllProducts[];
};

export const CategoryCards: React.FC<Props> = ({ data }) => {
  const phonesLength = productFilterByCategory(data, '/phones').length;
  const tabletsLength = productFilterByCategory(data, '/tablets').length;
  const accessoriesLength = productFilterByCategory(
    data,
    '/accessories',
  ).length;

  return (
    <section className={styles.category}>
      <div className={styles.category__container}>
        <h2 className={styles.category__title}>Shop by category</h2>

        <div className={styles.category__cards}>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-phones-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-phones-tablet.png" // eslint-disable-line
              />

              <NavLink to="/phones">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src="src\assets\images\shopCategory\shop-category-phones-mobile.png" // eslint-disable-line
                  alt="Головний слайдер"
                />
              </NavLink>
            </picture>
            <h4 className={styles.category__cardTitle}>Mobile phones</h4>
            <p className={styles.category__cardDescription}>
              {`${phonesLength} models`}
            </p>
          </div>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-tablets-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-tablets-tablet.png" // eslint-disable-line
              />

              <NavLink to="/tablets">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src="src\assets\images\shopCategory\shop-category-tablets-mobile.png" // eslint-disable-line
                  alt="Головний слайдер"
                />
              </NavLink>
            </picture>
            <h4 className={styles.category__cardTitle}>Tablets</h4>
            <p
              className={styles.category__cardDescription}
            >{`${tabletsLength} models`}</p>
          </div>

          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-accessories-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-accessories-tablet.png" // eslint-disable-line
              />

              <NavLink to="/accessories">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src="src\assets\images\shopCategory\shop-category-accessories-mobile.png" // eslint-disable-line
                  alt="Головний слайдер"
                />
              </NavLink>
            </picture>
            <h4 className={styles.category__cardTitle}>Accessories</h4>
            <p
              className={styles.category__cardDescription}
            >{`${accessoriesLength} models`}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
