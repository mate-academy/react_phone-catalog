import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';

type Props = {
  phonesQuantity: number;
  tabletsQuantity: number;
  accessoriesQuantity: number;
};

export const Categories: React.FC<Props> = ({
  phonesQuantity,
  tabletsQuantity,
  accessoriesQuantity,
}) => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories__items}>
        <div className={styles.categories__item}>
          <div className={styles.categories__image}>
            <Link to="phones">
              <img
                src="/public/img/categories/phones-category.png"
                alt="Phones Category"
              />
            </Link>
          </div>
          <Link to="phones">
            <h4 className={styles.categories__name}>Mobile Phones</h4>
          </Link>

          <p className={styles.categories__text}>{phonesQuantity} models</p>
        </div>

        <div className={styles.categories__item}>
          <div className={styles.categories__image}>
            <Link to="tablets">
              <img
                src="/public/img/categories/tablets-category.png"
                alt="Tablets Category"
              />
            </Link>
          </div>
          <Link to="tablets">
            <h4 className={styles.categories__name}>Tablets</h4>
          </Link>
          <p className={styles.categories__text}>{tabletsQuantity} models</p>
        </div>

        <div className={styles.categories__item}>
          <div className={styles.categories__image}>
            <Link to="accessories">
              <img
                src="/public/img/categories/accessories-category.png"
                alt="Accessories Category"
              />
            </Link>
          </div>
          <Link to="accessories">
            <h4 className={styles.categories__name}>Accessories</h4>
          </Link>
          <p className={styles.categories__text}>
            {accessoriesQuantity} models
          </p>
        </div>
      </div>
    </div>
  );
};
