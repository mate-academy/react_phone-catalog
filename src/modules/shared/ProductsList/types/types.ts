import { Product } from '../../../../types/Product';

export type ProductsListProps = {
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};
