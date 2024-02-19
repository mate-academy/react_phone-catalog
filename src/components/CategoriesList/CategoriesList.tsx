import { CategoryCard } from '../CategoryCard/CategoryCard';
import './CategoriesList.scss';

export const CategoriesList = () => {
  const categories = ['phones', 'tablets', 'accessories'];

  return (
    <div className="categoriesList" data-cy="categoryLinksContainer">
      {
        categories.map(category => (
          <CategoryCard
            category={category}
            key={category}
          />
        ))
      }
    </div>
  );
};
