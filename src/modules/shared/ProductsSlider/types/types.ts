import { Product } from '../../../../types/Product';

export type Props = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};
