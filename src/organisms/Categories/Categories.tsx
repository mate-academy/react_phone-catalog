import Section from '@/atoms/Section';
import styles from './Categories.module.scss';
import { CategoryCard } from './ui/CategoryCard';
import { Category, CATEGORY_LIST } from '@/const';
import { useCategoryCount } from '@/hooks/useCategoryCount';

type Props = {
  title: string;
};

export const Categories = ({ title }: Props) => {
  const categories = Object.keys(CATEGORY_LIST) as Category[];
  const counts = useCategoryCount();

  return (
    <Section className={styles.categories}>
      <div className={styles.container}>
        <Section.Title className={styles.title}>{title}</Section.Title>
        <div className={styles.content}>
          {categories.map(category => (
            <CategoryCard key={category} category={category} counts={counts} />
          ))}
        </div>
      </div>
    </Section>
  );
};
