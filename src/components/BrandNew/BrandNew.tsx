import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import './BrandNew.scss';

export const BrandNew = () => {
  const { products } = useContext(GlobalContext);
  const brandNewProducts = [...products].sort((a, b) => a.year - b.year)
    .reverse();

  return (
    <section className="brand-new">
      <div className="container">
        <ProductSlider title="Brand new models" products={brandNewProducts} />
      </div>
    </section>
  );
};
