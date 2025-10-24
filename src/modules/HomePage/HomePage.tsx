/* eslint-disable max-len */
import { useEffect, CSSProperties } from 'react';
import styles from './HomePage.module.scss';
import hero from './components/Hero/Hero.module.scss';
import { Hero } from './components/Hero/Hero';
import productData from '../../../public/api/products.json';
import phonesData from '../../../public/api/phones.json';
import accessoriesData from '../../../public/api/accessories.json';
import tabletsData from '../../../public/api/tablets.json';
import { ProductData } from '../shared/types/ProductData';
import { Link } from 'react-router-dom';
import { Slider } from '../shared/components/Slider/Slider';

export const HomePage = () => {
  function filterUniqueProduct(arr: ProductData[], paramName: keyof ProductData) {
    const find = new Set();

    return arr.filter((obj: ProductData) => {
      const objValue = obj[paramName];

      if (find.has(objValue)) {
        return false;
      } else {
        find.add(objValue);

        return true;
      }
    });
  }

  const NEW_MODELS = 'Brand new models';
  const HOT_MODELS = 'Hot prices';

  const phones = productData.filter(item => item.category === 'phones');

  const uniqueProducts = filterUniqueProduct(phones, 'image');

  const newItems = uniqueProducts.filter(p => p.year >= 2022);
  const bestPriceItems = [...newItems].sort((p1, p2) => {
    return p2.fullPrice - p2.price - (p1.fullPrice - p1.price);
  });

  useEffect(() => {
    document.body.classList.add(styles.home__loaded);

    return () => document.body.classList.remove(styles.home__loaded);
  }, []);

  const heroSlideStyle = { ['--delay']: '80ms' } as CSSProperties;
  const newmodelsSlideStyle = { ['--delay']: '240ms' } as CSSProperties;
  const categorySlideStyle = { ['--delay']: '360ms' } as CSSProperties;
  const hotSlideStyle = { ['--delay']: '500ms' } as CSSProperties;

  return (
    <main className={styles.home}>
      <div className={styles.home__wrapper}>
        <div className={styles.home__container}>
          <section className={hero.hero} data-slide style={heroSlideStyle}>
            <h1 className={hero.hero__title}>Product Catalog</h1>
            <Hero />
          </section>
          <section className={styles.newmodels} data-slide style={newmodelsSlideStyle}>
            <Slider items={newItems} title={NEW_MODELS} />
          </section>
          <section className={styles.category} data-slide style={categorySlideStyle}>
            <h2 className={styles.category_title}>Shop by category</h2>
            <div className={styles.category__container}>
              <Link to={{ pathname: '/phones' }} className={styles.category__link}>
                <img src={`/img/Phones.png`} alt="phones" className={styles.category__image} />
                <div className={styles.category__description}>
                  <p className={styles.category__subtitle}>Mobile phones</p>
                  <div className={styles.category__content}>{`${phonesData.length} models`}</div>
                </div>
              </Link>

              <Link to={{ pathname: '/tablets' }} className={styles.category__link}>
                <img src={`/img/Tablets.png`} alt="tablets" className={styles.category__image} />
                <div className={styles.category__description}>
                  <p className={styles.category__subtitle}>Tablets</p>
                  <div className={styles.category__content}>{`${tabletsData.length} models`}</div>
                </div>
              </Link>

              <Link to={{ pathname: '/accessories' }} className={styles.category__link}>
                <img
                  src={`/img/Accessories.png`}
                  alt="accessories"
                  className={styles.category__image}
                />
                <div className={styles.category__description}>
                  <p className={styles.category__subtitle}>Accessories</p>
                  <div
                    className={styles.category__content}
                  >{`${accessoriesData.length} models`}</div>
                </div>
              </Link>
            </div>
          </section>
          <section className={styles.hot} data-slide style={hotSlideStyle}>
            <Slider items={bestPriceItems} title={HOT_MODELS} />
          </section>
        </div>
      </div>
    </main>
  );
};
