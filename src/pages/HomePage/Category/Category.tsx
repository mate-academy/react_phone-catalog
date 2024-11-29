import { useCategories } from '../../../hooks/useCategories';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ScreenSize } from '../../../types/screenSize';
import { CategoryItem } from './CategoryItem';

import './Category.scss';

export const Category = () => {
  const isMobile = useMediaQuery(ScreenSize.Mobile);

  const categories = useCategories();
  const Header = isMobile ? 'h3' : 'h2';

  return (
    <section className="category">
      <div className="category__container">
        <div className="category__title">
          <Header>Shop by category</Header>
        </div>

        <div className="category__items">
          {categories.map(category => {
            return <CategoryItem key={category.id} categoryData={category} />;
          })}
        </div>
      </div>
    </section>
  );
};
