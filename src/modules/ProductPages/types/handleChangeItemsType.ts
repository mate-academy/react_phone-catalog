import { Product } from '../../../shared/types/ProductPage';

export type handleChangeItemsType = {
  event: React.ChangeEvent<HTMLSelectElement>;
  onPerPage: (value: number | string) => void;
  onCurrentPage: (value: number) => void;
  items: Product[];
  actuallyPage: number;
  urlParamsString: URLSearchParams;
  onUrlParamsString: (value: URLSearchParams) => void;
};
