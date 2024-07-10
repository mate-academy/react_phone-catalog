/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import Category from '../shared/Category';
import ProductLine from '../shared/ProductLine';
import styles from './MainPage.module.scss';
import { ProductContext } from '../../contexts/ProductContextProvider';
import classNames from 'classnames';

export const MainPage = () => {
  const { cards } = useContext(ProductContext);

  const newModels = cards.sort((c1, c2) => -(c1.year - c2.year)).slice(0, 4);

  const hotPrices = cards
    .sort((c1, c2) => c2.fullPrice - c2.price - (c1.fullPrice - c1.price))
    .slice(0, 4);

  return (
    <main className={styles.main}>
      <h2 className={styles.main__title}>Welcome to Nice Gadgets store!</h2>

      <section className={styles.main__carousel}>
        <div className={styles['main__carousel-slider']}>
          <div
            className={classNames(
              styles['main__carousel-arrow'],
              styles['main__carousel-arrow--left'],
            )}
          >
            <span></span>
          </div>

          <div className={styles['main__carousel-slider-tablet']}>
            <div className={styles['main__carousel-slider-wrapper']}>
              <div className={styles['main__carousel-slider-image']}></div>
            </div>
          </div>

          <div
            className={classNames(
              styles['main__carousel-arrow'],
              styles['main__carousel-arrow--right'],
            )}
          >
            <span></span>
          </div>
        </div>

        <div className={styles['main__carousel-nav']}>
          <div className={styles.main__dots}>
            <button
              className={`${styles.main__dot} ${styles['main__dot--active']}`}
            ></button>
            <button className={styles.main__dot}></button>
            <button className={styles.main__dot}></button>
          </div>
        </div>
      </section>

      <section className={styles.main__new}>
        <ProductLine title="Brand new models" cards={newModels} />
      </section>

      <section className={styles.main__categories}>
        <h2 className={styles['main__cat-title']}>Shop by category</h2>

        <div className={styles['main__categories-wrapper']}>
          <Category title="Mobile phones" desc="95 models" img="img/cat1.svg" />

          <Category title="Tablets" desc="24 models" img="img/cat2.svg" />

          <Category title="Accessories" desc="100 models" img="img/cat3.svg" />
        </div>
      </section>

      <section className={styles.main__hot}>
        <ProductLine title="Hot prices" cards={hotPrices} isHot />
      </section>
    </main>
  );
};
