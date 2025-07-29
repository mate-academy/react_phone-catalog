import { FC, useMemo } from 'react';

import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../../../context/store';

export const ShopByCategory: FC = () => {
  const { products } = useGlobalState();

  const { phonesAmount, tabletsAmount, accessoriesAmount } = useMemo(() => {
    const phones = products.filter(
      product => product.category === 'phones',
    ).length;

    const tablets = products.filter(
      product => product.category === 'tablets',
    ).length;

    const accessories = products.filter(
      product => product.category === 'accessories',
    ).length;

    return {
      phonesAmount: phones,
      tabletsAmount: tablets,
      accessoriesAmount: accessories,
    };
  }, [products]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>Shop by category</h3>

        <div className={styles.categories}>
          <Link to="/phones" className={styles.link}>
            <article className={styles.category}>
              <div className={styles.photoWrapper}>
                <img
                  src="/img/category-phones.webp"
                  alt="category photo"
                  className={styles.photoPhones}
                />
              </div>

              <div className={styles.info}>
                <h4 className={styles.categoryTitle}>Mobile phones</h4>

                <div className={styles.amount}>{`${phonesAmount} models`}</div>
              </div>
            </article>
          </Link>

          <Link to="/tablets" className={styles.link}>
            <article className={styles.category}>
              <div
                className={`${styles.photoWrapper} ${styles.photoWrapperTablets}`}
              >
                <img
                  src="/img/category-tablets.png"
                  alt="category photo"
                  className={styles.photoTablets}
                />
              </div>

              <div className={styles.info}>
                <h4 className={styles.categoryTitle}>Tablets</h4>

                <div className={styles.amount}>{`${tabletsAmount} models`}</div>
              </div>
            </article>
          </Link>

          <Link to="/accessories" className={styles.link}>
            <article className={styles.category}>
              <div
                className={`${styles.photoWrapper} ${styles.photoWrapperAccessories}`}
              >
                <img
                  src="/img/category-accessories.png"
                  alt="category photo"
                  className={styles.photoAccessories}
                />
              </div>

              <div className={styles.info}>
                <h4 className={styles.categoryTitle}>Accessories</h4>

                <div
                  className={styles.amount}
                >{`${accessoriesAmount} models`}</div>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
};
