import { Link } from 'react-router-dom';
import { imageUrl } from '../../../utils/imageUrl';
import { SectionTitle } from '../../ui/SectionTitle';
import styles from './Category.module.scss';

export const Category = () => {
  return (
    <section className={styles.category}>
      <SectionTitle>Shop by category</SectionTitle>
      <div className={styles.category__content}>
        <div className={styles.category__block}>
          <Link to="/catalog/phones" className={styles.category__link}>
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
          <Link to="/catalog/tablets" className={styles.category__link}>
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
          <Link to="/catalog/accessories" className={styles.category__link}>
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
  );
};
