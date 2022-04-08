import { FunctionComponent } from 'react';

// Styles
import './Categories.scss';

// Components
import { CategoryCard } from '../CategoryCard';

export const Categories: FunctionComponent = () => {
  const phones = JSON.parse(localStorage.getItem('phones') || '[]');
  const tablets = JSON.parse(localStorage.getItem('tablets') || '[]');
  const accessories = JSON.parse(localStorage.getItem('accessories') || '[]');

  const categoryItems = [
    { category: 'Phones', itemsCount: phones.length },
    { category: 'Tablets', itemsCount: tablets.length },
    { category: 'Accessories', itemsCount: accessories.length },
  ];

  return (
    <div className="Categories">
      <h2 className="Categories__title">
        Shop by category
      </h2>

      <ul className="Categories__list">
        {categoryItems.map(({ category, itemsCount }) => (
          <li key={category}>
            <CategoryCard category={category} itemsCount={itemsCount} />
          </li>
        ))}
      </ul>
    </div>
  );
};
