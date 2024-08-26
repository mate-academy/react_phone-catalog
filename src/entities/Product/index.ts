export {
  ProductSliceName,
  ProductSliceReducer,
} from './model/slice/productsSlice';
export { fetchProducts } from './model/services/fetchProducts';
export { getPhones } from './model/selectors/getPhones';
export { getPhonesCount } from './model/selectors/getPhonesCount';
export { getTablets } from './model/selectors/getTablets';
export { getTabletsCount } from './model/selectors/getTabletsCount';
export { getAccessories } from './model/selectors/getAccessories';
export { getAccessoriesCount } from './model/selectors/getAccessoriesCount';
export { getProductsInited } from './model/selectors/getProductsInited';
export { ProductsList } from './ui/ProductsList/ProductsList';
export { ProductCard } from './ui/ProductCard/ProductCard';
export type { Product, ProductSchema } from './model/types/product';
