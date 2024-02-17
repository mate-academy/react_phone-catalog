import { CategoryCard, ImageUrl } from '../CategoryCard';
import { SectionHeader } from '../SectionHeader';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <div className="main__shop-by-category shop-by-category">
      <SectionHeader title="Shop by category" />
      <div className="shop-by-category__cards">
        <CategoryCard
          title="Mobile phones"
          modelsCount={95}
          photoName={ImageUrl.phones}
          pass="/phones"
        />
        <CategoryCard
          title="Tablets"
          modelsCount={24}
          photoName={ImageUrl.tablets}
          pass="/tablets"
        />
        <CategoryCard
          title="Accessories"
          modelsCount={100}
          photoName={ImageUrl.accessories}
          pass="/accessories"
        />
      </div>
    </div>
  );
};
