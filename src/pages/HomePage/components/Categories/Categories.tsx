import { CategoryCard } from '../CategoryCard';
import './Categories.scss';

export const Categories: React.FC = () => {
  const phoneModelsAmount = 3;
  const TabletModelsAmount = 4;
  const AccessoryModelsAmount = 5;

  return (
    <div className="categories">
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Mobile phones"
          photoSrc="./img/category-phones.jpeg"
          modelsAmount={phoneModelsAmount}
        />
      </div>
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Tablets"
          photoSrc="./img/category-tablets.jpeg"
          modelsAmount={TabletModelsAmount}
        />
      </div>
      <div className="categories__category-wrapper">
        <CategoryCard
          title="Accessories"
          photoSrc="./img/category-accessories.jpeg"
          modelsAmount={AccessoryModelsAmount}
        />
      </div>
    </div>
  );
};
