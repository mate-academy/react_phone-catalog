import { Product } from '../../store/models/product';

export interface HomePageViewProps {
  hotPricesProducts: Product[],
  phonesCount: number,
  tabletsCount: number,
  accessoriesCount: number,
  newestProducts: Product[],
}
