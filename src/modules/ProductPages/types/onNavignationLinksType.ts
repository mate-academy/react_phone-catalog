import { ProductPage } from '../../../shared/types/ProductPage';
import { SetUrlParams } from './SetUrlParams';

export type OnNavignationLinksType = {
  hasUrl: boolean;
  hasItemsUrl: boolean;
  onStartItem: (value: number) => void;
  onEndItem: (value: number) => void;
  actuallyPage: number;
  perPage: number | string;
  urlParams: URLSearchParams;
  onUrlParams: (value: URLSearchParams) => void;
  items: ProductPage[];
  urlParamsFunction: (params: SetUrlParams) => void;
};
