import type { Product } from '../../types/products';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';
import { SkeletonProductCard } from '../SkeletonProductCard/SkeletonProductCard';

type Props = {
  visibleProducts: Product[];
  loading?: boolean;
};

export const ProductList: React.FC<Props> = ({ visibleProducts, loading }) => {
  const skeletons = Array.from({ length: 16 });
  return (
    <div className="product-list">
      {loading ?
        skeletons.map((_, i) => <SkeletonProductCard key={`skeleton-${i}`} />)
      : visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            category={product.category}
            product={product}
          />
        ))
      }
    </div>
  );
};
