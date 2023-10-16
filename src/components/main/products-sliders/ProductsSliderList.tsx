import { Product } from '../../../helpers/types/Product';
import { ProductCard } from '../product-card/ProductCard';

type ProductsSliderListProps = {
  products: Product[]
};

export const ProductsSliderList = (
  { products }: ProductsSliderListProps,
) => (
  <ul
    data-cy="cardsContainer"
    className="products-slider__cards"
  >
    {products.map(
      product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ),
    )}
  </ul>
);
