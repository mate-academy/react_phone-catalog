import { Product } from '../../../shared/types/ProductPage';
import { SetUrlParams } from './SetUrlParams';

export type onNavignationLinksType = {
  hasUrl: boolean;
  hasItemsUrl: boolean;
  onStartItem: (value: number) => void;
  onEndItem: (value: number) => void;
  actuallyPage: number;
  perPage: number | string;
  urlParams: URLSearchParams;
  onUrlParams: (value: URLSearchParams) => void;
  items: Product[];
  urlParamsFunction: (params: SetUrlParams) => void;
};
