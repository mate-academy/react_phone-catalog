import { Section } from '@/atoms';
import s from './Categories.module.scss';
import { CategoryCard } from './ui/CategoryCard';
import { Category, CATEGORY_LIST } from '@/const';
import { useCategoryCount } from '@/hooks/useCategoryCount';

type Props = {
  title: string;
};

const Categories = ({ title }: Props) => {
  const categories = Object.keys(CATEGORY_LIST) as Category[];
  const counts = useCategoryCount();

  return (
    <Section className={s.categories}>
      <div className={s.container}>
        <Section.Title className={s.title}>{title}</Section.Title>
        <div className={s.content}>
          {categories.map(category => (
            <CategoryCard key={category} category={category} counts={counts} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Categories;
