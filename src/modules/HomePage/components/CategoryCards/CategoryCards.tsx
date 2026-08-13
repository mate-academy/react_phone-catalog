import { AllProducts } from '../../../../shared/types/AllProduct/AllProduct';
import styles from './CategoryCards.module.scss';

import PhonesMobile from '../../../../assets/images/homePageCategory/mobile-phones.png';
import PhonesTablet from '../../../../assets/images/homePageCategory/tablet-phones.png';
import PhonesDesktop from '../../../../assets/images/homePageCategory/desktop-phones.png';

import TabletsMobile from '../../../../assets/images/homePageCategory/mobile-tablets.png';
import TabletsTablet from '../../../../assets/images/homePageCategory/tablet-tablets.png';
import TabletsDesktop from '../../../../assets/images/homePageCategory/desktop-tablets.png';

import AccessoriesMobile from '../../../../assets/images/homePageCategory/mobile-accessories.png';
import Accessoriesablet from '../../../../assets/images/homePageCategory/tablet-accessories.png';
import AccessoriesDesktop from '../../../../assets/images/homePageCategory/desktop-accessories.png';
import { Link } from 'react-router-dom';

type Props = {
  data: AllProducts[];
};

export const CategoryCards: React.FC<Props> = () => {
  return (
    <section className={styles.category}>
      <div className={styles.category__container}>
        <h2 className={styles.category__title}>Shop by category</h2>
        <div className={styles.category__cards}>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source media="(min-width: 1119px)" srcSet={PhonesDesktop} />
              <source media="(min-width: 639px)" srcSet={PhonesTablet} />

              <Link to="phones">
                <img
                  src={PhonesMobile}
                  alt="Зображення категорії мобільних телефонів"
                  className={styles.category__image}
                />
              </Link>
            </picture>
            <h4 className={styles.category__cardTitle}>Mobile phones</h4>
            <p className={styles.category__cardDescription}>{`90 models`}</p>
          </div>

          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source media="(min-width: 1119px)" srcSet={TabletsDesktop} />
              <source media="(min-width: 639px)" srcSet={TabletsTablet} />

              <Link to="tablets">
                <img
                  src={TabletsMobile}
                  alt="Зображення категорії мобільних телефонів"
                  className={styles.category__image}
                />
              </Link>
            </picture>
            <h4 className={styles.category__cardTitle}>Tablets</h4>
            <p className={styles.category__cardDescription}>{`90 models`}</p>
          </div>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source media="(min-width: 1119px)" srcSet={AccessoriesDesktop} />
              <source media="(min-width: 639px)" srcSet={Accessoriesablet} />

              <Link to="accessories">
                <img
                  src={AccessoriesMobile}
                  alt="Зображення категорії мобільних телефонів"
                  className={styles.category__image}
                />
              </Link>
            </picture>
            <h4 className={styles.category__cardTitle}>Accessories</h4>
            <p className={styles.category__cardDescription}>{`90 models`}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
