import { CategoryName } from '../../types/categoryName.enum';
import { CategoryCard } from '../CategoryCard';
import { SectionHeader } from '../SectionHeader';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <div className="main__shop-by-category shop-by-category">
      <SectionHeader title="Shop by category" />
      <div
        className="shop-by-category__cards"
        data-cy="categoryLinksContainer"
      >
        <CategoryCard
          pass={CategoryName.Phones}
        />
        <CategoryCard
          pass={CategoryName.Tablets}
        />
        <CategoryCard
          pass={CategoryName.Accessories}
        />
      </div>
    </div>
  );
};
