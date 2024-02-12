import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import './BrandNewModels.scss';

export const BrandNewModels = () => {
  return (
    <div className="main__brand-new-models brand-new-models">
      <SectionHeader
        title="Brand new models"
        hasButtons
      />
      <div className="brand-new-models__cards">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};
