import { Category, CATEGORY_IMG_PATH, CATEGORY_LIST } from '@/const';
import s from './CategoryCard.module.scss';
import { CategoriesCounts } from '@/hooks/useCategoryCount';
type Props = {
  category: Category;
  counts: CategoriesCounts;
};

export const CategoryCard: React.FC<Props> = ({ category, counts }) => {
  return (
    <div className={s.card}>
      <img className={s.img} src={CATEGORY_IMG_PATH[category]} alt={category} />
      <span className={s.card__name}>{CATEGORY_LIST[category]}</span>
      <span className={s.card__count}>{counts[category]} models</span>
    </div>
  );
};
