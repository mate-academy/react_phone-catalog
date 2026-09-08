import { NavLink } from 'react-router-dom';

import styles from './CategoryCards.module.scss';

// eslint-disable-next-line
import { productFilterByCategory } from '../../../../shared/utils/productFilterByCategory';
import { AllProducts } from '../../../../shared/types/AllProducts/AllProducts';

import PhonesMobile from '../../../../assets/images/shopCategory/phones-mobile.png'; // eslint-disable-line
import PhonesTablet from '../../../../assets/images/shopCategory/phones-tablet.png'; // eslint-disable-line
import PhonesDesktop from '../../../../assets/images/shopCategory/phones-desktop.png'; // eslint-disable-line

import TabletsMobile from '../../../../assets/images/shopCategory/tablets-mobile.png'; // eslint-disable-line
import TabletsTablet from '../../../../assets/images/shopCategory/tablets-tablet.png'; // eslint-disable-line
import TabletsDesktop from '../../../../assets/images/shopCategory/tablets-desktop.png'; // eslint-disable-line

import AccMobile from '../../../../assets/images/shopCategory/accessories-mobile.png'; // eslint-disable-line
import AccTablet from '../../../../assets/images/shopCategory/accessories-tablet.png'; // eslint-disable-line
import AccDesktop from '../../../../assets/images/shopCategory/accessories-desktop.png'; // eslint-disable-line

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
              <source media="(min-width: 1119px)" srcSet={PhonesDesktop} />
              <source media="(min-width: 639px)" srcSet={PhonesTablet} />

              <NavLink to="/phones">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src={PhonesMobile}
                  alt="Зображення категорії мобільних телефонів"
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
              <source media="(min-width: 1119px)" srcSet={TabletsDesktop} />
              <source media="(min-width: 639px)" srcSet={TabletsTablet} />

              <NavLink to="/tablets">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src={TabletsMobile}
                  alt="Зображення категорії планшетів"
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
              <source media="(min-width: 1119px)" srcSet={AccDesktop} />
              <source media="(min-width: 639px)" srcSet={AccTablet} />

              <NavLink to="/accessories">
                <img
                  loading="lazy"
                  className={styles.category__image}
                  src={AccMobile}
                  alt="Зображення категорії аксесуарів"
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
