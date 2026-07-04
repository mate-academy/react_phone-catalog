import { NavLink } from 'react-router-dom';
// import { asset } from '../../utils/paths';
import styles from './Categories.module.scss';

type Category = {
  title: string;
  count: number;
  image: string;
  link: string;
  className: string;
};

type Props = {
  categories: Category[];
};

export const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.category}>
        {categories.map(category => (
          <div className={styles.categoryWrapper} key={category.link}>
            <NavLink to={category.link} className={styles.categoryLink}>
              <div
                className={`${styles.backgroundImg} ${
                  styles[category.link.slice(1)]
                }`}
              >
                <img
                  // src={asset(category.image)}
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImg}
                />
              </div>

              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </NavLink>

            <p className={styles.categoryCount}>{category.count} models</p>
          </div>
        ))}
      </div>
    </section>
  );
};
