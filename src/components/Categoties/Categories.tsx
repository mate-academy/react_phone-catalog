import { Link } from 'react-router-dom';
import { categories } from '../../helper/categories';
import { Container } from '../Container';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <section>
      <Container>
        <h2 className={styles.categorySectionTitle}>Shop by category</h2>

        <div className={styles.categoriesContent}>
          {categories.map((category, index) => (
            <div className={styles.categoryItem} key={index}>
              <Link
                to={category.linkTo}
                className={styles.categoryLinkImage}
                style={{
                  backgroundColor: category.backgroundColor,
                }}
              >
                <img src={category.imageSrc} alt={category.title} />
              </Link>
              <div className={styles.categoryTextWrapper}>
                <h4 className={styles.categoryTitle}>{category.title}</h4>
                <p className={styles.categoryCount}>{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
