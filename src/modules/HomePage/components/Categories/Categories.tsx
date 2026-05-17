import styles from './Categories.module.scss';
import { useProducts } from '../../../../hooks/context/useProducts';
import { categories } from '../../constants/categories';
import { CategoryCard } from '../../../shared/components/CategoryCard';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { howManyItem } = useProducts();
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t('home_page.category_section.title')}
        </h2>

        <ul className={styles.categories}>
          {categories.map(category => (
            <CategoryCard
              key={category.name}
              to={category.to}
              img={category.img}
              name={t(`${category.name}`)}
              className={category.className}
              bgColor={category.bgColor}
              howManyItem={howManyItem(category.to)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
