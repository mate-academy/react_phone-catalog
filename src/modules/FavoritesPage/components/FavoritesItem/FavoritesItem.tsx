import { ProductCard } from '@/shared/components/ProductCard';
import { Product } from '@/shared/types/Product';

type Props = { product: Product };

export const FavoritesItem: React.FC<Props> = ({ product }) => {
  const { id } = product;

  return <ProductCard key={id} product={product} />;
};
