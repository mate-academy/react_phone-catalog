import { Product } from '../../store/models/product';
import { ProductDetails } from '../../store/models/productDetails';

export interface ProductDetailsViewProps {
  product: ProductDetails,
  onColorChange: (currentColor: string, newColor: string) => void,
  onCapacityChange: (currentCapacity: string, newCapacity: string) => void,
  randomProducts: Product[],
}
