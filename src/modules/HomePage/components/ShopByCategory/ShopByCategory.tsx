import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import products from '../../../../../public/api/products.json';

export const ShopByCategory = () => {
  const countModels = (category: string) => {
    const models = products.filter(product => product.category === category);

    return models.length + '';
  };

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>

      <div className={styles.category__cards}>
        <div className={styles.card}>
          <Link to={'/phones'} className={styles.card__imgLink}>
            <img
              className={styles.card__img}
              src="img/ShopByCategory/Phones.webp"
              alt="Phones"
            ></img>
          </Link>

          <div className={styles.card__bottom}>
            <p className={styles.card__category}>Mobile phones</p>
            <span
              className={styles.card__count}
            >{`${countModels('phones')} models`}</span>
          </div>
        </div>
        <div className={styles.card}>
          <Link to={'/tablets'} className={styles.card__imgLink}>
            <img
              className={styles.card__img}
              src="img/ShopByCategory/Tablets.webp"
              alt="Tablets"
            ></img>
          </Link>

          <div className={styles.card__bottom}>
            <p className={styles.card__category}>Tablets</p>
            <span
              className={styles.card__count}
            >{`${countModels('tablets')} models`}</span>
          </div>
        </div>
        <div className={styles.card}>
          <Link to={'/accessories'} className={styles.card__imgLink}>
            <img
              className={styles.card__img}
              src="img/ShopByCategory/Accessories.webp"
              alt="Accessories"
            ></img>
          </Link>

          <div className={styles.card__bottom}>
            <p className={styles.card__category}>Accessories</p>
            <span
              className={styles.card__count}
            >{`${countModels('accessories')} models`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
