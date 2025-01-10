import { Product } from './Product';

export type DataType = {
  phones: Product[] | null;
  tablets: Product[] | null;
  accessories: Product[] | null;
};

export type ProductsContextType = {
  data: DataType;
  loading: boolean;
  error: string | null;
};
