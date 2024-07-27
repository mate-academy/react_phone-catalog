import React from 'react';
import styles from './Home.module.scss';
import './Home.module.scss';
import { WelcomeSwiper } from '../../shared/welcomeSwiper/WelcomeSwiper';
import { CardsSwiper } from '../../shared/cardsSwiper/CardsSwiper';
import { useAppSelector } from '../../../app/hooks';
import { HidenMenu } from '../../HidenMenu/components';

export const HomePage: React.FC = () => {
  const newModelsTitle = 'Brand new models';
  const hotTitle = 'Hot prices';

  const productsFromServer = useAppSelector(state => state.products.objects);
  const phonesFromServer = useAppSelector(state => state.phones.objects);
  const tabletsFromServer = useAppSelector(state => state.tablets.objects);
  const accessoriesFromServer = useAppSelector(
    state => state.accessories.objects,
  );

  return (
    <div id="homePage" className={styles.homePage}>
      <HidenMenu />

      <section className={styles.welcome}>
        <div className={styles.welcome__tittleWrapper}>
          <h1 className={styles.welcome__tittle}>
            Welcome to Nice <br className={styles.space} /> Gadgets store!
          </h1>
        </div>

        <div className={styles.welcome__swiper}>
          <WelcomeSwiper />
        </div>
      </section>

      <section className={styles.newModels}>
        <div className={styles.newModels__swiper}>
          <CardsSwiper title={newModelsTitle} gadgets={productsFromServer} />
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.categories__title}>Shop by category</h2>

        <div className={styles.categories__wraper}>
          <div className={styles.category}>
            <img
              className={styles.category__image}
              src="/img/phones-category.png"
              alt="phones"
            />
            <a className={styles.category__title} href="">
              Mobile phones
            </a>
            <p className={styles.category__quantity}>
              {`${phonesFromServer.length} models`}
            </p>
          </div>

          <div className={styles.category}>
            <img
              className={styles.category__image}
              src="/img/tablets-category.png"
              alt="tablets"
            />
            <a className={styles.category__title} href="">
              Tablets
            </a>
            <p
              className={styles.category__quantity}
            >{`${tabletsFromServer.length} models`}</p>
          </div>

          <div className={styles.category}>
            <img
              className={styles.category__image}
              src="/img/accessories-category.png"
              alt="Accessories"
            />
            <a className={styles.category__title} href="">
              Accesories
            </a>
            <p
              className={styles.category__quantity}
            >{`${accessoriesFromServer.length} models`}</p>
          </div>
        </div>
      </section>

      <section className={styles.hot}>
        <div className={styles.hot__swiper}>
          <CardsSwiper title={hotTitle} gadgets={productsFromServer} />
        </div>
      </section>
    </div>
  );
};
