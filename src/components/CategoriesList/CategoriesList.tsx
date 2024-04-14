import { CategoryCard } from '../CategoryCard/CategoryCard';
import './CategoriesList.scss';

export const CategoriesList = () => {
  const categories = ['phones', 'tablets', 'accessories'];

  return (
    <section className="categoriesList" data-cy="categoryLinksContainer">
      <h1 className="categoriesList__title">Shop by category</h1>

      <div className="categoriesList__content">
        {categories.map(category => (
          <CategoryCard category={category} key={category} />
        ))}
      </div>
    </section>
  );
};
