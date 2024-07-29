import React from 'react';
import styles from './Home.module.scss';
import './Home.module.scss';
import { WelcomeSlider } from './../../shared/welcomeSlider/WelcomeSlider';
import { ProductsSlider } from '../../shared/ProductsSlider//ProductsSlider';
import { useAppSelector } from '../../../app/hooks';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const NEW_MODELS_TITLE = 'Brand new models';
  const HOT_TITLE = 'Hot prices';

  const productsFromServer = useAppSelector(state => state.products.objects);
  const phonesFromServer = useAppSelector(state => state.phones.objects);
  const tabletsFromServer = useAppSelector(state => state.tablets.objects);
  const accessoriesFromServer = useAppSelector(
    state => state.accessories.objects,
  );

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
          <h1 className={styles.welcome__tittle}>
            Welcome to Nice <br className={styles.space} /> Gadgets store!
          </h1>
        </div>

        <div className={styles.welcome__swiper}>
          <WelcomeSlider />
        </div>
      </section>

      <section className={styles.newModels}>
        <div className={styles.newModels__swiper}>
          <ProductsSlider title={NEW_MODELS_TITLE} gadgets={brandNewModels} />
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.categories__title}>Shop by category</h2>

        <div className={styles.categories__wraper}>
          <div className={styles.category}>
            <Link to="/phones">
              <img
                className={styles.category__image}
                src="/img/phones-category.png"
                alt="phones"
              />
            </Link>

            <Link className={styles.category__title} to="/phones">
              Mobile phones
            </Link>
            <p className={styles.category__quantity}>
              {`${phonesFromServer.length} models`}
            </p>
          </div>

          <div className={styles.category}>
            <Link to="/tablets">
              <img
                className={styles.category__image}
                src="/img/tablets-category.png"
                alt="tablets"
              />
            </Link>

            <Link className={styles.category__title} to="/tablets">
              Tablets
            </Link>
            <p
              className={styles.category__quantity}
            >{`${tabletsFromServer.length} models`}</p>
          </div>

          <div className={styles.category}>
            <Link to="/accessories">
              <img
                className={styles.category__image}
                src="/img/accessories-category.png"
                alt="Accessories"
              />
            </Link>

            <Link className={styles.category__title} to="accessories">
              Accesories
            </Link>
            <p
              className={styles.category__quantity}
            >{`${accessoriesFromServer.length} models`}</p>
          </div>
        </div>
      </section>

      <section className={styles.hot}>
        <div className={styles.hot__swiper}>
          <ProductsSlider title={HOT_TITLE} gadgets={hotPriceModels} />
        </div>
      </section>
    </div>
  );
};
