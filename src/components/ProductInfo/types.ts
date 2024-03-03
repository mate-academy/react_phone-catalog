import { ProductDetails } from '../../store/models/productDetails';

export interface ProductInfoProps {
  product: ProductDetails,
  onColorChange: (currentColor: string, newColor: string) => void,
  onCapacityChange: (currentCapacity: string, newCapacity: string) => void,
  onFavoritesToggle: (id: string) => void,
  onCartAdd: (id: string) => void,
  isInCart: (id: string) => boolean,
  isInFavorites: (id: string) => boolean,
}
