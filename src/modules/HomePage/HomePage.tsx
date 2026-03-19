import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Preview } from './components/Preview';
import { ProductColection } from '../../components/layout/ProductColection';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { ProductsContext } from '../../store/ProductsProvider';
import { imageUrl } from '../../utils/imageUrl';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const products = useContext(ProductsContext);

  const getNewest = () => {
    if (!products.length) {
      return null;
    }

    const lastYear = products.reduce((max, item) =>
      item.year > max.year ? item : max,
    ).year;
    const newest = products.filter(item => item.year === lastYear);

    return newest;
  };

  const getHotPrices = () => {
    if (!products.length) {
      return null;
    }

    return products
      .slice()
      .sort((a, b) => {
        const discountMin = a.fullPrice ? a.fullPrice - a.price : 0;
        const discountMax = b.fullPrice ? b.fullPrice - b.price : 0;

        return discountMax - discountMin;
      })
      .slice(0, 24);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <Preview />
      <div className={styles.content}>
        <ProductColection title="Brand new models" products={getNewest()} />
        <section className={styles.category}>
          <SectionTitle>Shop by category</SectionTitle>
          <div className={styles.category__content}>
            <div className={styles.category__block}>
              <Link to="#" className={styles.category__link}>
                <img
                  src={imageUrl('img/Phones.png')}
                  alt=""
                  className={styles.category__img}
                />
              </Link>
              <h3 className={styles.category__title}>Mobile phones</h3>
              <p className={styles.category__info}>95 models</p>
            </div>
            <div className={styles.category__block}>
              <Link to="#" className={styles.category__link}>
                <img
                  src={imageUrl('img/Tablets.png')}
                  alt=""
                  className={styles.category__img}
                />
              </Link>
              <h3 className={styles.category__title}>Tablets</h3>
              <p className={styles.category__info}>24 models</p>
            </div>
            <div className={styles.category__block}>
              <Link to="#" className={styles.category__link}>
                <img
                  src={imageUrl('img/Accessories.png')}
                  alt=""
                  className={styles.category__img}
                />
              </Link>
              <h3 className={styles.category__title}>Accessories</h3>
              <p className={styles.category__info}>3 models</p>
            </div>
          </div>
        </section>
        <ProductColection title="Hot prices" products={getHotPrices()} />
      </div>
    </>
  );
};
