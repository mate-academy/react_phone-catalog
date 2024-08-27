import { useContext } from 'react';
import { StatesContext } from '../../../store/GlobalStateProvider';
import { ProductCard } from '../ProductCard/ProductCard.component';

type Props = {
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const { products } = useContext(StatesContext);

  return (
    <section className="productSlider">
      <h2 className="productSlider__title">{title}</h2>
      <div className="productSlider__list">
        {products
          .sort((a, b) => b.year - a.year)
          .map(product => {
            return <ProductCard key={product.id} product={product} />;
          })
          .slice(0, 10)}
      </div>
    </section>
  );
};
