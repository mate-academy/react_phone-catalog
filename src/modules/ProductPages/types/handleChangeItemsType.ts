import { ProductPage } from '../../../shared/types/ProductPage';

export type HandleChangeItemsType = {
  event: React.ChangeEvent<HTMLSelectElement>;
  onPerPage: (value: number | string) => void;
  onCurrentPage: (value: number) => void;
  items: ProductPage[];
  actuallyPage: number;
  urlParamsString: URLSearchParams;
  onUrlParamsString: (value: URLSearchParams) => void;
};
