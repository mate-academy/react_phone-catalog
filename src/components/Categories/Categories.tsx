import { useProducts } from 'context';
import { CategoryItem } from './components/CategoryItem';
import './Categories.scss';

export const Categories = () => {
  const {
    filteredPhones,
    filteredTablets,
    filteredAccessories,
  } = useProducts();

  const categories = {
    phones: {
      src: 'img/category-phones.png',
      quantity: filteredPhones.length,
    },
    tablets: {
      src: 'img/category-tablets.png',
      quantity: filteredTablets.length,
    },
    accessories: {
      src: 'img/category-accessories.png',
      quantity: filteredAccessories.length,
    },
  };

  const categoriesArray = Object.entries(categories);

  return (
    <div className="categories">
      <div className="categories__upper">
        <h2 className="categories__title">Shop by category</h2>
      </div>

      <div
        className="categories__list"
        data-cy="categoryLinksContainer"
      >
        {categoriesArray.map(([category, { src, quantity }]) => (
          <CategoryItem
            key={category}
            category={category}
            link={src}
            quantity={quantity}
          />
        ))}
      </div>
    </div>
  );
};
