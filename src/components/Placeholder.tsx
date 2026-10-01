import type { Product } from '../shared/types';

type Props = {
  product?: Product;
  large?: boolean;
};

export default function PlaceholderImage({ product, large = false }: Props) {
  if (!product?.image) {
    return (
      <div className={`placeholder-image ${large ? 'placeholder-large' : ''}`}>
        <span>📱</span>
        <small>{product?.title || 'Product image'}</small>
      </div>
    );
  }

  return (
    <div className={`placeholder-image ${large ? 'placeholder-large' : ''}`}>
      <img src={product.image} alt={product.title} />
    </div>
  );
}
