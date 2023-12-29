import { Splide, SplideSlide } from '@splidejs/react-splide';
import './ProductSlider.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../../types/Products';

type Props = {
  products: Product[]
  title: string,
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  return (
    <section className="product">
      <h1 className="product__title">{title}</h1>
      <Splide
        id="product__slider"
        aria-label="Baner-first"
        options={{
          perPage: 4,
          gap: 16,
          pagination: false,
        }}
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <ProductCard product={product} />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};
