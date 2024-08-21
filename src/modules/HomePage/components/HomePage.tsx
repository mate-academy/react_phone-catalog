import React from 'react';
import styles from './Home.module.scss';
import './Home.module.scss';
import { WelcomeSlider } from './../../shared/welcomeSlider/WelcomeSlider';
import { ProductsSlider } from '../../shared/ProductsSlider//ProductsSlider';
import { useAppSelector } from '../../../app/hooks';
import { Link } from 'react-router-dom';
import { scrollPageUp } from './../../shared/scrollPageUp';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const productsFromServer = useAppSelector(state => state.products.objects);
  const phonesFromServer = useAppSelector(state => state.phones.objects);
  const tabletsFromServer = useAppSelector(state => state.tablets.objects);
  const accessoriesFromServer = useAppSelector(
    state => state.accessories.objects,
  );

  const { t } = useTranslation();

  const brandNewModels = Array.from(productsFromServer)
    .sort((prod1, prod2) => {
      return prod2.year - prod1.year;
    })
    .slice(0, 12);

  const hotPriceModels = productsFromServer
    .filter(prod => prod.fullPrice !== prod.price)
    .sort((prod1, prod2) => {
      return prod2.price - prod1.price;
    });

  return (
    <div id="homePage" className={styles.homePage}>
      <section className={styles.welcome}>
        <div className={styles.welcome__tittleWrapper}>
          <h1 className={styles.welcome__tittle}>{t('welcome_to_store')}</h1>
        </div>

        <div className={styles.welcome__swiper}>
          <WelcomeSlider />
        </div>
      </section>

      <section className={styles.newModels}>
        <div className={styles.newModels__swiper}>
          <ProductsSlider
            title={t('new_models_title')}
            gadgets={brandNewModels}
          />
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.categories__title}> {t('shop_by_category')} </h2>

        <div className={styles.categories__wraper}>
          <div className={styles.category}>
            <Link onClick={() => scrollPageUp()} to="/phones">
              <img
                className={styles.category__image}
                src="./img/phones-category.png"
                alt="phones"
              />
            </Link>

            <Link
              onClick={() => scrollPageUp()}
              className={styles.category__title}
              to="/phones"
            >
              {t('mobile phones')}
            </Link>
            <p className={styles.category__quantity}>
              {`${phonesFromServer.length} ${phonesFromServer.length === 1 ? t('model') : t('models')}`}
            </p>
          </div>

          <div className={styles.category}>
            <Link onClick={() => scrollPageUp()} to="/tablets">
              <img
                className={styles.category__image}
                src="./img/tablets-category.png"
                alt="tablets"
              />
            </Link>

            <Link
              onClick={() => scrollPageUp()}
              className={styles.category__title}
              to="/tablets"
            >
              {t('tablets')}
            </Link>
            <p className={styles.category__quantity}>
              {`${tabletsFromServer.length} ${phonesFromServer.length === 1 ? t('model') : t('models')}`}
            </p>
          </div>

          <div className={styles.category}>
            <Link onClick={() => scrollPageUp()} to="/accessories">
              <img
                className={styles.category__image}
                src="./img/accessories-category.png"
                alt="Accessories"
              />
            </Link>

            <Link
              onClick={() => scrollPageUp()}
              className={styles.category__title}
              to="accessories"
            >
              {t('accessories')}
            </Link>
            <p className={styles.category__quantity}>
              {`${accessoriesFromServer.length} ${phonesFromServer.length === 1 ? t('model') : t('models')}`}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.hot}>
        <div className={styles.hot__swiper}>
          <ProductsSlider title={t('hot_price')} gadgets={hotPriceModels} />
        </div>
      </section>
    </div>
  );
};
