import { CATEGORIES } from '../../constants/constJS';
import styles from './Categories.module.scss';
import { getCategoryRoute } from '../../features/getCategoryRoute';
import { useAppSelector } from '../../hooks/helperToolkit';
import { getAmountofModels } from '../../features/getAmountOfModels';
import { TransitionLink } from '../TransitionLink';

export const Categories = () => {
  const products = useAppSelector(state => state.product.products);

  return (
    <section className={styles.categories}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Shop by category</h2>
      </div>
      <ul className={styles.list}>
        {CATEGORIES.map((category, index) => (
          <li key={category.name} className={styles.categoryItem}>
            <TransitionLink to={getCategoryRoute(category.name)}>
              <div
                className={`${styles.imgContainer} ${styles[`img_position_${index}`]}`}
                style={{ backgroundColor: category.backgroundColor }}
              >
                <img
                  src={category.img}
                  alt={`${category.name} category`}
                  className={styles.categoryImage}
                />
              </div>
              <h3 className={styles.name}>{category.name}</h3>
              <div className={styles.amount}>
                {getAmountofModels(products, category.key)} models
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
