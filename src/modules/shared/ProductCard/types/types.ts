import { Product } from '../../../../types/Product';

export type DisplayType = 'fullPrice' | 'with-discount';

export type Props = {
  product: Product;
  displayType: DisplayType;
};

export type SpecificationProps = {
  label: string;
  value: string;
};
