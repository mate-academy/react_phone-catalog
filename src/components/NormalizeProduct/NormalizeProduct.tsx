import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';

type UnifiedProduct = {
  image: string;
  price: number;
  fullPrice: number;
  id: string;
  category: string;
};

export function normalizeProduct(
  product: Product | ProductDetailed,
): UnifiedProduct {
  return {
    id: 'itemId' in product ? product.itemId : product.id,
    category: 'category' in product ? product.category : '',
    image: 'image' in product ? product.image : product.images[0],
    price: 'price' in product ? product.price : product.priceDiscount,
    fullPrice:
      'fullPrice' in product ? product.fullPrice : product.priceRegular,
  };
}
