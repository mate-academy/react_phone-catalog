import { Category, CATEGORY_IMG_PATH, CATEGORY_LIST } from '@/const';
import style from './CategoryCard.module.scss';
import { CategoriesCounts } from '@/hooks/useCategoryCount';
type Props = {
  category: Category;
  counts: CategoriesCounts;
};

export const CategoryCard: React.FC<Props> = ({ category, counts }) => {
  return (
    <div className={style.card}>
      <img
        className={style.img}
        src={CATEGORY_IMG_PATH[category]}
        alt={category}
      />
      <span>{CATEGORY_LIST[category]}</span>
      <span>{counts[category]}</span>
    </div>
  );
};
