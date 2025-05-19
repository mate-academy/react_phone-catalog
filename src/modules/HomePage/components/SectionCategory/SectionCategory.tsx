import { useAppSelector } from '../../../../app/hooks';
import { CategoryCard } from '../../../shared/components/categoryCard';

import styles from './SectionCategory.module.scss';

export const SectionCategory: React.FC = () => {
  const { phones } = useAppSelector(s => s.phones);
  const { tablets } = useAppSelector(s => s.tablets);
  const { accessories } = useAppSelector(s => s.accessories);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <CategoryCard
        to={'/phones'}
        cardName={'Mobile phones'}
        imgSrc={'img/category-img/category-phones.webp'}
        countModels={phones.length}
        color={'phones'}
      />
      <CategoryCard
        to={'/tablets'}
        cardName={'Tablets'}
        imgSrc={'img/category-img/category-tablets-new.png'}
        countModels={tablets.length}
        color={'tablets'}
      />
      <CategoryCard
        to={'/accessories'}
        cardName={'Accessories'}
        imgSrc={'img/category-img/category-accessories-new.png'}
        countModels={accessories.length}
        color={'accessories'}
      />
    </section>
  );
};
