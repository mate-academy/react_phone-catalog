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
      <h2>{title}</h2>
      <div className="products__list">
        {products.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};
