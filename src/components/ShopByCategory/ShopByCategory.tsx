import { CATEGORIES } from '../../images';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import './index.scss';

export const ShopByCategory = () => {
  const categories = [
    {
      name: 'phones',
      imgUrl: CATEGORIES.phones,
    },
    {
      name: 'tablets',
      imgUrl: CATEGORIES.tablets,
    },
    {
      name: 'accessories',
      imgUrl: CATEGORIES.accessories,
    },
  ];

  return (
    <section className="shopByCategory">
      <div className="categoriesList" data-cy="categoryLinksContainer">
        {categories.map(category => (
          <CategoryCard category={category} key={category.name} />
        ))}
      </div>
    </section>
  );
};
