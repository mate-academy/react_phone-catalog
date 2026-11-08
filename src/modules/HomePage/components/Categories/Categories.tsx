import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Category } from '../../../../types/Category';
import { Product } from '../../../../types/Product';
import { CATEGORY_TITLES } from '../../../shared/constants/categoryNames';
import { pluralize } from '../../../shared/utils/pluralize';
import styles from './Categories.module.scss';

const CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

interface Props {
  products: Product[];
}

export const Categories = ({ products }: Props) => (
  <section>
    <h2 className={styles.title}>Shop by category</h2>

    <ul className={styles.list}>
      {CATEGORIES.map(category => {
        const count = products.filter(
          product => product.category === category,
        ).length;

        return (
          <li key={category}>
            <Link to={`/${category}`} className={styles.card}>
              <span
                className={classNames(styles.imageWrapper, styles[category])}
              >
                <img
                  src={`img/category-${category}.webp`}
                  alt=""
                  className={styles.image}
                />
              </span>

              <span className={styles.name}>{CATEGORY_TITLES[category]}</span>

              <span className={styles.count}>{pluralize(count, 'model')}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </section>
);
